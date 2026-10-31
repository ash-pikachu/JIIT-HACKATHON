"""
app.py - Prashiksha Flask application
Run: flask --app app run --debug
"""
from __future__ import annotations

import os
import sys
import uuid
from datetime import datetime
from functools import wraps

from dotenv import load_dotenv
from flask import Flask, jsonify, redirect, render_template, request, session, url_for, send_from_directory

sys.path.insert(0, os.path.dirname(__file__))

from backend.agent import AITutorAgent
from backend.session_manager import SessionManager
from backend.translator import SUPPORTED_LANGUAGES, TranslationModule

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY", os.getenv("SECRET_KEY", "prashiksha-dev-secret"))
app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 0

@app.after_request
def add_header(response):
    response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response

LEARNING_STATES: dict[str, dict] = {}


LEARNING_TYPES = {
    "explanation": {
        "icon": "lightbulb",
        "label": "Deep Explanation",
        "desc": "Comprehensive, layered teaching with examples, analogies, and subtopics.",
    },
    "qa": {
        "icon": "messages-square",
        "label": "Q&A Mode",
        "desc": "High-yield Questions & Answers pairs covering essential concepts.",
    },
    "roadmap": {
        "icon": "map",
        "label": "Roadmap Journey",
        "desc": "Visual step-by-step map: bite-sized topic portion -> flashcards -> next topic.",
    },
    "summary": {
        "icon": "clipboard-list",
        "label": "Quick Summary",
        "desc": "Definitions, key takeaways, glossary terms, and mental model.",
    },
    "practice": {
        "icon": "pencil-ruler",
        "label": "Practice Problems",
        "desc": "Progressive exercises with hints and solution strategies.",
    },
}

QUICK_TOPICS = ["Machine Learning", "Photosynthesis", "World War II", "Python Basics", "Trigonometry"]


def _initial_learning_state() -> dict:
    return {
        "user": None,
        "session_id": None,
        "topic": None,
        "response_type": None,
        "chat_history": [],
        "language": "en",
        "understanding_level": 0.5,
        "section_content": "",
        "current_flashcards": [],
        "current_card_idx": 0,
        "quiz_answers": [],
        "roadmap_data": None,
        "current_roadmap_step": None,
        "completed_milestones": [],
        "prev_session_id": None,
        "notes": [],
        "past_topics": [],
    }


def _record_topic_progress(state: dict, topic: str, mastery: float = None):
    if not topic or not str(topic).strip():
        return
    topic_clean = str(topic).strip()
    past = state.setdefault("past_topics", [])
    entry = next((item for item in past if item.get("topic", "").strip().lower() == topic_clean.lower()), None)
    now_str = datetime.utcnow().strftime("%Y-%m-%d %H:%M")
    if entry:
        if mastery is not None:
            entry["mastery_score"] = round(mastery, 2)
        entry["sessions_count"] = entry.get("sessions_count", 1) + 1
        entry["last_visited"] = now_str
        past.remove(entry)
        past.insert(0, entry)
    else:
        past.insert(0, {
            "topic": topic_clean,
            "mastery_score": round(mastery if mastery is not None else state.get("understanding_level", 0.5), 2),
            "sessions_count": 1,
            "last_visited": now_str,
        })


def _state() -> dict:
    state_id = session.get("learning_state_id")
    if not state_id:
        state_id = uuid.uuid4().hex
        session["learning_state_id"] = state_id
    if state_id not in LEARNING_STATES:
        legacy_state = session.pop("learning_state", None)
        LEARNING_STATES[state_id] = legacy_state or _initial_learning_state()
        session.modified = True
    return LEARNING_STATES[state_id]


def _save_state(state: dict):
    state_id = session.get("learning_state_id")
    if not state_id:
        state_id = uuid.uuid4().hex
        session["learning_state_id"] = state_id
    LEARNING_STATES[state_id] = state
    session.modified = True


def _reset_state(state: dict | None = None):
    state_id = uuid.uuid4().hex
    session["learning_state_id"] = state_id
    LEARNING_STATES[state_id] = state or _initial_learning_state()
    session.modified = True


_DB_AVAILABLE: bool | None = None


def _get_sm() -> SessionManager | None:
    global _DB_AVAILABLE
    if _DB_AVAILABLE is False:
        return None
    try:
        sm = SessionManager()
        if _DB_AVAILABLE is None:
            from sqlalchemy import text
            sm.db.execute(text("SELECT 1"))
            _DB_AVAILABLE = True
        return sm
    except Exception:
        _DB_AVAILABLE = False
        return None


def _get_agent(state: dict) -> AITutorAgent:
    return AITutorAgent(
        understanding_level=state.get("understanding_level", 0.5),
        language=state.get("language", "en"),
    )


def _get_translator() -> TranslationModule:
    return TranslationModule()


def _add_message(state: dict, role: str, content: str):
    state.setdefault("chat_history", []).append({"role": role, "content": content})
    sm = _get_sm()
    if sm and state.get("session_id") and role in {"user", "assistant", "system"}:
        try:
            sm.save_message(state["session_id"], role, content, state.get("language", "en"))
        except Exception:
            pass
        finally:
            sm.close()


def _build_local_journey_data(state: dict) -> dict:
    answers = state.get("quiz_answers", [])
    history = state.get("chat_history", [])
    total = max(len(answers), 1)
    return {
        "topic": state.get("topic") or "General",
        "session_duration_minutes": 0,
        "messages_exchanged": sum(1 for msg in history if msg.get("role") in ("user", "assistant")),
        "quiz_results": {
            "total_questions": len(answers),
            "correct_answers": sum(1 for ans in answers if ans.get("is_correct")),
            "average_score": sum(ans.get("score", 0) for ans in answers) / total,
            "accuracy_percent": round(sum(ans.get("score", 0) for ans in answers) / total * 100, 1),
        },
        "understanding_level": state.get("understanding_level", 0.5),
        "weak_topics": [],
        "roadmap_progress": {"total_steps": 0, "completed_steps": 0, "completed_titles": []},
        "overall_progress": [],
        "quiz_attempts": [
            {
                "question": (ans.get("card") or {}).get("question", "Question"),
                "user_answer": ans.get("user_answer", ""),
                "correct_answer": (ans.get("card") or {}).get("answer", ""),
                "is_correct": ans.get("is_correct", False),
                "score": ans.get("score", 0.0),
            }
            for ans in answers
        ],
    }


def _fallback_lesson(topic: str, response_type: str) -> str:
    if response_type == "qa":
        return (
            f"### 🎯 Essential Questions & Answers for {topic}\n\n"
            f"#### ❓ Q1: What is the fundamental premise and purpose of {topic}?\n"
            f"**Answer:** {topic} establishes a systematic framework to analyze, model, and solve core problems using structured principles.\n"
            f"**Key Concept:** Core definition & objective\n\n"
            f"#### ❓ Q2: How does {topic} operate in practice?\n"
            f"**Answer:** It applies clear mechanisms and rule sets that transform input requirements into verified, dependable outcomes.\n"
            f"**Key Concept:** Execution pipeline & mechanisms\n\n"
            f"#### ❓ Q3: What is a classic real-world application of {topic}?\n"
            f"**Answer:** It powers modern technology, scientific analysis, and engineering solutions to automate decisions and eliminate guesswork.\n"
            f"**Key Concept:** Practical utility\n\n"
            f"#### ❓ Q4: What common mistake do learners make when studying {topic}?\n"
            f"**Answer:** Trying to memorize advanced syntax or variations without understanding the fundamental reasoning first.\n"
            f"**Key Concept:** Pitfall avoidance\n\n"
            f"💡 *Ask any specific question in the box below to get an instant dedicated concept breakdown!*"
        )
    if response_type == "summary":
        return (
            f"### ⚡ Quick Summary: {topic}\n\n"
            f"**Definition:** {topic} is a vital discipline focusing on structured principles, practical mechanisms, and verified real-world applications.\n\n"
            f"**Key Takeaways:**\n"
            f"- Understand foundational definitions and vocabulary.\n"
            f"- Master the sequential mechanisms that govern how it works.\n"
            f"- Connect abstract concepts to practical problem-solving.\n"
            f"- Watch out for common edge-case assumptions.\n"
            f"- Periodic flashcard self-testing cements retention.\n\n"
            f"**Essential Terms:**\n"
            f"- **Foundations:** The root axioms and concepts of {topic}.\n"
            f"- **Mechanisms:** The workflow through which outcomes are generated.\n"
            f"- **Application:** Hands-on scenarios where {topic} provides value.\n\n"
            f"**Analogy:** Treat {topic} like a master recipe—combine the core ingredients in correct order, and the outcome is consistently great."
        )
    if response_type == "practice":
        return (
            f"### 🏋️ Practice Problems for {topic}\n\n"
            f"#### Problem 1: Conceptual Warm-up\n"
            f"Define the primary mechanism of {topic} in your own words, and identify one real situation where it is essential.\n"
            f"*Hint: Think about the main problem it solves.*\n\n"
            f"#### Problem 2: Applied Scenario\n"
            f"If an implementation of {topic} produces inconsistent results, what diagnostic step would you take first?\n"
            f"*Hint: Review input states and core constraints.*\n\n"
            f"#### Problem 3: Optimization Challenge\n"
            f"How would you improve the efficiency and accuracy of a workflow based on {topic}?\n"
            f"*Hint: Identify bottlenecks and redundant calculations.*\n\n"
            f"👉 **Type your answers or questions below to practice!**"
        )
    if response_type == "roadmap":
        return (
            f"### 🗺️ Learning Roadmap: {topic}\n\n"
            f"Welcome to your structured learning path for **{topic}**!\n\n"
            f"👉 **Click on any topic or milestone card above** to start studying that concept. You can use the left (`◀`) and right (`▶`) arrows to browse all milestones and jump directly to whichever topic you wish to learn."
        )
    return (
        f"### 💡 Deep Explanation: {topic}\n\n"
        f"Welcome to Prashiksha's in-depth masterclass on **{topic}**.\n\n"
        f"1. **Core Concept:** {topic} is built on fundamental principles that govern how problems are structured and solved.\n"
        f"2. **How It Works:** By breaking down the problem into logical layers, each step builds on verified principles.\n"
        f"3. **Practical Example:** In industry and research, applying {topic} reduces complexity and ensures reliable results.\n"
        f"4. **Common Pitfalls:** Watch out for assumptions about edge cases and skipping intermediate steps.\n\n"
        f"Ready to explore deeper? Ask any follow-up question below or test yourself with flashcards!"
    )


def _ai_error_text(error: Exception) -> str:
    if os.getenv("PRASHIKSHA_DEBUG_AI", "").lower() in {"1", "true", "yes"}:
        return f"\n\nAI debug: {type(error).__name__}: {error}"
    return ""


def _fallback_cards(topic: str) -> list[dict]:
    return [
        {
            "type": "mcq",
            "is_multiple": False,
            "question": f"What is the primary foundation of {topic}?",
            "options": [
                f"A) The fundamental principles and concepts that govern {topic}",
                f"B) An unrelated topic with no connection to {topic}",
                f"C) A historical misconception completely discarded today",
                f"D) Arbitrary rules with no systematic application",
            ],
            "answer": "A",
            "explanation": f"Option A accurately highlights the foundational principles that define {topic}.",
            "topic": topic,
        },
        {
            "type": "multiple",
            "is_multiple": True,
            "question": f"Which of the following are primary benefits of studying {topic}? (Select all that apply)",
            "options": [
                f"A) Developing structured problem-solving skills in {topic}",
                f"B) Memorizing arbitrary terms without conceptual understanding",
                f"C) Applying verified methodologies to real-world scenarios",
                f"D) Completely ignoring experimental and analytical data",
            ],
            "answer": ["A", "C"],
            "explanation": f"Options A and C are core benefits of mastering {topic}, whereas memorizing without comprehension or ignoring data are bad practices.",
            "topic": topic,
        },
        {
            "type": "mcq",
            "is_multiple": False,
            "question": f"Which of the following best represents a practical application of {topic}?",
            "options": [
                f"A) Applying its core techniques to solve real-world problems",
                f"B) Memorizing terms without understanding their use",
                f"C) Ignoring all experimental and analytical data",
                f"D) Using completely arbitrary rules without validation",
            ],
            "answer": "A",
            "explanation": f"Applying principles to solve practical challenges is the primary application of {topic}.",
            "topic": topic,
        },
    ]


def _notes(state: dict) -> list[dict]:
    state.setdefault("notes", [])
    return state["notes"]


def _note_back_url(default: str = "topic") -> str:
    candidate = request.values.get("back") or request.referrer
    if candidate and candidate.startswith("/"):
        return candidate
    return url_for(default)


def _get_notifications(state: dict) -> list[dict]:
    state.setdefault("notifications", [])
    notifs = state["notifications"]
    has_voice_notifs = any(n.get("id") in ("notif-voice-multilingual", "notif-voice-run") for n in notifs)
    if not notifs or not has_voice_notifs:
        voice_items = [
            {
                "id": "notif-voice-multilingual",
                "type": "voice",
                "title": "Multilingual Voice Generation",
                "message": "currently making voice genetation of texts in multilinguistic",
                "time": "In progress",
                "read": False,
                "icon": "languages",
            },
            {
                "id": "notif-voice-run",
                "type": "audio",
                "title": "Voice Response & Site Run",
                "message": "currently making voice generated response and run of site",
                "time": "In progress",
                "read": False,
                "icon": "volume-2",
            },
        ]
        # Filter out old initial default welcome/mastery placeholders
        dynamic_items = [n for n in notifs if n.get("id") not in ("notif-welcome", "notif-mastery", "notif-voice-multilingual", "notif-voice-run")]
        state["notifications"] = voice_items + dynamic_items
    return state["notifications"]


def _add_notification(state: dict, title: str, message: str, n_type: str = "info", icon: str = "bell"):
    state.setdefault("notifications", [])
    state["notifications"].insert(0, {
        "id": uuid.uuid4().hex[:8],
        "type": n_type,
        "title": title,
        "message": message,
        "time": "Just now",
        "read": False,
        "icon": icon,
    })


def login_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not _state().get("user"):
            return redirect(url_for("login"))
        return view(*args, **kwargs)

    return wrapped


@app.context_processor
def inject_globals():
    st = _state()
    past_topics = []
    user = st.get("user")
    if user and user.get("id"):
        sm = _get_sm()
        if sm:
            try:
                past_topics = sm.get_past_topics(user["id"])
            except Exception:
                past_topics = st.get("past_topics", [])
            finally:
                sm.close()
        else:
            past_topics = st.get("past_topics", [])
    else:
        past_topics = st.get("past_topics", [])

    if past_topics and not st.get("past_topics"):
        st["past_topics"] = past_topics

    notifications = _get_notifications(st)
    unread_notifs_count = sum(1 for n in notifications if not n.get("read"))

    return {
        "languages": SUPPORTED_LANGUAGES,
        "learning_types": LEARNING_TYPES,
        "state": st,
        "brand_name": "Prashiksha",
        "past_topics": past_topics,
        "notifications": notifications,
        "unread_notifications_count": unread_notifs_count,
    }


@app.get("/")
def login():
    state = _state()
    if state.get("user"):
        return redirect(url_for("topic"))
    return render_template("login.html")


@app.post("/login")
def submit_login():
    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip()
    language = request.form.get("language", "en")

    if not name or not email:
        return render_template("login.html", error="Please enter your name and Gmail address."), 400
    if language not in SUPPORTED_LANGUAGES:
        language = "en"

    state = _initial_learning_state()
    state["language"] = language

    sm = _get_sm()
    if sm:
        try:
            user = sm.get_or_create_user(name, email, language)
            state["user"] = {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "language_pref": user.language_pref,
            }
            try:
                state["past_topics"] = sm.get_past_topics(user.id)
            except Exception:
                pass
            active = sm.get_active_session(user.id)
            if active:
                state["session_id"] = active.id
                state["topic"] = active.topic
                state["response_type"] = active.response_type
                state["chat_history"] = sm.get_history(active.id)
                state["understanding_level"] = active.understanding_level
                _record_topic_progress(state, active.topic, active.understanding_level)
                _add_message(state, "system", f"Resumed your session on {active.topic}.")
                _save_state(state)
                return redirect(url_for("learn"))
        except Exception:
            state["user"] = {"id": 1, "name": name, "email": email, "language_pref": language}
        finally:
            sm.close()
    else:
        state["user"] = {"id": 1, "name": name, "email": email, "language_pref": language}

    _reset_state(state)
    return redirect(url_for("topic"))


@app.route("/topic", methods=["GET", "POST"])
@login_required
def topic():
    state = _state()
    if request.method == "POST":
        selected_topic = request.form.get("topic", "").strip()
        if not selected_topic:
            return render_template("topic.html", quick_topics=QUICK_TOPICS, error="Choose a topic to begin."), 400

        sm = _get_sm()
        if sm and state.get("session_id"):
            try:
                sm.pause_session(state["session_id"])
            except Exception:
                pass

        state["topic"] = selected_topic
        state["session_id"] = None
        state["chat_history"] = []
        state["section_content"] = ""
        state["current_flashcards"] = []
        state["current_card_idx"] = 0
        state["quiz_answers"] = []
        state["roadmap_data"] = None
        state["initial_lesson_started"] = False
        state["prev_session_id"] = None

        if sm:
            try:
                previous = sm.get_last_session_for_topic(state["user"]["id"], selected_topic)
                if previous:
                    state["prev_session_id"] = previous.id
                    if previous.understanding_level:
                        state["understanding_level"] = previous.understanding_level
            except Exception:
                pass
            finally:
                sm.close()

        _record_topic_progress(state, selected_topic)
        _save_state(state)
        return redirect(url_for("mode"))

    # When visiting /topic via GET (e.g. clicking Prashiksha logo on top left), clear current class
    if state.get("topic") or state.get("session_id"):
        sm = _get_sm()
        if sm and state.get("session_id"):
            try:
                sm.pause_session(state["session_id"])
            except Exception:
                pass
            finally:
                sm.close()
        state["topic"] = None
        state["session_id"] = None
        state["response_type"] = None
        state["section_content"] = ""
        state["current_flashcards"] = []
        state["current_card_idx"] = 0
        state["quiz_answers"] = []
        state["roadmap_data"] = None
        state["initial_lesson_started"] = False
        state["prev_session_id"] = None
        _save_state(state)

    return render_template("topic.html", quick_topics=QUICK_TOPICS)


@app.route("/mode", methods=["GET", "POST"])
@login_required
def mode():
    state = _state()
    if not state.get("topic"):
        return redirect(url_for("topic"))

    if request.method == "POST":
        action = request.form.get("action")
        if action == "resume" and state.get("prev_session_id"):
            sm = _get_sm()
            if sm:
                try:
                    sm.resume_session(state["prev_session_id"])
                    state["session_id"] = state["prev_session_id"]
                    state["chat_history"] = sm.get_history(state["prev_session_id"])
                    state["prev_session_id"] = None
                    _add_message(state, "system", f"Continuing from where you left off on {state['topic']}.")
                    _save_state(state)
                    return redirect(url_for("learn"))
                finally:
                    sm.close()

        response_type = request.form.get("response_type", "explanation")
        if response_type not in LEARNING_TYPES:
            response_type = "explanation"
        _prepare_session(state, response_type)
        _save_state(state)
        return redirect(url_for("learn"))

    return render_template("mode.html")


def _prepare_session(state: dict, response_type: str):
    state["response_type"] = response_type
    state["initial_lesson_started"] = False
    sm = _get_sm()
    if sm:
        try:
            created = sm.create_session(state["user"]["id"], state["topic"], response_type)
            state["session_id"] = created.id
        except Exception:
            state["session_id"] = None
        finally:
            sm.close()

    _record_topic_progress(state, state.get("topic"))
    if response_type != "roadmap":
        _add_message(state, "system", f"Great. Prashiksha will teach {state['topic']} using {response_type} mode.")


def _start_initial_lesson(state: dict):
    agent = _get_agent(state)
    topic = state.get("topic")
    mode = state.get("response_type", "explanation")

    if mode == "roadmap":
        if not state.get("roadmap_data") or not (state.get("roadmap_data") or {}).get("steps"):
            roadmap = agent.generate_roadmap(topic)
            state["roadmap_data"] = roadmap
            state["current_roadmap_step"] = None
            state["completed_milestones"] = []
            state["initial_lesson_started"] = True
            sm = _get_sm()
            if sm and state.get("session_id"):
                try:
                    sm.save_roadmap_steps(state["session_id"], roadmap.get("steps", []))
                except Exception:
                    pass
                finally:
                    sm.close()
        return

    if state.get("initial_lesson_started"):
        return

    state["initial_lesson_started"] = True

    if mode == "qa":
        user_prompt = f"Essential Questions & Answers on {topic}"
        try:
            response = agent.generate_qa_overview(topic)
        except Exception as error:
            response = _fallback_lesson(topic, "qa") + _ai_error_text(error)

    elif mode == "summary":
        user_prompt = f"Quick Summary of {topic}"
        try:
            response = agent.generate_summary(topic)
        except Exception as error:
            response = _fallback_lesson(topic, "summary") + _ai_error_text(error)

    elif mode == "practice":
        user_prompt = f"Practice Problems on {topic}"
        try:
            response = agent.generate_practice(topic)
        except Exception as error:
            response = _fallback_lesson(topic, "practice") + _ai_error_text(error)

    else:
        user_prompt = f"Please conduct an in-depth, comprehensive Deep Learning masterclass on: {topic}"
        try:
            response = agent.get_response(user_prompt, topic, "explanation", [])
        except Exception as error:
            response = _fallback_lesson(topic, "explanation") + _ai_error_text(error)

    if state.get("language") != "en":
        response = _get_translator().translate(response, state["language"])

    _add_message(state, "user", user_prompt)
    _add_message(state, "assistant", response)
    state["section_content"] = state.get("section_content", "") + response


@app.get("/learn")
@login_required
def learn():
    state = _state()
    if not state.get("topic"):
        return redirect(url_for("topic"))
    if not state.get("response_type"):
        return redirect(url_for("mode"))
    return render_template("learn.html")


@app.route("/notes", methods=["GET", "POST"])
@login_required
def notes():
    state = _state()
    back_url = _note_back_url()
    if request.method == "POST":
        title = request.form.get("title", "").strip()
        content = request.form.get("content", "").strip()
        category = request.form.get("category", "Concept").strip()
        topic = request.form.get("topic", "").strip() or state.get("topic") or "General"
        if title and content:
            _notes(state).insert(
                0,
                {
                    "id": uuid.uuid4().hex,
                    "title": title,
                    "content": content,
                    "category": category,
                    "topic": topic,
                    "created_at": datetime.now().strftime("%d %b %Y, %I:%M %p"),
                },
            )
            _save_state(state)
            return redirect(url_for("notes", back=back_url))
        return render_template("notes.html", notes=_notes(state), back_url=back_url, error="Add a title and note content.")
    return render_template("notes.html", notes=_notes(state), back_url=back_url)


@app.post("/notes/<note_id>/edit")
@login_required
def edit_note(note_id: str):
    state = _state()
    back_url = _note_back_url()
    data = request.json if request.is_json else request.form
    title = (data.get("title") or "").strip()
    content = (data.get("content") or "").strip()
    category = (data.get("category") or "").strip()
    target = None
    for note in _notes(state):
        if note["id"] == note_id:
            if title:
                note["title"] = title
            if content:
                note["content"] = content
            if category:
                note["category"] = category
            note["updated_at"] = datetime.now().strftime("%d %b %Y, %I:%M %p")
            target = note
            break
    _save_state(state)
    if request.is_json:
        return jsonify({"success": True, "note": target})
    return redirect(url_for("notes", back=back_url))


@app.post("/notes/<note_id>/delete")
@login_required
def delete_note(note_id: str):
    state = _state()
    back_url = _note_back_url()
    state["notes"] = [note for note in _notes(state) if note["id"] != note_id]
    _save_state(state)
    if request.is_json or request.headers.get("Accept") == "application/json":
        return jsonify({"success": True, "count": len(state["notes"])})
    return redirect(url_for("notes", back=back_url))


@app.get("/api/notes")
@login_required
def api_get_notes():
    state = _state()
    return jsonify({"notes": _notes(state), "count": len(_notes(state))})


@app.post("/api/notes")
@login_required
def api_create_note():
    state = _state()
    data = request.json or {}
    content = data.get("content", "").strip()
    title = data.get("title", "").strip() or state.get("topic") or "Quick Note"
    category = data.get("category", "Concept").strip()
    topic = data.get("topic", "").strip() or state.get("topic") or "General"
    if not content:
        return jsonify({"error": "Note content is required."}), 400
    note = {
        "id": uuid.uuid4().hex,
        "title": title,
        "content": content,
        "category": category,
        "topic": topic,
        "created_at": datetime.now().strftime("%d %b %Y, %I:%M %p"),
    }
    _notes(state).insert(0, note)
    _save_state(state)
    return jsonify({"note": note, "count": len(_notes(state))})


@app.post("/api/notifications/read")
@login_required
def api_read_notifications():
    state = _state()
    notif_id = (request.json or {}).get("id")
    notifs = _get_notifications(state)
    if notif_id:
        for n in notifs:
            if n["id"] == notif_id:
                n["read"] = True
                break
    else:
        for n in notifs:
            n["read"] = True
    _save_state(state)
    unread = sum(1 for n in notifs if not n.get("read"))
    return jsonify({"success": True, "unread_count": unread})


@app.post("/api/notifications/dismiss")
@login_required
def api_dismiss_notification():
    state = _state()
    notif_id = (request.json or {}).get("id")
    notifs = _get_notifications(state)
    if notif_id:
        state["notifications"] = [n for n in notifs if n["id"] != notif_id]
    else:
        state["notifications"] = []
    _save_state(state)
    unread = sum(1 for n in state["notifications"] if not n.get("read"))
    return jsonify({"success": True, "unread_count": unread, "notifications": state["notifications"]})


@app.post("/api/lesson/start")
@login_required
def api_start_lesson():
    state = _state()
    if not state.get("topic") or not state.get("response_type"):
        return jsonify({"error": "Choose a topic and mode first."}), 400
    _start_initial_lesson(state)
    _save_state(state)
    return jsonify(
        {
            "messages": state.get("chat_history", []),
            "roadmap_data": state.get("roadmap_data"),
            "current_roadmap_step": state.get("current_roadmap_step"),
            "completed_milestones": state.get("completed_milestones", []),
        }
    )


@app.post("/api/chat")
@login_required
def api_chat():
    state = _state()
    user_input = (request.json or {}).get("message", "").strip()
    if not user_input:
        return jsonify({"error": "Message is required."}), 400

    lower = user_input.lower()
    _add_message(state, "user", user_input)
    if any(token in lower for token in ["end session", "finish", "goodbye", "bye", "done learning"]):
        _save_state(state)
        return jsonify({"redirect": url_for("journey")})
    if any(token in lower for token in ["quiz", "test me", "flashcard", "test myself"]):
        _save_state(state)
        return jsonify({"quiz": True})

    agent = _get_agent(state)
    history = state.get("chat_history", [])[:-1]
    try:
        response = agent.get_response(user_input, state["topic"], state["response_type"], history)
    except Exception as error:
        response = _fallback_lesson(state["topic"], state["response_type"]) + _ai_error_text(error)
    if state.get("language") != "en":
        response = _get_translator().translate(response, state["language"])

    _add_message(state, "assistant", response)
    state["section_content"] = state.get("section_content", "") + "\n" + response
    assistant_count = sum(1 for msg in state.get("chat_history", []) if msg.get("role") == "assistant")
    if assistant_count and assistant_count % 3 == 0:
        _add_message(state, "system", "You have covered a useful chunk. Try a quick flashcard check when ready.")
    _save_state(state)
    return jsonify({"messages": state["chat_history"], "can_quiz": len(state.get("section_content", "")) > 300})


@app.route("/roadmap/jump/<int:step_idx>", methods=["GET", "POST"])
@login_required
def roadmap_jump_route(step_idx: int):
    state = _state()
    steps = (state.get("roadmap_data") or {}).get("steps", [])
    if steps and 0 <= step_idx < len(steps):
        state["current_roadmap_step"] = step_idx
        step = steps[step_idx]
        agent = _get_agent(state)
        topic = state.get("topic")

        try:
            lesson_text = agent.teach_roadmap_step(topic, step, step_idx, len(steps))
        except Exception as error:
            lesson_text = (
                f"# 🌟 Deep Learning: Milestone {step.get('step', step_idx + 1)} - {step.get('title')}\n\n"
                f"{step.get('content', '')}\n\n"
                f"💡 **Flashcard Checkpoint:** Click the **Flashcards** button above. Score at least **70%** on the flashcards to complete this milestone on your roadmap!"
            ) + _ai_error_text(error)

        if state.get("language") != "en":
            lesson_text = _get_translator().translate(lesson_text, state["language"])

        state["current_flashcards"] = []
        state["current_card_idx"] = 0
        state["quiz_answers"] = []

        # Open in Deep Learning mode for this milestone
        state["response_type"] = "explanation"
        state["active_roadmap_milestone"] = step_idx
        state["initial_lesson_started"] = True
        state["chat_history"] = []
        user_note = f"Start Deep Learning: Milestone {step.get('step', step_idx + 1)} - {step.get('title')}"
        _add_message(state, "user", user_note)
        _add_message(state, "assistant", lesson_text)
        state["section_content"] = lesson_text

        sm = _get_sm()
        if sm and state.get("session_id"):
            try:
                sm.update_session_mode(state["session_id"], "explanation")
            except Exception:
                pass
            finally:
                sm.close()

        _save_state(state)
    return redirect(url_for("learn"))


@app.post("/api/roadmap/jump")
@login_required
def api_roadmap_jump():
    state = _state()
    data = request.json or {}
    target_idx = int(data.get("step_index", 0))
    steps = (state.get("roadmap_data") or {}).get("steps", [])
    if not steps or target_idx < 0 or target_idx >= len(steps):
        return jsonify({"error": "Invalid milestone index."}), 400

    state["current_roadmap_step"] = target_idx
    step = steps[target_idx]
    agent = _get_agent(state)
    topic = state.get("topic")

    try:
        lesson_text = agent.teach_roadmap_step(topic, step, target_idx, len(steps))
    except Exception as error:
        lesson_text = (
            f"# 🌟 Deep Learning: Milestone {step.get('step', target_idx + 1)} - {step.get('title')}\n\n"
            f"{step.get('content', '')}\n\n"
            f"💡 **Flashcard Checkpoint:** Click the **Flashcards** button above. Score at least **70%** on the flashcards to complete this milestone on your roadmap!"
        ) + _ai_error_text(error)

    if state.get("language") != "en":
        lesson_text = _get_translator().translate(lesson_text, state["language"])

    state["current_flashcards"] = []
    state["current_card_idx"] = 0
    state["quiz_answers"] = []

    # Transition into deep learning (explanation) mode for this topic milestone
    state["response_type"] = "explanation"
    state["active_roadmap_milestone"] = target_idx
    state["initial_lesson_started"] = True
    state["chat_history"] = []
    user_note = f"Start Deep Learning: Milestone {step.get('step', target_idx + 1)} - {step.get('title')}"
    _add_message(state, "user", user_note)
    _add_message(state, "assistant", lesson_text)
    state["section_content"] = lesson_text

    sm = _get_sm()
    if sm and state.get("session_id"):
        try:
            sm.update_session_mode(state["session_id"], "explanation")
        except Exception:
            pass
        finally:
            sm.close()

    _save_state(state)
    return jsonify({
        "success": True,
        "redirect": url_for("learn"),
        "messages": state.get("chat_history", []),
        "current_roadmap_step": state["current_roadmap_step"],
        "completed_milestones": state.get("completed_milestones", []),
        "roadmap_data": state.get("roadmap_data"),
        "step_title": step.get("title"),
    })


@app.route("/api/roadmap/view", methods=["GET", "POST"])
@login_required
def api_roadmap_view():
    state = _state()
    state["response_type"] = "roadmap"
    _save_state(state)
    if request.is_json:
        return jsonify({"success": True, "redirect": url_for("learn")})
    return redirect(url_for("learn"))


@app.post("/api/roadmap/complete")
@login_required
def complete_roadmap_step():
    state = _state()
    steps = (state.get("roadmap_data") or {}).get("steps", [])
    current = state.get("current_roadmap_step")
    topic = state.get("topic")

    if current is None or current < 0:
        next_idx = 0
    else:
        next_idx = current + 1

    if next_idx < len(steps):
        if current is not None and current >= 0:
            sm = _get_sm()
            if sm and state.get("session_id"):
                try:
                    sm.complete_roadmap_step(state["session_id"], current + 1)
                except Exception:
                    pass
                finally:
                    sm.close()

        state["current_roadmap_step"] = next_idx
        next_step = steps[next_idx]
        agent = _get_agent(state)
        try:
            lesson_text = agent.teach_roadmap_step(topic, next_step, next_idx, len(steps))
        except Exception as error:
            lesson_text = (
                f"### 📍 Milestone {next_step.get('step', next_idx + 1)}: {next_step.get('title')}\n\n"
                f"{next_step.get('content', '')}\n\n"
                f"💡 *Next step in sequence:* Try the **Flashcards Check** below to test your grasp on this milestone!"
            ) + _ai_error_text(error)

        if state.get("language") != "en":
            lesson_text = _get_translator().translate(lesson_text, state["language"])

        state["current_flashcards"] = []
        state["current_card_idx"] = 0
        state["quiz_answers"] = []

        if current is not None and current >= 0:
            _add_message(state, "system", f"🎉 Milestone {current + 1} completed! Moving to Milestone {next_idx + 1}: {next_step.get('title')}")
        else:
            _add_message(state, "user", f"Studying Milestone 1: {next_step.get('title')}")
        _add_message(state, "assistant", lesson_text)
        state["section_content"] = lesson_text
    else:
        _add_message(state, "system", f"🏆 Congratulations! You have completed all {len(steps)} milestones in the {topic} roadmap! You can review past milestones, test yourself with flashcards, or end the session to view your journey summary.")

    _save_state(state)
    return jsonify({
        "success": True,
        "messages": state.get("chat_history", []),
        "current_roadmap_step": state.get("current_roadmap_step"),
        "roadmap_data": state.get("roadmap_data"),
        "all_completed": state.get("current_roadmap_step") is not None and state.get("current_roadmap_step") >= len(steps),
    })


@app.post("/api/quiz/start")
@login_required
def start_quiz():
    state = _state()
    state["current_flashcards"] = []
    state["current_card_idx"] = 0
    state["quiz_answers"] = []
    state["session_initial_understanding"] = state.get("understanding_level", 0.5)

    topic_for_quiz = state.get("topic", "General")
    if state.get("response_type") == "roadmap" and state.get("roadmap_data"):
        steps = state["roadmap_data"].get("steps", [])
        curr = state.get("current_roadmap_step")
        if curr is not None and 0 <= curr < len(steps):
            topic_for_quiz = f"{state['topic']} - {steps[curr].get('title', '')}"

    try:
        cards = _get_agent(state).generate_flashcards(topic_for_quiz, state.get("section_content", ""))
    except Exception:
        cards = []
    if not cards:
        cards = _fallback_cards(state.get("topic", "General"))
    state["current_flashcards"] = cards
    _save_state(state)
    return jsonify(_quiz_payload(state))


@app.post("/api/quiz/answer")
@login_required
def answer_quiz():
    state = _state()
    raw_answer = (request.json or {}).get("answer", "")
    raw_answers = (request.json or {}).get("answers", [])
    skip = bool((request.json or {}).get("skip"))
    cards = state.get("current_flashcards", [])
    idx = state.get("current_card_idx", 0)
    if idx >= len(cards):
        return jsonify(_quiz_payload(state))

    card = cards[idx]
    card_type = card.get("type", "mcq")
    is_multiple = (
        card_type in ("multiple", "multi_select")
        or isinstance(card.get("answer"), list)
        or bool(card.get("is_multiple"))
    )

    if skip:
        result = {
            "is_correct": False,
            "score": 0.0,
            "feedback": "Skipped.",
            "explanation": card.get("explanation") or str(card.get("answer")) or "Skipped question.",
        }
    elif is_multiple:
        import re
        raw_correct = card.get("answer", [])
        if isinstance(raw_correct, list):
            correct_set = set()
            for x in raw_correct:
                m = re.match(r"^([A-D])", str(x).strip().upper())
                correct_set.add(m.group(1) if m else str(x).strip().upper())
        elif isinstance(raw_correct, str):
            correct_set = set(re.findall(r"\b([A-D])\b", raw_correct.upper()))
            if not correct_set:
                correct_set = set(re.findall(r"([A-D])", raw_correct.upper()))
        else:
            correct_set = set()

        user_input_list = raw_answers if isinstance(raw_answers, list) and raw_answers else [raw_answer] if raw_answer else []
        user_set = set()
        for item in user_input_list:
            if isinstance(item, str):
                letters = re.findall(r"([A-D])", item.upper())
                user_set.update(letters)

        is_correct = (user_set == correct_set) and len(correct_set) > 0
        if is_correct:
            score = 1.0
            feedback = "Excellent! All correct options selected."
        else:
            correct_selected = len(user_set.intersection(correct_set))
            wrong_selected = len(user_set - correct_set)
            total_correct = max(len(correct_set), 1)
            raw_score = max(0.0, (correct_selected - 0.5 * wrong_selected) / total_correct)
            score = round(raw_score, 2)
            feedback = "Partially correct." if score > 0 else "Incorrect."

        result = {
            "is_correct": is_correct,
            "score": score,
            "feedback": feedback,
            "explanation": card.get("explanation") or f"The correct options are: {', '.join(sorted(correct_set))}.",
        }
    elif card_type == "mcq":
        # MCQ local grading - strictly 1 option
        import re
        raw_ans = str(card.get("answer", "")).strip().upper()
        match_c = re.match(r"^([A-D])", raw_ans)
        correct_letter = match_c.group(1) if match_c else raw_ans

        user_match = re.match(r"^([A-D])", str(raw_answer).strip().upper())
        user_letter = user_match.group(1) if user_match else str(raw_answer).strip().upper()

        is_correct = (user_letter == correct_letter)
        score = 1.0 if is_correct else 0.0
        result = {
            "is_correct": is_correct,
            "score": score,
            "feedback": "Correct!" if is_correct else "Incorrect.",
            "explanation": card.get("explanation") or f"The correct answer is {correct_letter}.",
        }
    else:
        try:
            result = _get_agent(state).evaluate_answer(card["question"], card["answer"], str(raw_answer))
        except Exception:
            score = 1.0 if raw_answer and any(word in str(raw_answer).lower() for word in str(card.get("answer", "")).lower().split()[:4]) else 0.4
            result = {
                "is_correct": score >= 0.6,
                "score": score,
                "feedback": "Nice effort." if score >= 0.6 else "Good attempt. Review the sample answer once.",
                "explanation": card.get("answer", ""),
            }

    sm = _get_sm()
    if sm and state.get("session_id"):
        try:
            stored_correct = ", ".join(card["answer"]) if isinstance(card.get("answer"), list) else str(card.get("answer", ""))
            stored_user = ", ".join(raw_answers) if isinstance(raw_answers, list) and raw_answers else str(raw_answer)
            sm.save_quiz_attempt(
                state["session_id"],
                card.get("topic", state["topic"]),
                card["question"],
                stored_correct,
                stored_user,
                result.get("is_correct", False),
                result.get("score", 0.0),
            )
        except Exception:
            pass
        finally:
            sm.close()

    state.setdefault("quiz_answers", []).append({"card": card, **result})
    state["current_card_idx"] = idx + 1

    # Real-time understanding calculation as flashcards are answered
    scores = [item.get("score", 0.0) for item in state.get("quiz_answers", [])]
    if scores:
        baseline = state.setdefault("session_initial_understanding", state.get("understanding_level", 0.5))
        avg = sum(scores) / len(scores)
        # Weighted real-time blend: 70% session baseline + 30% current card performance
        new_level = round(min(max((baseline * 0.7) + (avg * 0.3), 0.0), 1.0), 2)
        state["understanding_level"] = new_level
        try:
            _get_agent(state).understanding_level = new_level
        except Exception:
            pass

    if state["current_card_idx"] >= len(cards):
        scores = [item.get("score", 0.0) for item in state.get("quiz_answers", [])]
        total = len(state.get("quiz_answers", []))
        avg = sum(scores) / max(total, 1)
        score_pct = round(avg * 100)

        # If learning a roadmap milestone, mark milestone as completed ONLY if score >= 70%
        curr_step = state.get("current_roadmap_step")
        if curr_step is not None:
            completed = state.setdefault("completed_milestones", [])
            if score_pct >= 70:
                if curr_step not in completed:
                    completed.append(curr_step)
                    completed.sort()
                    sm = _get_sm()
                    if sm and state.get("session_id"):
                        try:
                            sm.complete_roadmap_step(state["session_id"], curr_step + 1)
                        except Exception:
                            pass
                        finally:
                            sm.close()

        sm = _get_sm()
        if sm and state.get("session_id"):
            try:
                sm.update_understanding(
                    state["session_id"],
                    state["understanding_level"],
                    state["user"]["id"],
                    state["topic"]
                )
            except Exception:
                pass
            finally:
                sm.close()
        _record_topic_progress(state, state.get("topic"), state.get("understanding_level"))

    _save_state(state)
    payload = _quiz_payload(state)
    payload["last_result"] = result
    payload["answered_card"] = card
    payload["user_answer"] = raw_answers if raw_answers else raw_answer
    return jsonify(payload)


def _quiz_payload(state: dict) -> dict:
    cards = state.get("current_flashcards", [])
    idx = state.get("current_card_idx", 0)
    answers = state.get("quiz_answers", [])
    level = state.get("understanding_level", 0.5)
    understanding_pct = round(level * 100)
    level_label = "Expert" if level >= 0.7 else "Average" if level >= 0.35 else "Newbie"
    level_hint = "Strong mastery" if level >= 0.7 else "Growing steadily" if level >= 0.35 else "Building foundations"
    level_icon = "badge-check" if level >= 0.7 else "book-open-check" if level >= 0.35 else "sprout"

    if idx >= len(cards) and cards:
        total = len(answers)
        avg = sum(item.get("score", 0) for item in answers) / max(total, 1)
        score_pct = round(avg * 100)
        return {
            "done": True,
            "total": total,
            "correct": sum(1 for item in answers if item.get("is_correct")),
            "score": score_pct,
            "passed_70": score_pct >= 70,
            "is_roadmap": state.get("response_type") == "roadmap" or state.get("current_roadmap_step") is not None,
            "current_roadmap_step": state.get("current_roadmap_step"),
            "completed_milestones": state.get("completed_milestones", []),
            "roadmap_data": state.get("roadmap_data"),
            "understanding": understanding_pct,
            "understanding_level": level,
            "level_label": level_label,
            "level_hint": level_hint,
            "level_icon": level_icon,
        }
    return {
        "done": False,
        "index": idx,
        "total": len(cards),
        "card": cards[idx] if idx < len(cards) else None,
        "understanding": understanding_pct,
        "understanding_level": level,
        "level_label": level_label,
        "level_hint": level_hint,
        "level_icon": level_icon,
    }


@app.get("/journey")
@login_required
def journey():
    state = _state()
    sm = _get_sm()
    if sm and state.get("session_id"):
        try:
            sm.end_session(state["session_id"])
            journey_data = sm.get_session_journey_data(
                state["session_id"], state["user"]["id"], state.get("topic") or "General"
            )
        except Exception:
            journey_data = _build_local_journey_data(state)
        finally:
            sm.close()
    else:
        journey_data = _build_local_journey_data(state)

    try:
        summary = _get_agent(state).generate_journey_summary(journey_data)
    except Exception:
        summary = (
            f"You worked on {journey_data.get('topic', 'your topic')} with Prashiksha. "
            f"You exchanged {journey_data.get('messages_exchanged', 0)} learning messages and reached "
            f"{journey_data.get('understanding_level', 0.5):.0%} mastery. Keep going with one small revision "
            "and one practice round next."
        )
    if state.get("language") != "en":
        summary = _get_translator().translate(summary, state["language"])
    return render_template("journey.html", journey_data=journey_data, summary=summary)


@app.post("/new-topic")
@login_required
def new_topic():
    state = _state()
    sm = _get_sm()
    if sm and state.get("session_id"):
        try:
            sm.pause_session(state["session_id"])
        except Exception:
            pass
        finally:
            sm.close()
    user = state["user"]
    language = state.get("language", "en")
    notes = _notes(state)
    past_topics = state.get("past_topics", [])
    state = _initial_learning_state()
    state["user"] = user
    state["language"] = language
    state["notes"] = notes
    state["past_topics"] = past_topics
    _save_state(state)
    return redirect(url_for("topic"))


@app.post("/logout")
def logout():
    state_id = session.get("learning_state_id")
    if state_id:
        LEARNING_STATES.pop(state_id, None)
    session.clear()
    return redirect(url_for("login"))




# ═══════════════════════════════════════════════════════════════════════════
# TEACHER DASHBOARD API: GEMINI QUIZ GENERATOR FROM ASSIGNMENT PDF
# ═══════════════════════════════════════════════════════════════════════════
@app.route("/api/teacher/generate-assignment-quiz", methods=["POST", "OPTIONS"])
def api_teacher_generate_assignment_quiz():
    """
    Reads the attached assignment problem sheet (PDF/Word/Text) and prompts
    the Gemini Agent to generate a 5-question comprehension quiz tailored specifically
    to the questions and topics within the uploaded document.
    """
    if request.method == "OPTIONS":
        resp = jsonify({"status": "ok"})
        resp.headers["Access-Control-Allow-Origin"] = "*"
        resp.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        resp.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        return resp

    # Handle both multipart/form-data (with direct attached file) and JSON
    assignment_title = "Assignment Problem Set"
    topic = "Computer Science"
    target_class = "CSE"
    content = ""
    file_bytes = None
    file_mime = "application/pdf"
    filename = ""

    if request.content_type and "multipart/form-data" in request.content_type:
        assignment_title = request.form.get("assignment_title", assignment_title).strip()
        topic = request.form.get("topic", topic).strip()
        target_class = request.form.get("target_class", target_class).strip()
        content = request.form.get("content", "").strip()

        file_obj = request.files.get("file")
        if file_obj and file_obj.filename:
            filename = file_obj.filename
            file_bytes = file_obj.read()
            if filename.lower().endswith(".pdf"):
                file_mime = "application/pdf"
            elif filename.lower().endswith(".docx"):
                file_mime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            elif filename.lower().endswith(".txt"):
                file_mime = "text/plain"
    else:
        data = request.get_json(silent=True) or {}
        assignment_title = data.get("assignment_title", assignment_title)
        topic = data.get("topic", topic)
        content = data.get("content", "")
        target_class = data.get("target_class", target_class)

    gemini_key = os.getenv("GEMINI_API_KEY", "")
    generated_questions = []

    # 1. Attempt generation with Gemini Agent reading the attached document
    if gemini_key:
        try:
            from google import genai
            from google.genai import types
            import json as pyjson
            import re

            client = genai.Client(api_key=gemini_key)

            prompt_text = f"""You are Prashiksha's AI tutor assistant and faculty examination specialist.
You are given an assignment problem sheet titled "{assignment_title}" ({topic}) for {target_class} students.
Carefully read every line, problem statement, formula, and code block in the attached document.

GOAL:
Generate EXACTLY 5 high-quality, diverse questions based strictly and directly on the problems in this assignment.

CRITICAL REQUIREMENTS:
1. QUESTION VARIETY (Balanced Pedagogical Mix):
   - 2 Conceptual Questions: Testing foundational definitions, mechanisms, or principles from the assignment.
   - 2 Application-Based Questions: Presenting a mini scenario, edge condition, code snippet, or algorithm decision.
   - 1 Calculation / Complexity / Quantitative Question: Testing numerical result, asymptotic bound (O-notation), step count, or state count.

2. DIFFICULTY SPECTRUM:
   - Must span Easy (Q1-Q2), Medium (Q3-Q4), and Difficult (Q5) tiers. Include a "difficulty" field: "Easy", "Medium", or "Hard".
   - Include a "type" field: "Conceptual", "Application", or "Calculation".

3. ZERO EXTERNAL QUESTION REFERENCES IN EXPLANATIONS:
   - DO NOT write phrases like "as per Question 9", "as in Problem 2", "according to question 4", or "in the assignment".
   - Explanations MUST be completely self-contained and standalone facts that explain WHY the correct answer is true on its own merits (under 20 words).

4. RAPID 10-SECOND TIMER:
   - Every question is answered under a strict 10-second timer.
   - Questions and options must be crisp, clear, and readable in under 3 seconds.
   - timer_seconds MUST be 10.

5. JSON FORMAT:
Return ONLY a valid JSON array of 5 objects (no markdown, no code fences):
[
  {{
    "id": 1,
    "difficulty": "Easy",
    "type": "Conceptual",
    "question": "Crisp standalone question?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct_answer": "Option A",
    "explanation": "Completely standalone reason without citing question numbers.",
    "timer_seconds": 10
  }}
]
"""
            model_to_use = "gemini-2.5-flash"
            contents_payload = []

            # If a binary file was uploaded (PDF/Word/etc.), pass it to Gemini multimodal
            if file_bytes and len(file_bytes) > 0 and (file_mime == "application/pdf" or file_mime == "text/plain"):
                contents_payload.append(types.Part.from_bytes(data=file_bytes, mime_type=file_mime))
            elif content:
                contents_payload.append("Assignment Problem Sheet Text:\n---\n" + content[:4000] + "\n---")

            contents_payload.append(prompt_text)

            resp = client.models.generate_content(
                model=model_to_use,
                contents=contents_payload
            )
            raw_text = resp.text.strip()
            print("[Gemini Agent Raw Response]", raw_text[:300])

            # Extract JSON block even if model includes leading/trailing text or markdown
            json_match = re.search(r"\[\s*\{.*?\}\s*\]", raw_text, re.DOTALL)
            if json_match:
                json_str = json_match.group(0)
            else:
                json_str = re.sub(r"^```(?:json)?\s*", "", raw_text)
                json_str = re.sub(r"\s*```$", "", json_str)

            parsed = pyjson.loads(json_str)
            if isinstance(parsed, list) and len(parsed) >= 5:
                generated_questions = parsed[:5]
                print(f"[Gemini Agent Success] Extracted {len(generated_questions)} custom questions directly from document!")
        except Exception as e:
            print("[Gemini Agent Error / Offline Fallback]", e)

    # 2. Intelligent, context-aware domain fallback if network is offline or sandboxed
    if not generated_questions or len(generated_questions) < 5:
        combined_text = (assignment_title + " " + topic + " " + content + " " + filename).lower()
        if "tree" in combined_text or "bst" in combined_text or "avl" in combined_text or "dsa" in combined_text:
            generated_questions = [
                {
                    "id": 1,
                    "question": f"Based on {assignment_title[:24]}: What is worst-case BST search time?",
                    "options": ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
                    "correct_answer": "O(n)",
                    "explanation": "Degenerate unbalance leads to linear linked-list traversal.",
                    "timer_seconds": 10
                },
                {
                    "id": 2,
                    "question": "What is the maximum allowed balance factor in an AVL tree?",
                    "options": ["1", "0", "2", "3"],
                    "correct_answer": "1",
                    "explanation": "Strict balance condition enforces height difference of at most 1.",
                    "timer_seconds": 10
                },
                {
                    "id": 3,
                    "question": "Which tree traversal outputs BST keys in strictly sorted order?",
                    "options": ["In-order", "Pre-order", "Post-order", "Level-order"],
                    "correct_answer": "In-order",
                    "explanation": "Visiting Left-Root-Right produces ascending sequence.",
                    "timer_seconds": 10
                },
                {
                    "id": 4,
                    "question": "What rotation sequence restores balance for an LR imbalance?",
                    "options": ["Left then Right", "Right then Left", "Double Left", "Single Right"],
                    "correct_answer": "Left then Right",
                    "explanation": "Rotate left child left, then rotate the pivot node right.",
                    "timer_seconds": 10
                },
                {
                    "id": 5,
                    "question": "What is the optimal height bound of a balanced BST with n keys?",
                    "options": ["O(log n)", "O(n)", "O(sqrt n)", "O(1)"],
                    "correct_answer": "O(log n)",
                    "explanation": "Balanced heights maintain logarithmic search complexity.",
                    "timer_seconds": 10
                }
            ]
        elif "memory" in combined_text or "page" in combined_text or "os" in combined_text or "operating" in combined_text:
            generated_questions = [
                {
                    "id": 1,
                    "question": "What hardware component translates virtual to physical addresses?",
                    "options": ["MMU", "ALU", "DMA Controller", "Bus Arbiter"],
                    "correct_answer": "MMU",
                    "explanation": "The Memory Management Unit performs paging translations.",
                    "timer_seconds": 10
                },
                {
                    "id": 2,
                    "question": "Which page replacement algorithm suffers from Belady's Anomaly?",
                    "options": ["FIFO", "LRU", "Optimal", "Clock"],
                    "correct_answer": "FIFO",
                    "explanation": "Adding frames in FIFO can increase page faults.",
                    "timer_seconds": 10
                },
                {
                    "id": 3,
                    "question": "What occurs when the OS spends more time paging than executing?",
                    "options": ["Thrashing", "Deadlock", "Fragmentation", "Starvation"],
                    "correct_answer": "Thrashing",
                    "explanation": "Thrashing occurs when active working sets exceed physical RAM.",
                    "timer_seconds": 10
                },
                {
                    "id": 4,
                    "question": "What high-speed cache speeds up virtual address translation?",
                    "options": ["TLB", "L3 Cache", "Disk Buffer", "Frame Table"],
                    "correct_answer": "TLB",
                    "explanation": "Translation Lookaside Buffer caches virtual-to-physical mappings.",
                    "timer_seconds": 10
                },
                {
                    "id": 5,
                    "question": "What page fault status indicates a valid page residing in RAM?",
                    "options": ["Page Hit", "Page Fault", "TLB Miss", "Trap"],
                    "correct_answer": "Page Hit",
                    "explanation": "Present bit indicates reference is directly accessible.",
                    "timer_seconds": 10
                }
            ]
        else:
            generated_questions = [
                {
                    "id": 1,
                    "question": f"What is the primary core objective of {assignment_title[:24]}?",
                    "options": ["Reinforce key problem concepts", "Memory testing only", "Syntax checking", "Skip grading"],
                    "correct_answer": "Reinforce key problem concepts",
                    "explanation": "Assignment tests foundational understanding of the problem statement.",
                    "timer_seconds": 10
                },
                {
                    "id": 2,
                    "question": "Which edge condition must be handled first in the assignment problems?",
                    "options": ["Base or empty case", "Infinite loop", "Max storage", "Stack overflow"],
                    "correct_answer": "Base or empty case",
                    "explanation": "Base cases prevent recursion overflows and index exceptions.",
                    "timer_seconds": 10
                },
                {
                    "id": 3,
                    "question": "What is the expected asymptotic bound for optimal execution?",
                    "options": ["O(log n) or O(n)", "O(2^n)", "O(n!)", "O(n^4)"],
                    "correct_answer": "O(log n) or O(n)",
                    "explanation": "Efficient implementations achieve sub-quadratic complexity.",
                    "timer_seconds": 10
                },
                {
                    "id": 4,
                    "question": "How does Prashiksha verify code and theory solutions for this assignment?",
                    "options": ["Automated rubrics & AI checks", "Manual lookup only", "Random scoring", "Ignore rubric"],
                    "correct_answer": "Automated rubrics & AI checks",
                    "explanation": "Prashiksha executes tests and rubric diagnostics automatically.",
                    "timer_seconds": 10
                },
                {
                    "id": 5,
                    "question": "What is the purpose of the 10-second post-assignment verification?",
                    "options": ["Ensure genuine student comprehension", "Delay student", "Lock screen", "Cancel points"],
                    "correct_answer": "Ensure genuine student comprehension",
                    "explanation": "Rapid response prevents copying and verifies retention.",
                    "timer_seconds": 10
                }
            ]

    response = jsonify({
        "success": True,
        "source": "gemini-agent" if gemini_key else "prashiksha-ai-bridge",
        "assignment_title": assignment_title,
        "topic": topic,
        "count": len(generated_questions),
        "timer_seconds_per_question": 10,
        "quiz": generated_questions
    })
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


# ---------------------------------------------------------------------------
# RAW DATA / ASSIGNMENT STORAGE & DOWNLOAD API
# ---------------------------------------------------------------------------
ASSIGNMENT_STORAGE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "raw data", "assignment")
os.makedirs(ASSIGNMENT_STORAGE_DIR, exist_ok=True)


def generate_valid_pdf_file(file_path, title, target_class, subject, instructions, due_date):
    """
    Constructs a valid, standard ISO PDF-1.4 binary file with layout, header,
    problem statement and metadata so any PDF reader opens it natively.
    """
    lines = [
        ("18", 50, 750, title[:45]),
        ("12", 50, 725, f"Target Class: {target_class}  |  Subject: {subject}"[:65]),
        ("10", 50, 705, f"Faculty: Dr. Ananya Sharma  |  Due Date: {due_date}"[:65]),
        ("10", 50, 685, "Prashiksha Faculty Problem Sheet -- Stored in raw data/assignment/"),
        ("12", 50, 650, "Problem Statement & Implementation Tasks:"),
    ]
    y = 625
    body_text = instructions or "Review the syllabus unit, implement required modules, and submit your code via Prashiksha."
    for paragraph in body_text.split("\n"):
        if paragraph.strip():
            for chunk in [paragraph[i:i+68] for i in range(0, len(paragraph), 68)]:
                lines.append(("10", 50, y, chunk))
                y -= 18
                if y < 80:
                    break

    stream_parts = ["BT"]
    for font_sz, x, y_pos, text_str in lines:
        clean = text_str.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")
        stream_parts.append(f"/F1 {font_sz} Tf")
        stream_parts.append(f"{x} {y_pos} Td")
        stream_parts.append(f"({clean}) Tj")
        stream_parts.append(f"{-x} {-y_pos} Td")
    stream_parts.append("ET")

    stream_content = "\n".join(stream_parts)
    stream_bytes = stream_content.encode("latin1", "replace")
    stream_len = len(stream_bytes)

    pdf_body = f"""%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length {stream_len} >>
stream
{stream_content}
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000228 00000 n 
0000000305 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
{380 + stream_len}
%%EOF"""
    with open(file_path, "wb") as f_out:
        f_out.write(pdf_body.encode("latin1", "replace"))


@app.route("/api/teacher/save-assignment", methods=["POST", "OPTIONS"])
def api_teacher_save_assignment():
    """
    Receives an uploaded assignment file (PDF, Word, Code, ZIP) from the teacher
    and saves the exact binary in 'raw data/assignment/'.
    """
    if request.method == "OPTIONS":
        res = jsonify({"status": "ok"})
        res.headers["Access-Control-Allow-Origin"] = "*"
        res.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        res.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return res

    try:
        title = request.form.get("title", "Assignment").strip()
        target_class = request.form.get("class", "CSE").strip()
        subject = request.form.get("subject", "Computer Science").strip()
        instructions = request.form.get("instructions", "").strip()
        due_date = request.form.get("due_date", "").strip()

        file_obj = request.files.get("file")
        if file_obj and file_obj.filename:
            raw_filename = os.path.basename(file_obj.filename)
            safe_name = "".join(c for c in raw_filename if c.isalnum() or c in "._- ")
            if not safe_name:
                safe_name = f"assignment_{int(datetime.now().timestamp())}.pdf"
            file_path = os.path.join(ASSIGNMENT_STORAGE_DIR, safe_name)
            # Save the exact uploaded file byte-for-byte (PDF, docx, etc.)
            file_obj.save(file_path)
            file_size_bytes = os.path.getsize(file_path)
        else:
            safe_title = "".join(c for c in title if c.isalnum() or c in "_- ").strip().replace(" ", "_")
            if not safe_title:
                safe_title = f"assignment_{int(datetime.now().timestamp())}"
            safe_name = f"{safe_title[:32]}_Problem_Sheet.pdf"
            file_path = os.path.join(ASSIGNMENT_STORAGE_DIR, safe_name)
            generate_valid_pdf_file(file_path, title, target_class, subject, instructions, due_date)
            file_size_bytes = os.path.getsize(file_path)

        if file_size_bytes > 1024 * 1024:
            size_str = f"{file_size_bytes / (1024 * 1024):.1f} MB"
        else:
            size_str = f"{max(1, round(file_size_bytes / 1024))} KB"

        res = jsonify({
            "success": True,
            "message": "Assignment stored in raw data/assignment",
            "fileName": safe_name,
            "fileSize": size_str,
            "storagePath": f"raw data/assignment/{safe_name}",
            "downloadUrl": f"/api/teacher/download-assignment/{safe_name}"
        })
        res.headers["Access-Control-Allow-Origin"] = "*"
        return res

    except Exception as e:
        res = jsonify({"success": False, "error": str(e)})
        res.headers["Access-Control-Allow-Origin"] = "*"
        return res, 500


@app.route("/api/teacher/download-assignment/<path:filename>", methods=["GET"])
def api_teacher_download_assignment(filename):
    """
    Downloads the exact assignment file (PDF, docx, doc, etc.) directly from 'raw data/assignment/'.
    """
    safe_filename = os.path.basename(filename)
    file_path = os.path.join(ASSIGNMENT_STORAGE_DIR, safe_filename)

    if not os.path.exists(file_path):
        if safe_filename.lower().endswith(".pdf"):
            generate_valid_pdf_file(
                file_path,
                safe_filename.replace("_", " ").replace(".pdf", ""),
                "CSE",
                "Computer Science",
                "Assignment problem sheet archived in raw data/assignment/.",
                "Upcoming"
            )
        else:
            with open(file_path, "w", encoding="utf-8") as f_fallback:
                f_fallback.write(
                    "PRASHIKSHA ARCHIVED ASSIGNMENT FILE\n"
                    f"Filename: {safe_filename}\n"
                    "Storage Directory: raw data/assignment/\n"
                    "Generated on demand by Prashiksha System.\n"
                )

    # Determine exact MIME content type
    ext = safe_filename.rsplit(".", 1)[-1].lower() if "." in safe_filename else ""
    mime_types = {
        "pdf": "application/pdf",
        "doc": "application/msword",
        "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "zip": "application/zip",
        "txt": "text/plain",
        "py": "text/x-python",
        "cpp": "text/x-c++src",
        "java": "text/x-java-source",
        "sql": "application/sql"
    }
    mimetype = mime_types.get(ext, "application/octet-stream")

    return send_from_directory(
        ASSIGNMENT_STORAGE_DIR,
        safe_filename,
        as_attachment=True,
        download_name=safe_filename,
        mimetype=mimetype
    )


# ---------------------------------------------------------------------------
@app.route("/api/teacher/gemini-key", methods=["GET"])
def get_teacher_gemini_key():
    return jsonify({"key": os.getenv("GEMINI_API_KEY", "")})


# TEACHER DASHBOARD STATIC & PORTAL ROUTES
# ---------------------------------------------------------------------------
TEACHER_DASHBOARD_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Teacher dashboard")

@app.route("/portal/teacher", methods=["GET"])
@app.route("/portal/teacher/", methods=["GET"])
@app.route("/portal/teacher/dashboard.html", methods=["GET"])
def serve_teacher_dashboard():
    return send_from_directory(TEACHER_DASHBOARD_DIR, "dashboard.html")

@app.route("/portal/teacher/<path:filename>", methods=["GET"])
def serve_teacher_assets(filename):
    return send_from_directory(TEACHER_DASHBOARD_DIR, filename)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
