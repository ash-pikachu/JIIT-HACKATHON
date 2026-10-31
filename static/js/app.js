const chatWindow = document.querySelector("#chatWindow");
const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const quizDialog = document.querySelector("#quizDialog");
const quizBody = document.querySelector("#quizBody");
const selectionNoteBtn = document.querySelector("#selectionNoteBtn");
let selectedTutorText = "";

const roadmapWrapper = document.querySelector("#roadmapWrapper");

if (chatWindow || roadmapWrapper) {
    if (chatWindow) {
        hydrateExistingMessages();
        // setupSelectionNotes unified into setupTextSelectionNote();
        setupHeaderScrollHide();
    }
    startInitialLesson();
}

function hydrateExistingMessages() {
    chatWindow?.querySelectorAll(".message").forEach((node) => {
        const role = [...node.classList].find((item) => ["assistant", "user", "system"].includes(item));
        node.innerHTML = renderMessageContent({ role, content: node.textContent || "" });
    });
    renderMathInElementSafe(chatWindow);
}

async function startInitialLesson() {
    setupRoadmapListeners();
    setupRoadmapArrows();
    setupQaChips();
    const isRoadmap = Boolean(document.querySelector("#roadmapWrapper"));
    const hasRoadmapCards = Boolean(document.querySelector(".roadmap-node-card"));
    const hasAssistant = Boolean(chatWindow?.querySelector(".message.assistant"));

    if (isRoadmap && hasRoadmapCards) {
        return;
    }

    if (hasAssistant && !isRoadmap) return;
    if (!isRoadmap) {
        chatWindow?.insertAdjacentHTML(
            "beforeend",
            '<article class="message system" id="lessonLoading">Preparing your customized lesson...</article>'
        );
    }
    try {
        const response = await fetch("/api/lesson/start", { method: "POST" });
        const data = await response.json();
        document.querySelector("#lessonLoading")?.remove();
        if (data.messages && data.messages.length > 0) {
            document.querySelector("#roadmapEmptyGuide")?.remove();
            renderMessages(data.messages);
        }
        if (data.roadmap_data) {
            renderRoadmap(data.roadmap_data, data.current_roadmap_step, data.completed_milestones);
        }
    } catch (err) {
        console.error("Failed to start initial lesson:", err);
    }
    setupQaChips();
}

function scrollToResponseStart(targetRole = "assistant") {
    if (!chatWindow) return;
    const targetMessages = chatWindow.querySelectorAll(`.message.${targetRole}`);
    if (targetMessages.length > 0) {
        const latest = targetMessages[targetMessages.length - 1];
        // Calculate offset so top of response starts right at top of view
        const containerRect = chatWindow.getBoundingClientRect();
        const targetRect = latest.getBoundingClientRect();
        const relativeTop = targetRect.top - containerRect.top + chatWindow.scrollTop;
        chatWindow.scrollTo({
            top: Math.max(relativeTop - 8, 0),
            behavior: "smooth"
        });
        latest.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function renderMessages(messages, scrollToResponse = true) {
    if (!chatWindow) return;
    chatWindow.innerHTML = messages
        .map((message) => `<article class="message ${message.role}">${renderMessageContent(message)}</article>`)
        .join("");
    
    renderMathInElementSafe(chatWindow);
    lucide.createIcons();

    if (scrollToResponse) {
        // Place user right at the starting point of the generated response
        setTimeout(() => {
            scrollToResponseStart("assistant");
        }, 60);
    }
}

function renderMessageContent(message) {
    if (message.role === "assistant") {
        return `
            ${formatTutorText(message.content)}
            <div class="message-meta-actions">
                <button type="button" class="msg-action-btn msg-save-note-btn" title="Save this lesson explanation to Quick Notes">
                    <i data-lucide="bookmark-plus"></i>
                    <span>Save to Notes</span>
                </button>
            </div>
        `;
    }
    return escapeHtml(message.content);
}


// ─── Mathematical Formula Rendering (KaTeX) ──────────────────────────────────
function renderKatexToString(tex, isDisplay = false) {
    const rawTex = String(tex || "").trim();
    if (!rawTex) return "";
    if (typeof window !== "undefined" && window.katex && typeof window.katex.renderToString === "function") {
        try {
            return window.katex.renderToString(rawTex, {
                displayMode: isDisplay,
                throwOnError: false
            });
        } catch (err) {
            console.warn("KaTeX string render notice:", err);
        }
    }
    return isDisplay ? `$$${rawTex}$$` : `$${rawTex}$`;
}

function renderMathInElementSafe(elem) {
    if (!elem) return;
    const runRender = () => {
        if (typeof renderMathInElement === "function") {
            try {
                renderMathInElement(elem, {
                    delimiters: [
                        { left: "$$", right: "$$", display: true },
                        { left: "\\[", right: "\\]", display: true },
                        { left: "$", right: "$", display: false },
                        { left: "\\(", right: "\\)", display: false }
                    ],
                    throwOnError: false,
                    ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code", "option"]
                });
            } catch (err) {
                console.warn("KaTeX auto-render notice:", err);
            }
        }
    };

    if (typeof renderMathInElement === "function") {
        runRender();
    } else {
        setTimeout(runRender, 50);
        setTimeout(runRender, 200);
        setTimeout(runRender, 600);
    }
}

// Global hook to ensure all math across the page is rendered after DOM load
if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
    window.addEventListener("DOMContentLoaded", () => {
        renderMathInElementSafe(document.body);
    });
    window.addEventListener("load", () => {
        renderMathInElementSafe(document.body);
    });
}

function formatTutorText(value) {
    const lines = String(value)
        .replaceAll("\r\n", "\n")
        .replace(/```(?:\w+)?/g, "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

    let sectionIndex = 0;
    const parts = lines.map((rawLine) => {
        // 1. Markdown Headings (#, ##, ###, etc.)
        const markdownHeading = rawLine.match(/^#{1,6}\s+(.+)$/);
        if (markdownHeading) {
            sectionIndex += 1;
            const headingContent = markdownHeading[1].trim();
            const colorClass = `tone-${((sectionIndex - 1) % 4) + 1}`;
            const numMatch = headingContent.match(/^(\d+)[.)]\s+(.+)$/);
            if (numMatch) {
                return `<h3 class="tutor-section-title ${colorClass}"><span class="tutor-section-badge">${numMatch[1]}</span><span class="tutor-section-title-text">${inlineFormat(numMatch[2])}</span></h3>`;
            }
            return `<h3 class="tutor-section-title ${colorClass}"><span class="tutor-section-title-text">${inlineFormat(headingContent)}</span></h3>`;
        }

        // 2. Numbered explanation points/cards (e.g. 1. "RuBisCO...", 2. ...)
        const numbered = rawLine.match(/^(\d+)[.)]\s+(.+)$/);
        if (numbered) {
            sectionIndex += 1;
            const colorClass = `tone-${((sectionIndex - 1) % 4) + 1}`;
            return `<div class="tutor-numbered-item ${colorClass}"><span class="tutor-item-badge">${numbered[1]}</span><div class="tutor-item-body">${inlineFormat(numbered[2])}</div></div>`;
        }

        // 3. Bullet points (e.g. - item, * item, • item)
        const bullet = rawLine.match(/^[-*•]\s+(.+)$/);
        if (bullet) {
            return `<div class="tutor-bullet">${inlineFormat(bullet[1])}</div>`;
        }

        // 4. Blockquotes or callouts (e.g. > Note...)
        const callout = rawLine.match(/^>\s*(.+)$/);
        if (callout) {
            return `<div class="tutor-callout">${inlineFormat(callout[1])}</div>`;
        }

        // 5. Subtopics (e.g. Mechanism: ...)
        const subtopic = rawLine.match(/^([A-Z][A-Za-z0-9 /()&-]{2,54}):\s+(.+)$/);
        if (subtopic) {
            return `<p class="tutor-subtopic"><strong class="tutor-subtopic-label">${inlineFormat(subtopic[1])}</strong><span class="tutor-subtopic-text">${inlineFormat(subtopic[2])}</span></p>`;
        }

        // 6. Regular paragraph
        return `<p>${inlineFormat(rawLine)}</p>`;
    });

    return `<div class="tutor-content">${parts.join("")}</div>`;
}

function inlineFormat(value) {
    if (value === null || value === undefined) return "";
    // Pre-normalize escaped dollars from LLM e.g. \$sigma_B^2... -> $sigma_B^2...
    let cleanVal = String(value)
        .replace(/\\\$([^$\n]+?)(?:\\\$|\$)/g, "$$$1$")
        .replace(/\\\$([a-zA-Z0-9_^{}\\+\-*=()]+)/g, "$$$1$$");

    // Extract and render math tokens directly to KaTeX HTML before HTML escaping
    const mathTokens = [];
    const saveMathToken = (renderedHtml) => {
        const id = `@@@KATEX${mathTokens.length}@@@`;
        mathTokens.push(renderedHtml);
        return id;
    };

    // 1. Display math: $$...$$ and \[...\]
    cleanVal = cleanVal.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => saveMathToken(renderKatexToString(tex, true)));
    cleanVal = cleanVal.replace(/\\\[([\s\S]+?)\\\]/g, (_, tex) => saveMathToken(renderKatexToString(tex, true)));

    // 2. Parentheses math: \(...\)
    cleanVal = cleanVal.replace(/\\\(([\s\S]+?)\\\)/g, (_, tex) => saveMathToken(renderKatexToString(tex, false)));

    // 3. Inline math: $...$ (ignoring literal currency e.g. $50)
    cleanVal = cleanVal.replace(/(^|[^\\])\$([^\s$](?:[^$\n]*?[^\s$])?)\$/g, (match, prefix, tex) => {
        if (/^\d+(?:\.\d+)?$/.test(tex.trim())) {
            return prefix + '$' + tex + '$';
        }
        return prefix + saveMathToken(renderKatexToString(tex, false));
    });

    // 4. Chemical formulas with subscripts if written as CO_2, O_2, H_2O outside math
    cleanVal = cleanVal.replace(/\b([A-Z][a-z]?)_(\d+)\b/g, "$1___SUB_$2___");

    let html = escapeHtml(cleanVal)
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<strong>$1</strong>")
        .replace(/___SUB_(\d+)___/g, "<sub>$1</sub>");

    // Restore rendered KaTeX expressions cleanly
    mathTokens.forEach((token, i) => {
        html = html.split(`@@@KATEX${i}@@@`).join(token);
    });

    return html;
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

chatForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;
    chatInput.value = "";
    const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
    });
    const data = await response.json();
    if (data.redirect) {
        window.location.href = data.redirect;
        return;
    }
    if (data.quiz) {
        await openQuiz();
        return;
    }
    if (data.messages) renderMessages(data.messages, true);
});

document.querySelector("#quizStart")?.addEventListener("click", openQuiz);
document.querySelector("#closeQuiz")?.addEventListener("click", () => quizDialog?.close());

function updateUnderstandingBarRealtime(data) {
    if (!data || data.understanding === undefined) return;

    const percent = Math.round(Number(data.understanding));
    const levelLabel = data.level_label || (percent >= 70 ? "Expert" : percent >= 35 ? "Average" : "Newbie");
    const levelHint = data.level_hint || (percent >= 70 ? "Strong mastery" : percent >= 35 ? "Growing steadily" : "Building foundations");
    const levelIcon = data.level_icon || (percent >= 70 ? "badge-check" : percent >= 35 ? "book-open-check" : "sprout");

    // 1. Sidebar Mastery Progress Bar
    const bar = document.querySelector("#sidebarMasteryBar");
    if (bar) {
        bar.style.width = `${percent}%`;
        bar.classList.remove("meter-updating");
        void bar.offsetWidth; // trigger reflow for smooth re-animation
        bar.classList.add("meter-updating");
    }

    // 2. Sidebar Mastery Percentage Text
    const percentEl = document.querySelector("#sidebarMasteryPercent");
    if (percentEl) {
        percentEl.textContent = `${percent}%`;
    }

    // 3. Sidebar Mastery Card level class (level-newbie, level-average, level-expert)
    const card = document.querySelector("#sidebarMasteryCard");
    if (card) {
        card.classList.remove("level-newbie", "level-average", "level-expert");
        card.classList.add(`level-${levelLabel.toLowerCase()}`);
    }

    // 4. Sidebar Level Badge Text & Hint
    const labelEl = document.querySelector("#sidebarMasteryLabel");
    if (labelEl) labelEl.textContent = levelLabel;

    const hintEl = document.querySelector("#sidebarMasteryHint");
    if (hintEl) hintEl.textContent = levelHint;

    // 5. Sidebar Icon
    const iconContainer = document.querySelector("#sidebarMasteryBadge");
    if (iconContainer) {
        const iconEl = iconContainer.querySelector("i");
        if (iconEl) {
            iconEl.setAttribute("data-lucide", levelIcon);
            if (typeof lucide !== "undefined" && typeof lucide.createIcons === "function") {
                lucide.createIcons();
            }
        }
    }

    // 6. Sidebar Past Topics Pill for Active Topic
    const activeTopicForm = document.querySelector(".past-topic-item.active");
    if (activeTopicForm) {
        const pill = activeTopicForm.querySelector(".past-topic-pill");
        if (pill) {
            pill.textContent = `${percent}%`;
            pill.classList.remove("newbie", "average", "expert");
            pill.classList.add(percent >= 70 ? "expert" : percent >= 35 ? "average" : "newbie");
        }
    }
}

async function openQuiz() {
    if (!quizDialog || !quizBody) return;
    quizBody.innerHTML = "<p>Preparing flashcards...</p>";
    quizDialog.showModal();
    const response = await fetch("/api/quiz/start", { method: "POST" });
    renderQuiz(await response.json());
}

function renderQuiz(data) {
    if (!quizBody) return;
    updateUnderstandingBarRealtime(data);
    if (data.done) {
        const isRoadmap = Boolean(data.is_roadmap || document.querySelector("#roadmapWrapper"));
        const score = data.score !== undefined ? data.score : 0;
        const passed70 = score >= 70;

        let statusBanner = "";
        let actionButtons = "";

        if (isRoadmap) {
            if (data.roadmap_data) {
                renderRoadmap(data.roadmap_data, data.current_roadmap_step, data.completed_milestones);
            }
            if (passed70) {
                statusBanner = `
                    <div class="milestone-pass-banner success">
                        <div style="font-size: 32px; margin-bottom: 6px;">🎉</div>
                        <strong style="font-size: 18px; color: #15803d;">Milestone Completed!</strong>
                        <p style="margin: 6px 0 0 0; color: #166534; font-size: 14px;">
                            You scored <strong>${score}%</strong> (&ge;70% required). This milestone is now marked completed on your roadmap!
                        </p>
                    </div>
                `;
                actionButtons = `
                    <button class="primary-btn" type="button" id="returnRoadmapBtn"><i data-lucide="map"></i> Return to Roadmap</button>
                    <button class="secondary-btn" type="button" id="closeQuizDone">Continue Learning Here</button>
                `;
            } else {
                statusBanner = `
                    <div class="milestone-pass-banner retry">
                        <div style="font-size: 32px; margin-bottom: 6px;">⚠️</div>
                        <strong style="font-size: 18px; color: #b45309;">Milestone Incomplete</strong>
                        <p style="margin: 6px 0 0 0; color: #92400e; font-size: 14px;">
                            You scored <strong>${score}%</strong>. A score of at least <strong>70%</strong> is required to mark this milestone completed in the roadmap.
                        </p>
                    </div>
                `;
                actionButtons = `
                    <button class="secondary-btn" type="button" id="retryQuizBtn"><i data-lucide="rotate-ccw"></i> Retake Flashcards</button>
                    <button class="ghost-btn" type="button" id="closeQuizDone">Review Lesson First</button>
                `;
            }
        } else {
            statusBanner = `
                <div style="font-size: 32px; margin-bottom: 8px;">🎉</div>
                <strong style="font-size: 18px; color: #000000;">Flashcard Session Complete!</strong>
            `;
            actionButtons = `
                <button class="primary-btn" type="button" id="closeQuizDone">Continue Learning</button>
            `;
        }

        quizBody.innerHTML = `
            <div class="quiz-question" style="text-align: center; padding: 24px;">
                ${statusBanner}
                <div style="display: flex; justify-content: center; gap: 20px; margin: 16px 0;">
                    <div><strong>${data.correct}/${data.total}</strong><br><small style="color: var(--muted)">Correct</small></div>
                    <div><strong style="color: ${passed70 ? '#FFAB00' : '#2C2C2C'}">${score}%</strong><br><small style="color: var(--muted)">Score</small></div>
                    <div><strong>${data.understanding}%</strong><br><small style="color: var(--muted)">Mastery</small></div>
                </div>
            </div>
            <div class="quiz-actions" style="justify-content: center; gap: 12px; margin-top: 14px;">
                ${actionButtons}
            </div>
        `;
        document.querySelector("#closeQuizDone")?.addEventListener("click", () => {
            quizDialog?.close();
        });
        renderMathInElementSafe(quizBody);
        document.querySelector("#retryQuizBtn")?.addEventListener("click", () => {
            openQuiz();
        });
        document.querySelector("#returnRoadmapBtn")?.addEventListener("click", async () => {
            quizDialog?.close();
            try {
                const res = await fetch("/api/roadmap/view", { method: "POST" });
                const rData = await res.json();
                if (rData.redirect) {
                    window.location.href = rData.redirect;
                    return;
                }
            } catch (err) {
                window.location.href = "/learn";
            }
        });
        lucide.createIcons();
        return;
    }
    if (!data.card) {
        quizBody.innerHTML = "<p>Prashiksha could not create flashcards yet. Learn a little more, then try again.</p>";
        return;
    }

    const card = data.card;
    const isMcq = Boolean(card.options && card.options.length > 0);

    // Parse correct answers
    let correctLetters = [];
    if (Array.isArray(card.answer)) {
        correctLetters = card.answer.map(a => {
            const m = String(a).trim().toUpperCase().match(/^([A-D])/);
            return m ? m[1] : String(a).trim().toUpperCase();
        });
    } else if (typeof card.answer === "string") {
        const matches = card.answer.toUpperCase().match(/\b([A-D])\b/g);
        if (matches && (matches.length > 1 || card.type === "multiple" || card.is_multiple)) {
            correctLetters = matches;
        } else {
            const singleMatch = card.answer.match(/^([A-D])/i);
            correctLetters = [singleMatch ? singleMatch[1].toUpperCase() : card.answer.trim().toUpperCase()];
        }
    }
    // Remove duplicates
    correctLetters = Array.from(new Set(correctLetters)).filter(Boolean);

    const isMultiple = isMcq && (
        card.type === "multiple" ||
        card.type === "multi_select" ||
        Boolean(card.is_multiple) ||
        correctLetters.length > 1
    );

    let optionsHtml = "";
    if (isMcq) {
        if (isMultiple) {
            optionsHtml = `
                <div class="mcq-options is-multiple-options" id="mcqOptionsContainer">
                    ${card.options.map(opt => `
                        <button class="mcq-option-btn multi-select-btn" type="button" data-val="${escapeHtml(opt)}">
                            <span class="mcq-select-indicator checkbox">
                                <i data-lucide="check" style="width: 13px; height: 13px;"></i>
                            </span>
                            <span class="mcq-opt-text">${inlineFormat(opt)}</span>
                        </button>
                    `).join("")}
                </div>
                <div style="margin-top: 14px; display: flex; justify-content: flex-end;" id="multiSubmitWrapper">
                    <button class="primary-btn" id="submitMultiBtn" type="button" style="gap: 8px;">
                        <i data-lucide="check-circle" style="width: 16px; height: 16px;"></i>
                        <span>Submit Answer</span>
                    </button>
                </div>
            `;
        } else {
            optionsHtml = `
                <div class="mcq-options" id="mcqOptionsContainer">
                    ${card.options.map(opt => `
                        <button class="mcq-option-btn single-select-btn" type="button" data-val="${escapeHtml(opt)}">
                            <span class="mcq-select-indicator radio"></span>
                            <span class="mcq-opt-text">${inlineFormat(opt)}</span>
                        </button>
                    `).join("")}
                </div>
            `;
        }
    } else {
        optionsHtml = `
            <div style="width: 100%;">
                <textarea id="quizAnswer" placeholder="Type your answer here..."></textarea>
                <button class="primary-btn" id="submitTextQuiz" type="button" style="margin-top: 10px;">Submit Answer</button>
            </div>
        `;
    }

    quizBody.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
            <p class="eyebrow" style="margin: 0;">Question ${data.index + 1} of ${data.total}</p>
            ${isMcq ? (isMultiple ? `
                <span class="quiz-type-badge multiple">
                    <i data-lucide="check-square" style="width: 13px; height: 13px;"></i>
                    <span>Multiple Option &bull; Select all that apply</span>
                </span>
            ` : `
                <span class="quiz-type-badge single">
                    <i data-lucide="disc" style="width: 13px; height: 13px;"></i>
                    <span>Single Option &bull; 1 correct answer</span>
                </span>
            `) : ""}
        </div>
        <div class="quiz-question">${inlineFormat(card.question)}</div>

        <div class="quiz-content-layout" id="quizContentLayout">
            ${optionsHtml}
            <div class="quiz-explanation-panel" id="quizExplanationPanel">
                <div class="quiz-explanation-head">
                    <i data-lucide="info" style="width: 16px; height: 16px;"></i>
                    <span>Explanation</span>
                </div>
                <div class="quiz-explanation-text" id="quizExplanationText"></div>
            </div>
        </div>

        <div class="quiz-actions" id="quizFooterActions" style="display: none; align-items: center; justify-content: space-between; margin-top: 16px;">
            <button class="ghost-btn" id="showExplanationBtn" type="button" style="gap: 8px;">
                <i data-lucide="help-circle" style="width: 16px; height: 16px;"></i>
                <span>Explanation</span>
            </button>
            <button class="primary-btn" id="nextQuizBtn" type="button" style="gap: 8px;">
                <span>${data.index + 1 === data.total ? "Finish Flashcards" : "Next Question"}</span>
                <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
            </button>
        </div>
    `;

    lucide.createIcons();

    if (isMcq && isMultiple) {
        let answered = false;
        let answerPromise = null;

        document.querySelectorAll(".mcq-option-btn.multi-select-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                if (answered) return;
                btn.classList.toggle("is-selected");
                const count = document.querySelectorAll(".mcq-option-btn.multi-select-btn.is-selected").length;
                const submitBtn = document.querySelector("#submitMultiBtn");
                if (submitBtn) {
                    submitBtn.innerHTML = `
                        <i data-lucide="check-circle" style="width: 16px; height: 16px;"></i>
                        <span>Submit Answer ${count > 0 ? `(${count} selected)` : ""}</span>
                    `;
                    lucide.createIcons();
                }
            });
        });

        const submitBtn = document.querySelector("#submitMultiBtn");
        submitBtn?.addEventListener("click", () => {
            if (answered) return;
            const selectedBtns = Array.from(document.querySelectorAll(".mcq-option-btn.multi-select-btn.is-selected"));
            if (selectedBtns.length === 0) {
                alert("Please select at least one option before submitting.");
                return;
            }
            answered = true;
            submitBtn.style.display = "none";

            const selectedVals = selectedBtns.map(b => b.getAttribute("data-val") || "");
            const selectedLetters = selectedVals.map(val => {
                const m = val.match(/^([A-D])/i);
                return m ? m[1].toUpperCase() : val.trim().toUpperCase();
            });

            answerPromise = fetch("/api/quiz/answer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answer: selectedLetters.join(", "), answers: selectedLetters, skip: false }),
            }).then(r => r.json()).then(resData => {
                updateUnderstandingBarRealtime(resData);
                return resData;
            });

            // Highlight options:
            // Any option in correctLetters gets opt-correct
            // Any selected option NOT in correctLetters gets opt-wrong
            document.querySelectorAll(".mcq-option-btn.multi-select-btn").forEach(b => {
                b.disabled = true;
                const optVal = b.getAttribute("data-val") || "";
                const matchOpt = optVal.match(/^([A-D])/i);
                const optLetter = matchOpt ? matchOpt[1].toUpperCase() : optVal.trim().toUpperCase();

                if (correctLetters.includes(optLetter)) {
                    b.classList.add("opt-correct");
                } else if (b.classList.contains("is-selected")) {
                    b.classList.add("opt-wrong");
                }
            });

            // Display action buttons: Explanation & Next
            const footerActions = document.querySelector("#quizFooterActions");
            if (footerActions) footerActions.style.display = "flex";

            // Setup explanation button toggle
            const explanationBtn = document.querySelector("#showExplanationBtn");
            const explanationPanel = document.querySelector("#quizExplanationPanel");
            const explanationText = document.querySelector("#quizExplanationText");
            const contentLayout = document.querySelector("#quizContentLayout");

            const explanationContent = card.explanation || `The correct options are: ${correctLetters.join(", ")}.`;
            if (explanationText) { explanationText.innerHTML = inlineFormat(explanationContent); renderMathInElementSafe(explanationText); }

            explanationBtn?.addEventListener("click", () => {
                if (!explanationPanel) return;
                const isVisible = explanationPanel.classList.contains("is-visible");
                if (isVisible) {
                    explanationPanel.classList.remove("is-visible");
                    contentLayout?.classList.remove("has-explanation");
                } else {
                    explanationPanel.classList.add("is-visible");
                    contentLayout?.classList.add("has-explanation");
                }
            });

            const nextBtn = document.querySelector("#nextQuizBtn");
            nextBtn?.addEventListener("click", async () => {
                nextBtn.disabled = true;
                nextBtn.innerHTML = "Loading...";
                const nextData = await answerPromise;
                renderQuiz(nextData);
            });
        });

    } else if (isMcq && !isMultiple) {
        let answered = false;
        const targetCorrect = correctLetters[0] || "A";

        document.querySelectorAll(".mcq-option-btn.single-select-btn").forEach(btn => {
            btn.addEventListener("click", async () => {
                if (answered) return;
                answered = true;

                const selectedVal = btn.getAttribute("data-val") || "";
                const matchSelected = selectedVal.match(/^([A-D])/i);
                const selectedLetter = matchSelected ? matchSelected[1].toUpperCase() : selectedVal.trim().toUpperCase();

                const answerPromise = fetch("/api/quiz/answer", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ answer: selectedVal, skip: false }),
                }).then(r => r.json()).then(resData => {
                    updateUnderstandingBarRealtime(resData);
                    return resData;
                });

                // Highlight options: STRICT letter matching, NO substring inclusion
                document.querySelectorAll(".mcq-option-btn.single-select-btn").forEach(b => {
                    b.disabled = true;
                    const optVal = b.getAttribute("data-val") || "";
                    const matchOpt = optVal.match(/^([A-D])/i);
                    const optLetter = matchOpt ? matchOpt[1].toUpperCase() : optVal.trim().toUpperCase();

                    if (optLetter === targetCorrect) {
                        b.classList.add("opt-correct");
                    } else if (b === btn) {
                        b.classList.add("opt-wrong");
                    }
                });

                // Display action buttons: Explanation & Next
                const footerActions = document.querySelector("#quizFooterActions");
                if (footerActions) footerActions.style.display = "flex";

                // Setup explanation button toggle
                const explanationBtn = document.querySelector("#showExplanationBtn");
                const explanationPanel = document.querySelector("#quizExplanationPanel");
                const explanationText = document.querySelector("#quizExplanationText");
                const contentLayout = document.querySelector("#quizContentLayout");

                const explanationContent = card.explanation || `The correct option is ${targetCorrect}.`;
                if (explanationText) { explanationText.innerHTML = inlineFormat(explanationContent); renderMathInElementSafe(explanationText); }

                explanationBtn?.addEventListener("click", () => {
                    if (!explanationPanel) return;
                    const isVisible = explanationPanel.classList.contains("is-visible");
                    if (isVisible) {
                        explanationPanel.classList.remove("is-visible");
                        contentLayout?.classList.remove("has-explanation");
                    } else {
                        explanationPanel.classList.add("is-visible");
                        contentLayout?.classList.add("has-explanation");
                    }
                });

                // Next button loads next card seamlessly without reloading
                const nextBtn = document.querySelector("#nextQuizBtn");
                nextBtn?.addEventListener("click", async () => {
                    nextBtn.disabled = true;
                    nextBtn.innerHTML = "Loading...";
                    const nextData = await answerPromise;
                    renderQuiz(nextData);
                });
            });
        });
    } else {
        // Fallback for open-ended text questions
        const submitBtn = document.querySelector("#submitTextQuiz");
        submitBtn?.addEventListener("click", async () => {
            const answer = document.querySelector("#quizAnswer")?.value || "";
            submitBtn.disabled = true;
            submitBtn.innerHTML = "Checking...";
            const res = await fetch("/api/quiz/answer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answer, skip: false }),
            });
            const nextData = await res.json();
            updateUnderstandingBarRealtime(nextData);
            renderQuiz(nextData);
        });
    }
}

function renderRoadmap(roadmapData, currentStep, completedMilestones) {
    if (!roadmapData || !roadmapData.steps) return;
    const container = document.querySelector("#roadmapNodesContainer");
    const counter = document.querySelector("#roadmapStepCounter");
    const progress = document.querySelector("#roadmapProgressBar");
    const steps = roadmapData.steps || [];
    const completedList = completedMilestones || [];
    const hasActive = currentStep !== null && currentStep !== undefined && currentStep >= 0;

    if (counter) {
        counter.textContent = `${completedList.length} of ${steps.length} Milestones Completed`;
    }
    if (progress) {
        const percent = Math.round((completedList.length / Math.max(steps.length, 1)) * 100);
        progress.style.width = `${percent}%`;
    }

    if (container) {
        container.innerHTML = steps.map((step, idx) => {
            const isCompleted = completedList.includes(idx);
            const isActive = hasActive && idx === currentStep && !isCompleted;
            const statusClass = isCompleted ? "is-completed" : isActive ? "is-active" : "is-upcoming";
            const durationHtml = step.duration ? `<span class="node-duration"><i data-lucide="clock"></i> ${escapeHtml(step.duration)}</span>` : "";
            
            let footerHtml = "";
            if (isCompleted) {
                footerHtml = `<a class="node-jump-btn completed" href="/roadmap/jump/${idx}"><i data-lucide="check-circle-2"></i> Review (Completed ≥70%)</a>`;
            } else if (isActive) {
                footerHtml = `<a class="node-jump-btn active" href="/roadmap/jump/${idx}"><i data-lucide="sparkles"></i> Continue Deep Learning</a>`;
            } else {
                footerHtml = `<a class="node-jump-btn" href="/roadmap/jump/${idx}"><i data-lucide="compass"></i> Start Deep Learning</a>`;
            }

            const whatWillBe = step.what_will_be_explained || [
                `Core concepts, definitions, and scope of ${step.title || "this subtopic"}`,
                "Intuitive real-world analogy and mechanism breakdown",
                "Key takeaways tested in the 70% flashcard check"
            ];
            const briefItems = Array.isArray(whatWillBe)
                ? whatWillBe.map(pt => `<li>${inlineFormat(pt)}</li>`).join("")
                : `<li>${inlineFormat(whatWillBe)}</li>`;

            const cardHtml = `
                <div class="roadmap-node-card ${statusClass}" data-step-idx="${idx}">
                    <div class="node-top-bar">
                        <span class="node-number">Milestone ${step.step || (idx + 1)}</span>
                        ${durationHtml}
                    </div>
                    <h4 class="node-title">${escapeHtml(step.title || "")}</h4>
                    <div class="node-desc-wrap">
                        <p class="node-desc">
                            ${inlineFormat(step.content || "")}
                            <button class="node-more-btn" type="button" data-step-idx="${idx}">... More</button>
                        </p>
                        <div class="node-brief-drawer" id="nodeBriefDrawer-${idx}" style="display: none;">
                            <div class="brief-drawer-title">
                                <i data-lucide="list-checks"></i> What AI will explain in this step:
                            </div>
                            <ul class="brief-points-list">
                                ${briefItems}
                            </ul>
                        </div>
                    </div>
                    <div class="node-sequence-flow">
                        <span class="flow-pill"><i data-lucide="book-open"></i> Deep Lesson</span>
                        <i data-lucide="arrow-right" class="flow-arrow"></i>
                        <span class="flow-pill flow-quiz"><i data-lucide="cards"></i> Quiz (≥70% to pass)</span>
                    </div>
                    <div class="node-action-footer">
                        ${footerHtml}
                    </div>
                </div>
            `;

            const connectorHtml = idx < steps.length - 1 ? `
                <div class="roadmap-connector">
                    <div class="connector-line"></div>
                    <div class="connector-checkpoint" title="Flashcard Checkpoint">
                        <i data-lucide="cards"></i>
                    </div>
                    <div class="connector-line"></div>
                </div>
            ` : "";

            return cardHtml + connectorHtml;
        }).join("");

        setupRoadmapListeners();
        setupRoadmapArrows();
        lucide.createIcons();
        renderMathInElementSafe(container);

        if (hasActive) {
            const activeCard = container.querySelector(".roadmap-node-card.is-active");
            if (activeCard) {
                activeCard.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
            }
        }
    }
}

function setupRoadmapArrows() {
    const scroller = document.querySelector("#roadmapMapScroller");
    const leftBtn = document.querySelector("#roadmapScrollLeft");
    const rightBtn = document.querySelector("#roadmapScrollRight");
    if (!scroller || !leftBtn || !rightBtn) return;

    function updateArrowStates() {
        const tolerance = 6;
        const atStart = scroller.scrollLeft <= tolerance;
        const atEnd = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - tolerance;
        const canScroll = scroller.scrollWidth > scroller.clientWidth + tolerance;

        if (!canScroll) {
            leftBtn.disabled = true;
            rightBtn.disabled = true;
            leftBtn.classList.add("is-disabled");
            rightBtn.classList.add("is-disabled");
        } else {
            leftBtn.disabled = atStart;
            rightBtn.disabled = atEnd;
            leftBtn.classList.toggle("is-disabled", atStart);
            rightBtn.classList.toggle("is-disabled", atEnd);
        }
    }

    if (!leftBtn.dataset.bound) {
        leftBtn.dataset.bound = "true";
        leftBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const scrollDist = Math.max(scroller.clientWidth * 0.75, 280);
            scroller.scrollBy({ left: -scrollDist, behavior: "smooth" });
        });
    }

    if (!rightBtn.dataset.bound) {
        rightBtn.dataset.bound = "true";
        rightBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const scrollDist = Math.max(scroller.clientWidth * 0.75, 280);
            scroller.scrollBy({ left: scrollDist, behavior: "smooth" });
        });
    }

    if (!scroller.dataset.arrowsBound) {
        scroller.dataset.arrowsBound = "true";
        scroller.addEventListener("scroll", updateArrowStates, { passive: true });
        window.addEventListener("resize", updateArrowStates, { passive: true });
    }

    setTimeout(updateArrowStates, 100);
    setTimeout(updateArrowStates, 350);
}

function showDeepLearningTransition(milestoneTitle) {
    if (document.querySelector("#dlTransitionOverlay")) return;
    const overlay = document.createElement("div");
    overlay.id = "dlTransitionOverlay";
    overlay.className = "dl-transition-overlay";
    overlay.innerHTML = `
        <div class="dl-transition-card">
            <div class="dl-transition-spinner"><i data-lucide="sparkles"></i></div>
            <h3>Entering Deep Learning Mode</h3>
            <p>Prashiksha is opening your comprehensive masterclass lesson on:</p>
            <strong>${escapeHtml(milestoneTitle)}</strong>
        </div>
    `;
    document.body.appendChild(overlay);
    lucide.createIcons();
}

function setupRoadmapListeners() {
    const cards = document.querySelectorAll(".roadmap-node-card");
    cards.forEach((card) => {
        if (card.dataset.listenerBound) return;
        card.dataset.listenerBound = "true";
        card.addEventListener("click", (e) => {
            if (e.target.closest(".node-more-btn") || e.target.closest(".node-brief-drawer")) return;
            const stepIdx = parseInt(card.dataset.stepIdx, 10);
            if (isNaN(stepIdx)) return;
            const title = card.querySelector(".node-title")?.textContent?.trim() || `Milestone ${stepIdx + 1}`;
            showDeepLearningTransition(title);
            window.location.href = `/roadmap/jump/${stepIdx}`;
        });
    });

    document.querySelectorAll(".node-more-btn").forEach((btn) => {
        if (btn.dataset.bound) return;
        btn.dataset.bound = "true";
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const stepIdx = btn.dataset.stepIdx;
            const drawer = document.querySelector(`#nodeBriefDrawer-${stepIdx}`);
            if (!drawer) return;
            const isShown = drawer.style.display !== "none";
            drawer.style.display = isShown ? "none" : "block";
            btn.textContent = isShown ? "... More" : "... Less";
            lucide.createIcons();
        });
    });

    const toggleBtn = document.querySelector("#toggleMapBtn");
    if (toggleBtn && !toggleBtn.dataset.bound) {
        toggleBtn.dataset.bound = "true";
        toggleBtn.addEventListener("click", () => {
            const scroller = document.querySelector("#roadmapMapScroller");
            const textSpan = document.querySelector("#toggleMapText");
            const icon = document.querySelector("#toggleMapIcon");
            if (!scroller) return;
            const isHidden = scroller.classList.toggle("is-collapsed");
            if (textSpan) textSpan.textContent = isHidden ? "Show Map" : "Hide Map";
            if (icon) {
                icon.setAttribute("data-lucide", isHidden ? "chevron-down" : "chevron-up");
                lucide.createIcons();
            }
            if (!isHidden) {
                setTimeout(() => {
                    setupRoadmapArrows();
                }, 60);
            }
        });
    }

    setupRoadmapArrows();
}

async function advanceRoadmap() {
    const completeBtn = document.querySelector("#completeRoadmap");
    if (completeBtn) completeBtn.disabled = true;
    try {
        const res = await fetch("/api/roadmap/complete", { method: "POST" });
        const data = await res.json();
        if (data.messages) renderMessages(data.messages, true);
        if (data.roadmap_data) renderRoadmap(data.roadmap_data, data.current_roadmap_step);
    } catch (err) {
        console.error("Failed to advance roadmap", err);
    } finally {
        if (completeBtn) completeBtn.disabled = false;
    }
}

function setupQaChips() {
    const chips = document.querySelectorAll(".qa-prompt-chip");
    chips.forEach((chip) => {
        if (chip.dataset.bound) return;
        chip.dataset.bound = "true";
        chip.addEventListener("click", () => {
            const question = chip.dataset.q;
            if (!question || !chatInput || !chatForm) return;
            chatInput.value = question;
            chatForm.dispatchEvent(new Event("submit", { cancelable: true }));
        });
    });
}

function setupSelectionNotes() {
    // Deprecated in favor of setupTextSelectionNote
}

function setupHeaderScrollHide() {
    // Header remains permanently visible and stable without vertical shrinkage
    return;
}

/* ─── Top Floating Dock & Flyout Panels (Notifications + Quick Notes Drawer) ── */
function setupTopDockAndPanels() {
    const notifBtn = document.querySelector("#notificationsFabBtn");
    const notifPanel = document.querySelector("#notificationsPanel");
    const closeNotifBtn = document.querySelector("#closeNotifPanel");
    const markAllReadBtn = document.querySelector("#markAllReadBtn");
    const notifBadge = document.querySelector("#notifBadge");
    const panelNotifCount = document.querySelector("#panelNotifCount");

    const notesBtn = document.querySelector("#notesFabBtn");
    const notesDrawer = document.querySelector("#notesDrawer");
    const notesBackdrop = document.querySelector("#notesDrawerBackdrop");
    const closeNotesBtn = document.querySelector("#closeNotesDrawer");
    const drawerForm = document.querySelector("#drawerQuickNoteForm");
    const drawerNotesSearch = document.querySelector("#drawerNotesSearch");
    const drawerNotesList = document.querySelector("#drawerNotesList");
    const drawerNotesCount = document.querySelector("#drawerNotesCount");
    const notesBadge = document.querySelector("#notesBadge");

    // Notifications Toggle
    notifBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!notifPanel) return;
        const isHidden = notifPanel.getAttribute("aria-hidden") === "true";
        if (isHidden) {
            notifPanel.setAttribute("aria-hidden", "false");
            // If notes drawer open, close it
            closeNotesDrawerAction();
        } else {
            notifPanel.setAttribute("aria-hidden", "true");
        }
        lucide.createIcons();
    });

    closeNotifBtn?.addEventListener("click", () => {
        notifPanel?.setAttribute("aria-hidden", "true");
    });

    // Mark all notifications as read
    markAllReadBtn?.addEventListener("click", async () => {
        try {
            const res = await fetch("/api/notifications/read", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            });
            const data = await res.json();
            document.querySelectorAll(".notif-item").forEach(item => item.classList.remove("is-unread"));
            if (notifBadge) notifBadge.classList.add("is-hidden");
            if (panelNotifCount) panelNotifCount.textContent = "0 new";
        } catch (err) {
            console.error("Failed to mark notifications read:", err);
        }
    });

    // Dismiss single notification
    document.querySelectorAll(".notif-dismiss-btn").forEach(btn => {
        btn.addEventListener("click", async (e) => {
            e.stopPropagation();
            const id = btn.getAttribute("data-dismiss");
            const item = btn.closest(".notif-item");
            if (item) {
                item.style.opacity = "0";
                item.style.transform = "translateX(20px)";
                setTimeout(() => item.remove(), 200);
            }
            try {
                const res = await fetch("/api/notifications/dismiss", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id }),
                });
                const data = await res.json();
                if (notifBadge) {
                    if (data.unread_count > 0) {
                        notifBadge.textContent = data.unread_count;
                        notifBadge.classList.remove("is-hidden");
                    } else {
                        notifBadge.classList.add("is-hidden");
                    }
                }
                if (panelNotifCount) {
                    panelNotifCount.textContent = `${data.unread_count} new`;
                }
            } catch (err) {
                console.error("Failed to dismiss notification:", err);
            }
        });
    });

    // Real-Time Notes Sync & Drawer State
    let drawerPollInterval = null;

    async function loadDrawerNotesRealtime(showLoading = false) {
        if (!drawerNotesList) return;
        const refreshBtn = document.querySelector("#refreshNotesDrawerBtn");
        if (showLoading && refreshBtn) refreshBtn.classList.add("is-spinning");

        try {
            const res = await fetch("/api/notes");
            if (!res.ok) return;
            const data = await res.json();
            const notes = data.notes || [];
            const count = data.count !== undefined ? data.count : notes.length;

            if (notesBadge) notesBadge.textContent = count;
            if (drawerNotesCount) drawerNotesCount.textContent = count;
            const pageBadge = document.querySelector("#pageNotesCountBadge");
            if (pageBadge) pageBadge.textContent = `${count} notes`;

            renderDrawerNotes(notes);
        } catch (err) {
            console.error("Failed to load real-time notes:", err);
        } finally {
            if (refreshBtn) refreshBtn.classList.remove("is-spinning");
        }
    }

    function renderDrawerNotes(notes) {
        if (!drawerNotesList) return;
        if (!notes || notes.length === 0) {
            drawerNotesList.innerHTML = `
                <div class="empty-panel-state" id="drawerEmptyState">
                    <i data-lucide="notebook-tabs"></i>
                    <p>No notes saved yet.<br><small>Write above, click "Save to Notes" on lessons, or highlight any text.</small></p>
                </div>
            `;
            lucide.createIcons();
            return;
        }

        const query = (drawerNotesSearch?.value || "").trim().toLowerCase();
        drawerNotesList.innerHTML = notes.map((note) => {
            const title = (note.title || "").toLowerCase();
            const topic = (note.topic || "").toLowerCase();
            const content = (note.content || "").toLowerCase();
            const isMatch = !query || title.includes(query) || topic.includes(query) || content.includes(query);

            return `
                <div class="drawer-note-item" style="display: ${isMatch ? 'flex' : 'none'};" data-id="${note.id}" data-topic="${escapeHtml(note.topic || '')}" data-title="${escapeHtml(title)}" data-content="${escapeHtml(content)}">
                    <div class="drawer-note-header">
                        <span class="drawer-note-topic">${escapeHtml(note.topic || 'General')}</span>
                        <span class="drawer-note-cat">${escapeHtml(note.category || 'Concept')}</span>
                        <small class="drawer-note-time">${escapeHtml(note.created_at || 'Just now')}</small>
                    </div>
                    <h4 class="drawer-note-title">${inlineFormat(note.title)}</h4>
                    <p class="drawer-note-text">${inlineFormat(note.content)}</p>
                    <div class="drawer-note-actions">
                        <button type="button" class="drawer-copy-btn" title="Copy text" data-copy="${escapeHtml(note.content)}"><i data-lucide="copy"></i> Copy</button>
                        <button type="button" class="drawer-del-btn" title="Delete note" data-del="${note.id}"><i data-lucide="trash-2"></i></button>
                    </div>
                </div>
            `;
        }).join("");

        drawerNotesList.querySelectorAll(".drawer-note-item").forEach(bindDrawerItemActions);
        lucide.createIcons();
    }

    function startDrawerRealtimePolling() {
        stopDrawerRealtimePolling();
        loadDrawerNotesRealtime(false);
        drawerPollInterval = setInterval(() => {
            if (notesDrawer?.classList.contains("is-active")) {
                loadDrawerNotesRealtime(false);
            }
        }, 3500);
    }

    function stopDrawerRealtimePolling() {
        if (drawerPollInterval) {
            clearInterval(drawerPollInterval);
            drawerPollInterval = null;
        }
    }

    // Notes Drawer Toggle
    function openNotesDrawerAction() {
        notesDrawer?.classList.add("is-active");
        notesBackdrop?.classList.add("is-active");
        notesDrawer?.setAttribute("aria-hidden", "false");
        notifPanel?.setAttribute("aria-hidden", "true");
        document.querySelector("#drawerNoteTitle")?.focus();
        loadDrawerNotesRealtime(true);
        startDrawerRealtimePolling();
        lucide.createIcons();
    }

    function closeNotesDrawerAction() {
        notesDrawer?.classList.remove("is-active");
        notesBackdrop?.classList.remove("is-active");
        notesDrawer?.setAttribute("aria-hidden", "true");
        stopDrawerRealtimePolling();
    }

    notesBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        if (notesDrawer?.classList.contains("is-active")) {
            closeNotesDrawerAction();
        } else {
            openNotesDrawerAction();
        }
    });

    closeNotesBtn?.addEventListener("click", closeNotesDrawerAction);
    notesBackdrop?.addEventListener("click", closeNotesDrawerAction);
    document.querySelector("#refreshNotesDrawerBtn")?.addEventListener("click", () => {
        loadDrawerNotesRealtime(true);
    });

    // Global close on click outside or Escape
    document.addEventListener("click", (e) => {
        if (notifPanel && notifPanel.getAttribute("aria-hidden") === "false") {
            if (!notifPanel.contains(e.target) && !notifBtn?.contains(e.target)) {
                notifPanel.setAttribute("aria-hidden", "true");
            }
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            notifPanel?.setAttribute("aria-hidden", "true");
            closeNotesDrawerAction();
        }
    });

    // Drawer category chips selection
    document.querySelectorAll(".drawer-chip").forEach(chip => {
        chip.addEventListener("click", () => {
            document.querySelectorAll(".drawer-chip").forEach(c => c.classList.remove("is-active"));
            chip.classList.add("is-active");
            const cat = chip.getAttribute("data-cat") || "Concept";
            const hidden = document.querySelector("#drawerNoteCategory");
            if (hidden) hidden.value = cat;
        });
    });

    // Drawer Quick Note submission
    drawerForm?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const titleInput = document.querySelector("#drawerNoteTitle");
        const contentInput = document.querySelector("#drawerNoteContent");
        const categoryInput = document.querySelector("#drawerNoteCategory");
        const submitBtn = document.querySelector("#drawerSubmitBtn");

        const title = titleInput?.value.trim() || "Quick Note";
        const content = contentInput?.value.trim() || "";
        const category = categoryInput?.value.trim() || "Concept";

        if (!content) return;

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i data-lucide="loader"></i> Saving...';
            lucide.createIcons();
        }

        try {
            const res = await fetch("/api/notes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content, category }),
            });
            const data = await res.json();
            if (data.note) {
                if (contentInput) contentInput.value = "";
                await loadDrawerNotesRealtime(false);
                showNoteToast("✓ Saved note to Quick Notes!");
            }
        } catch (err) {
            console.error("Failed to add note from drawer:", err);
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i data-lucide="plus" style="width: 15px; height: 15px;"></i><span>Save Note</span>';
                lucide.createIcons();
            }
        }
    });

    // Drawer textarea Ctrl+Enter to submit
    document.querySelector("#drawerNoteContent")?.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            drawerForm?.dispatchEvent(new Event("submit", { cancelable: true }));
        }
    });

    // Drawer search filter in real-time
    drawerNotesSearch?.addEventListener("input", () => {
        const query = drawerNotesSearch.value.trim().toLowerCase();
        document.querySelectorAll(".drawer-note-item").forEach(item => {
            const title = (item.getAttribute("data-title") || "").toLowerCase();
            const topic = (item.getAttribute("data-topic") || "").toLowerCase();
            const text = (item.getAttribute("data-content") || "").toLowerCase();
            if (!query || title.includes(query) || topic.includes(query) || text.includes(query)) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        });
    });

    function bindDrawerItemActions(item) {
        const copyBtn = item.querySelector(".drawer-copy-btn");
        copyBtn?.addEventListener("click", () => {
            const text = copyBtn.getAttribute("data-copy") || "";
            navigator.clipboard.writeText(text);
            copyBtn.innerHTML = '<i data-lucide="check"></i> Copied!';
            lucide.createIcons();
            setTimeout(() => {
                copyBtn.innerHTML = '<i data-lucide="copy"></i> Copy';
                lucide.createIcons();
            }, 1400);
        });

        const delBtn = item.querySelector(".drawer-del-btn");
        delBtn?.addEventListener("click", async () => {
            if (!confirm("Delete this note?")) return;
            const id = delBtn.getAttribute("data-del");
            item.remove();
            try {
                const res = await fetch(`/notes/${id}/delete`, {
                    method: "POST",
                    headers: { "Accept": "application/json" }
                });
                const data = await res.json();
                if (data.count !== undefined) {
                    if (notesBadge) notesBadge.textContent = data.count;
                    if (drawerNotesCount) drawerNotesCount.textContent = data.count;
                    if (data.count === 0) {
                        renderDrawerNotes([]);
                    }
                }
            } catch (err) {
                console.error("Failed to delete note:", err);
            }
        });
    }

    // Helper: direct note creation from lesson interactions
    window.createNoteDirect = async function({ title, content, category }) {
        try {
            const res = await fetch("/api/notes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content, category }),
            });
            const data = await res.json();
            if (data.note) {
                showNoteToast("✓ Saved to Quick Notes!");
                await loadDrawerNotesRealtime(false);
            }
        } catch (err) {
            console.error("Failed to save note directly:", err);
        }
    };

    // Helper: Toast notification feedback
    window.showNoteToast = function(message) {
        document.querySelectorAll(".note-saved-toast").forEach(t => t.remove());
        const toast = document.createElement("div");
        toast.className = "note-saved-toast";
        toast.innerHTML = `<i data-lucide="check-circle-2"></i><span>${escapeHtml(message)}</span>`;
        document.body.appendChild(toast);
        lucide.createIcons();
        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(10px)";
            toast.style.transition = "all 0.3s ease";
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    };

    // Text selection to note highlight feature
    setupTextSelectionNote();

    // Initial real-time notes fetch on page load
    loadDrawerNotesRealtime(false);
}

function setupTextSelectionNote() {
    const popup = document.querySelector("#selectionNotePopup");
    const saveBtn = document.querySelector("#selectionNoteBtn");
    if (!popup || !saveBtn) return;

    let currentSelectionText = "";

    function checkAndShowPopup() {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
            popup.style.display = "none";
            currentSelectionText = "";
            return;
        }
        const text = sel.toString().trim();
        if (text.length < 3) {
            popup.style.display = "none";
            currentSelectionText = "";
            return;
        }

        const anchor = sel.anchorNode ? (sel.anchorNode.nodeType === 3 ? sel.anchorNode.parentElement : sel.anchorNode) : null;
        if (!anchor) return;
        if (anchor.closest("#notesDrawer") || anchor.closest("#notificationsPanel") || anchor.closest("input, textarea, button, form")) {
            popup.style.display = "none";
            currentSelectionText = "";
            return;
        }

        currentSelectionText = text;
        try {
            const range = sel.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
                const scrollY = window.pageYOffset || document.documentElement.scrollTop;
                popup.style.top = `${scrollY + rect.top - 12}px`;
                popup.style.left = `${scrollX + rect.left + rect.width / 2}px`;
                popup.style.display = "flex";
                lucide.createIcons();
            }
        } catch (_) {
            popup.style.display = "none";
        }
    }

    document.addEventListener("mouseup", (e) => {
        if (popup.contains(e.target)) return;
        setTimeout(checkAndShowPopup, 30);
    });

    document.addEventListener("keyup", (e) => {
        if (e.key === "Shift" || e.key.includes("Arrow")) {
            setTimeout(checkAndShowPopup, 30);
        }
    });

    document.addEventListener("mousedown", (e) => {
        if (popup.contains(e.target)) return;
        popup.style.display = "none";
    });

    saveBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!currentSelectionText) return;

        const textToSave = currentSelectionText;
        // Take current topic name as title
        const topicHeading = document.querySelector(".head-left h1")?.innerText.trim();
        const activeTopic = topicHeading || document.querySelector("#drawerNoteTitle")?.value.trim() || "Deep Learning";

        saveBtn.disabled = true;
        saveBtn.innerHTML = '<i data-lucide="check"></i> <span>Saved to Notes!</span>';
        lucide.createIcons();

        if (typeof window.createNoteDirect === "function") {
            await window.createNoteDirect({
                title: activeTopic,
                content: textToSave,
                category: "Concept",
            });
        } else {
            await fetch("/api/notes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: activeTopic,
                    content: textToSave,
                    category: "Concept",
                    topic: activeTopic
                }),
            });
        }

        setTimeout(() => {
            popup.style.display = "none";
            window.getSelection()?.removeAllRanges();
            saveBtn.disabled = false;
            saveBtn.innerHTML = '<i data-lucide="notebook-pen" style="width: 13px; height: 13px;"></i> <span>Save to Notes</span>';
            lucide.createIcons();
        }, 800);
    });
}

// Assistant message Quick Note click listener
document.addEventListener("click", async (e) => {
    const saveMsgBtn = e.target.closest(".msg-save-note-btn");
    if (!saveMsgBtn) return;
    e.stopPropagation();

    const msgArticle = saveMsgBtn.closest(".message.assistant");
    if (!msgArticle) return;

    const tutorContent = msgArticle.querySelector(".tutor-content");
    const text = tutorContent ? tutorContent.innerText.trim() : msgArticle.innerText.trim();
    if (!text) return;

    saveMsgBtn.disabled = true;
    saveMsgBtn.innerHTML = '<i data-lucide="loader"></i> Saving...';
    lucide.createIcons();

    const activeTopic = document.querySelector("#drawerNoteTitle")?.value.trim() || "Lesson Key Concept";
    await window.createNoteDirect({
        title: activeTopic,
        content: text,
        category: "Concept",
    });

    saveMsgBtn.disabled = false;
    saveMsgBtn.innerHTML = '<i data-lucide="check"></i> Saved!';
    lucide.createIcons();
    setTimeout(() => {
        saveMsgBtn.innerHTML = '<i data-lucide="bookmark-plus"></i> Save to Notes';
        lucide.createIcons();
    }, 2000);
});

/* ─── Full Notes Page (notes.html) Interactivity ──────────────────────────── */
function setupFullNotesPage() {
    const composer = document.querySelector("#mainNoteComposer");
    if (!composer) return;

    // Focus composer button
    document.querySelector("#focusComposerBtn")?.addEventListener("click", () => {
        const titleInput = document.querySelector("#composerTitle");
        titleInput?.scrollIntoView({ behavior: "smooth", block: "center" });
        titleInput?.focus();
    });

    // Category chips selection
    document.querySelectorAll(".category-chips-selector .cat-chip").forEach(chip => {
        chip.addEventListener("click", () => {
            document.querySelectorAll(".category-chips-selector .cat-chip").forEach(c => c.classList.remove("is-active"));
            chip.classList.add("is-active");
            const cat = chip.getAttribute("data-cat") || "Concept";
            const hidden = document.querySelector("#composerCategoryInput");
            if (hidden) hidden.value = cat;
        });
    });

    // Markdown formatting buttons
    const contentTextarea = document.querySelector("#composerContent");
    document.querySelectorAll(".composer-toolbar .fmt-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const fmt = btn.getAttribute("data-fmt");
            applyMarkdownFormat(contentTextarea, fmt);
            updateWordCount();
        });
    });

    function applyMarkdownFormat(textarea, format) {
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selected = text.substring(start, end);

        let before = "";
        let after = "";
        let placeholder = selected;

        switch (format) {
            case "bold":
                before = "**";
                after = "**";
                if (!selected) placeholder = "bold text";
                break;
            case "italic":
                before = "*";
                after = "*";
                if (!selected) placeholder = "italic text";
                break;
            case "heading":
                before = "\n### ";
                after = "\n";
                if (!selected) placeholder = "Heading";
                break;
            case "bullet":
                before = "\n- ";
                if (!selected) placeholder = "List item";
                break;
            case "code":
                before = "`";
                after = "`";
                if (!selected) placeholder = "code";
                break;
            case "quote":
                before = "\n> ";
                if (!selected) placeholder = "Quote";
                break;
        }

        textarea.value = text.substring(0, start) + before + placeholder + after + text.substring(end);
        textarea.focus();
        textarea.setSelectionRange(start + before.length, start + before.length + placeholder.length);
    }

    // Word counter
    function updateWordCount() {
        const counterEl = document.querySelector("#composerWordCount");
        if (!contentTextarea || !counterEl) return;
        const words = contentTextarea.value.trim() ? contentTextarea.value.trim().split(/\s+/).length : 0;
        counterEl.textContent = `${words} word${words === 1 ? "" : "s"}`;
    }

    contentTextarea?.addEventListener("input", updateWordCount);

    // Ctrl + Enter shortcut to save
    contentTextarea?.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            composer.dispatchEvent(new Event("submit", { cancelable: true }));
        }
    });

    // Live search and filter on cards grid
    const searchInput = document.querySelector("#notesSearchInput");
    const clearSearchBtn = document.querySelector("#clearNotesSearch");
    let activeFilter = "all";

    function filterCards() {
        const query = searchInput?.value.trim().toLowerCase() || "";
        if (clearSearchBtn) {
            clearSearchBtn.style.display = query ? "block" : "none";
        }

        let visibleCount = 0;
        document.querySelectorAll(".modern-note-card").forEach(card => {
            const title = (card.getAttribute("data-title") || "").toLowerCase();
            const topic = (card.getAttribute("data-topic") || "").toLowerCase();
            const content = (card.getAttribute("data-content") || "").toLowerCase();
            const category = card.getAttribute("data-category") || "Concept";

            const matchesQuery = !query || title.includes(query) || topic.includes(query) || content.includes(query);
            const matchesFilter = (activeFilter === "all") || (category.toLowerCase() === activeFilter.toLowerCase());

            if (matchesQuery && matchesFilter) {
                card.style.display = "flex";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });
    }

    searchInput?.addEventListener("input", filterCards);
    clearSearchBtn?.addEventListener("click", () => {
        if (searchInput) searchInput.value = "";
        filterCards();
        searchInput?.focus();
    });

    // Category filter pills
    document.querySelectorAll(".notes-category-filters .filter-pill").forEach(pill => {
        pill.addEventListener("click", () => {
            document.querySelectorAll(".notes-category-filters .filter-pill").forEach(p => p.classList.remove("is-active"));
            pill.classList.add("is-active");
            activeFilter = pill.getAttribute("data-filter") || "all";
            filterCards();
        });
    });

    // Copy note text
    document.querySelectorAll(".copy-note-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const text = btn.getAttribute("data-copy") || "";
            navigator.clipboard.writeText(text);
            btn.innerHTML = '<i data-lucide="check" style="width: 14px; height: 14px; color: #10b981;"></i>';
            lucide.createIcons();
            setTimeout(() => {
                btn.innerHTML = '<i data-lucide="copy" style="width: 14px; height: 14px;"></i>';
                lucide.createIcons();
            }, 1400);
        });
    });

    // Toggle card inline edit mode
    document.querySelectorAll(".edit-note-toggle-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".modern-note-card");
            if (!card) return;
            const viewMode = card.querySelector(".note-card-view-mode");
            const editForm = card.querySelector(".note-card-edit-form");
            if (viewMode && editForm) {
                viewMode.style.display = "none";
                editForm.style.display = "flex";
                editForm.querySelector(".edit-input-title")?.focus();
            }
        });
    });

    document.querySelectorAll(".cancel-edit-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".modern-note-card");
            if (!card) return;
            const viewMode = card.querySelector(".note-card-view-mode");
            const editForm = card.querySelector(".note-card-edit-form");
            if (viewMode && editForm) {
                editForm.style.display = "none";
                viewMode.style.display = "flex";
            }
        });
    });
}

// Initialize top dock and full notes page on load
setupTopDockAndPanels();
setupFullNotesPage();
lucide.createIcons();



// ====================================================================
// CLASSROOM DASHBOARD LOGIC FOR PRANJAL SINGH
// ====================================================================

const studentClassroomData = {
    student: {
        name: "Pranjal Singh",
        username: "Pranjal Singh",
        email: "singh.pranjalabc2020@gmail.com",
        rollNumber: "CSE-2026-084",
        class: "CSE 1st Year",
        classCode: "CSE 1",
        section: "Section A",
        faculty: "Dr. Ananya Sharma",
        overallMastery: "92.0%",
        topicsStudied: 42,
        studyHours: "38.4 Hours"
    },
    syllabi: {
        "CS-201": {
            course: "Data Structures & Algorithms",
            code: "CS-201",
            credits: "4.0 Credits",
            faculty: "Dr. Ananya Sharma",
            term: "Semester III • Academic Year 2026-27",
            coveredPercent: 72,
            units: [
                {
                    unitNumber: 1,
                    title: "Linear Data Structures & Algorithmic Complexity",
                    hours: "8 Hours",
                    topics: [
                        { name: "Asymptotic Analysis (Big-O, Omega, Theta) & Master Theorem", status: "Covered", date: "Sep 04, 2026", mastery: 91 },
                        { name: "Dynamic Arrays, Vectors & Amortized Complexity Analysis", status: "Covered", date: "Sep 11, 2026", mastery: 88 },
                        { name: "Singly, Doubly and Circular Linked Lists Implementation", status: "Covered", date: "Sep 18, 2026", mastery: 94 }
                    ]
                },
                {
                    unitNumber: 2,
                    title: "Stacks, Queues & Hash Table Collisions",
                    hours: "9 Hours",
                    topics: [
                        { name: "Stack Applications: Infix to Postfix & Monotonic Stacks", status: "Covered", date: "Sep 25, 2026", mastery: 82 },
                        { name: "Circular Queues, Deques & Priority Queue Heaps", status: "Covered", date: "Oct 02, 2026", mastery: 86 },
                        { name: "Hash Functions, Separate Chaining & Open Addressing Probing", status: "Covered", date: "Oct 09, 2026", mastery: 80 }
                    ]
                },
                {
                    unitNumber: 3,
                    title: "Tree Structures, Binary Search Trees & AVL Balancing",
                    hours: "11 Hours",
                    topics: [
                        { name: "Binary Tree Traversals (Inorder, Preorder, Postorder, Level-Order)", status: "Covered", date: "Oct 16, 2026", mastery: 89 },
                        { name: "Binary Search Trees Operations (Search, Insert, Delete)", status: "Covered", date: "Oct 23, 2026", mastery: 85 },
                        { name: "Self-Balancing AVL Trees (Rotations: LL, RR, LR, RL)", status: "In-Progress", date: "Oct 30, 2026", mastery: 74 },
                        { name: "B-Trees & B+ Trees for Database Indexing", status: "Upcoming", date: "Scheduled", mastery: 0 }
                    ]
                },
                {
                    unitNumber: 4,
                    title: "Graph Algorithms & Shortest Path Paradigms",
                    hours: "10 Hours",
                    topics: [
                        { name: "Graph Representations (Adjacency Matrix, Adjacency List)", status: "Upcoming", date: "Scheduled", mastery: 0 },
                        { name: "Breadth-First Search (BFS) & Depth-First Search (DFS)", status: "Upcoming", date: "Scheduled", mastery: 0 },
                        { name: "Dijkstra and Bellman-Ford Shortest Path Algorithms", status: "Upcoming", date: "Scheduled", mastery: 0 },
                        { name: "Minimum Spanning Trees: Kruskal and Prim Algorithms", status: "Upcoming", date: "Scheduled", mastery: 0 }
                    ]
                }
            ]
        },
        "CS-202": {
            course: "Operating Systems & Architecture",
            code: "CS-202",
            credits: "4.0 Credits",
            faculty: "Prof. Vikram Malhotra",
            term: "Semester III • Academic Year 2026-27",
            coveredPercent: 65,
            units: [
                {
                    unitNumber: 1,
                    title: "Operating System Foundations & Process Management",
                    hours: "8 Hours",
                    topics: [
                        { name: "Kernel vs User Mode, System Calls & Dual-Mode Operation", status: "Covered", date: "Sep 06, 2026", mastery: 90 },
                        { name: "Process Control Block (PCB), Context Switching & fork() / exec()", status: "Covered", date: "Sep 13, 2026", mastery: 86 },
                        { name: "Inter-Process Communication: Pipes, Shared Memory & Message Queues", status: "Covered", date: "Sep 20, 2026", mastery: 84 }
                    ]
                },
                {
                    unitNumber: 2,
                    title: "CPU Scheduling Algorithms & POSIX Threads",
                    hours: "10 Hours",
                    topics: [
                        { name: "Preemptive & Non-Preemptive Scheduling (FCFS, SJF, SRTF, RR)", status: "Covered", date: "Sep 27, 2026", mastery: 92 },
                        { name: "Multi-Level Feedback Queues & Real-Time Scheduling", status: "Covered", date: "Oct 04, 2026", mastery: 85 },
                        { name: "Multithreading Models & POSIX Pthreads Synchronization", status: "In-Progress", date: "Oct 11, 2026", mastery: 76 }
                    ]
                },
                {
                    unitNumber: 3,
                    title: "Process Synchronization & Deadlock Handling",
                    hours: "11 Hours",
                    topics: [
                        { name: "Critical Section Problem, Mutex Locks & Peterson's Algorithm", status: "In-Progress", date: "Oct 18, 2026", mastery: 72 },
                        { name: "Counting Semaphores & Classical IPC (Producer-Consumer, Dining Philosophers)", status: "Upcoming", date: "Scheduled", mastery: 0 },
                        { name: "Deadlock Detection, Prevention & Banker's Resource Allocation Algorithm", status: "Upcoming", date: "Scheduled", mastery: 0 }
                    ]
                },
                {
                    unitNumber: 4,
                    title: "Memory Management & Virtual Memory Demand Paging",
                    hours: "11 Hours",
                    topics: [
                        { name: "Contiguous Memory Allocation, Fragmentation & Paging Hardware MMU", status: "Upcoming", date: "Scheduled", mastery: 0 },
                        { name: "Demand Paging, Inverted Page Tables & TLB Translation", status: "Upcoming", date: "Scheduled", mastery: 0 },
                        { name: "Page Replacement Algorithms: FIFO, Optimal & LRU Clock", status: "Upcoming", date: "Scheduled", mastery: 0 },
                        { name: "Thrashing Dynamics & Working Set Model Analysis", status: "Upcoming", date: "Scheduled", mastery: 0 }
                    ]
                }
            ]
        },
        "CS-203": {
            course: "Database Management Systems",
            code: "CS-203",
            credits: "4.0 Credits",
            faculty: "Prof. Rajesh Verma",
            term: "Semester III • Academic Year 2026-27",
            coveredPercent: 80,
            units: [
                {
                    unitNumber: 1,
                    title: "Relational Data Modeling & Relational Algebra",
                    hours: "8 Hours",
                    topics: [
                        { name: "Entity-Relationship (ER) & Enhanced ER Diagram Modeling", status: "Covered", date: "Sep 08, 2026", mastery: 95 },
                        { name: "Relational Algebra: Selection, Projection, Cartesian Product & Joins", status: "Covered", date: "Sep 15, 2026", mastery: 92 },
                        { name: "Tuple & Domain Relational Calculus Formal Querying", status: "Covered", date: "Sep 22, 2026", mastery: 87 }
                    ]
                },
                {
                    unitNumber: 2,
                    title: "Advanced SQL, Complex Queries & Integrity Constraints",
                    hours: "9 Hours",
                    topics: [
                        { name: "Correlated Subqueries, Common Table Expressions (CTEs) & Joins", status: "Covered", date: "Sep 29, 2026", mastery: 94 },
                        { name: "SQL Window Functions: RANK(), DENSE_RANK(), OVER & Partitioning", status: "Covered", date: "Oct 06, 2026", mastery: 88 },
                        { name: "Database Triggers, Stored Procedures & Views Optimization", status: "Covered", date: "Oct 13, 2026", mastery: 84 }
                    ]
                },
                {
                    unitNumber: 3,
                    title: "Relational Schema Design & Normalization Theory",
                    hours: "10 Hours",
                    topics: [
                        { name: "Functional Dependencies & Armstrong's Inference Axioms", status: "Covered", date: "Oct 20, 2026", mastery: 90 },
                        { name: "1NF, 2NF, 3NF & Boyce-Codd Normal Form (BCNF) Decompositions", status: "Covered", date: "Oct 27, 2026", mastery: 86 },
                        { name: "Lossless Join Decomposition & Dependency Preservation Verification", status: "In-Progress", date: "Oct 31, 2026", mastery: 75 }
                    ]
                },
                {
                    unitNumber: 4,
                    title: "Transactions, Concurrency Control & Crash Recovery",
                    hours: "9 Hours",
                    topics: [
                        { name: "ACID Transaction Properties & Serializability Testing Graphs", status: "In-Progress", date: "Scheduled", mastery: 70 },
                        { name: "Two-Phase Locking (2PL), Strict 2PL & Timestamp Ordering Protocols", status: "Upcoming", date: "Scheduled", mastery: 0 },
                        { name: "ARIES Log-Based Recovery, Checkpointing & WAL (Write-Ahead Logging)", status: "Upcoming", date: "Scheduled", mastery: 0 }
                    ]
                }
            ]
        },
        "CS-204": {
            course: "Natural Sciences & Computational AI",
            code: "CS-204",
            credits: "3.0 Credits",
            faculty: "Dr. Sneha Rao",
            term: "Semester III • Academic Year 2026-27",
            coveredPercent: 85,
            units: [
                {
                    unitNumber: 1,
                    title: "Foundations of Mathematical AI & Probabilistic Reasoning",
                    hours: "7 Hours",
                    topics: [
                        { name: "Conditional Probability, Bayes' Theorem & Naive Bayes Classification", status: "Covered", date: "Sep 10, 2026", mastery: 96 },
                        { name: "Information Entropy, Gini Impurity & Decision Tree Induction", status: "Covered", date: "Sep 17, 2026", mastery: 92 },
                        { name: "Linear Algebra: Principal Component Analysis (PCA) & SVD", status: "Covered", date: "Sep 24, 2026", mastery: 89 }
                    ]
                },
                {
                    unitNumber: 2,
                    title: "Machine Learning Algorithms & Gradient Optimization",
                    hours: "9 Hours",
                    topics: [
                        { name: "Linear & Logistic Regression with Stochastic Gradient Descent", status: "Covered", date: "Oct 01, 2026", mastery: 94 },
                        { name: "Regularization (L1 Lasso, L2 Ridge) & Bias-Variance Tradeoff", status: "Covered", date: "Oct 08, 2026", mastery: 90 },
                        { name: "Support Vector Machines (SVM) & Kernel Radial Basis Functions", status: "Covered", date: "Oct 15, 2026", mastery: 88 }
                    ]
                },
                {
                    unitNumber: 3,
                    title: "Deep Learning & Neural Network Representations",
                    hours: "10 Hours",
                    topics: [
                        { name: "Multilayer Perceptrons, Activation Functions & Backpropagation", status: "Covered", date: "Oct 22, 2026", mastery: 93 },
                        { name: "Convolutional Neural Networks (CNNs) & Feature Extraction Filters", status: "In-Progress", date: "Oct 29, 2026", mastery: 81 },
                        { name: "Recurrent Neural Networks (RNNs) & Long Short-Term Memory (LSTM)", status: "Upcoming", date: "Scheduled", mastery: 0 }
                    ]
                },
                {
                    unitNumber: 4,
                    title: "Transformer Architectures & Generative AI Agents",
                    hours: "8 Hours",
                    topics: [
                        { name: "Scaled Dot-Product Attention & Multi-Head Self-Attention", status: "In-Progress", date: "Oct 31, 2026", mastery: 78 },
                        { name: "Large Language Models Pre-training & Instruction Fine-Tuning", status: "Upcoming", date: "Scheduled", mastery: 0 },
                        { name: "Autonomous Agent Tool Calling & Grounding with Gemini Models", status: "Upcoming", date: "Scheduled", mastery: 0 }
                    ]
                }
            ]
        }
    },
    assignments: [
        {
            id: "asgn-1793426960600",
            title: "Problem Set #06: Logic Gates & Boolean Algebra",
            subject: "Programming & Logic in C++",
            class: "CSE 1st Year",
            dueDate: "Nov 20, 2026",
            faculty: "Dr. Ananya Sharma",
            instructions: "Design simplified CMOS logic circuits and truth tables for given Boolean expressions.",
            maxPoints: 100,
            fileName: "Logic_Gates_Boolean_Algebra_Sheet.pdf",
            fileSize: "1.2 MB",
            downloadUrl: "/api/teacher/download-assignment/Logic_Gates_Boolean_Algebra_Sheet.pdf",
            status: "Active",
            grade: "Pending Review"
        },
        {
            id: "asgn-4",
            title: "Problem Set #04: Pointers & Dynamic Memory in C++",
            subject: "Programming & Logic in C++",
            class: "CSE 1st Year",
            dueDate: "Nov 10, 2026",
            faculty: "Prof. Vikram Malhotra",
            instructions: "Address sanitization and memory leak debugging with Valgrind. Implement custom smart pointer wrappers.",
            maxPoints: 100,
            fileName: "Pointers_Dynamic_Memory_Sheet.pdf",
            fileSize: "1.0 MB",
            downloadUrl: "/api/teacher/download-assignment/Pointers_Dynamic_Memory_Sheet.pdf",
            status: "Graded",
            grade: "98 / 100",
            feedback: "Outstanding smart pointer design. Zero memory leaks detected under Valgrind."
        }
    ],
    quizzes: [
        {
            id: "qz-1",
            title: "AVL Trees & BST Balance Factor Rapid Check",
            category: "Data Structures & Algorithms",
            questionsCount: 5,
            duration: "10s Per Question",
            scheduleDate: "Nov 02, 2026 • 10:00 AM",
            status: "Upcoming",
            badge: "Scheduled"
        },
        {
            id: "qz-2",
            title: "Operating Systems Concurrency & Locks",
            category: "Operating Systems & Architecture",
            questionsCount: 5,
            duration: "10s Per Question",
            scheduleDate: "Nov 05, 2026 • 11:30 AM",
            status: "Upcoming",
            badge: "Scheduled"
        }
    ],
    subjects: [
        { name: "Data Structures & Algorithms", code: "CS-201", mastery: 88, topics: 14, hours: "14.2 hrs" },
        { name: "Operating Systems & Architecture", code: "CS-202", mastery: 82, topics: 11, hours: "10.8 hrs" },
        { name: "Database Management Systems", code: "CS-203", mastery: 86, topics: 10, hours: "8.5 hrs" },
        { name: "Natural Sciences & Computational AI", code: "CS-204", mastery: 92, topics: 7, hours: "4.9 hrs" }
    ],
    results: [
        {
            quizName: "Mid-Term AI Diagnostic Quiz",
            category: "Natural Sciences & AI",
            date: "Oct 28, 2026",
            score: "5 / 5 (100%)",
            accuracy: "100%",
            timerAdherence: "7.2s Avg",
            status: "Verified Exemplary"
        },
        {
            quizName: "Stacks & Monotonic Queues Check",
            category: "Data Structures",
            date: "Oct 20, 2026",
            score: "4 / 5 (80%)",
            accuracy: "80%",
            timerAdherence: "8.6s Avg",
            status: "Mastered"
        },
        {
            quizName: "Linear Complexity & Master Theorem",
            category: "Algorithms",
            date: "Oct 10, 2026",
            score: "5 / 5 (100%)",
            accuracy: "100%",
            timerAdherence: "6.8s Avg",
            status: "Verified Exemplary"
        },
        {
            quizName: "Dynamic Memory Allocation in C++",
            category: "Programming Logic",
            date: "Sep 28, 2026",
            score: "4 / 5 (80%)",
            accuracy: "80%",
            timerAdherence: "9.1s Avg",
            status: "Mastered"
        }
    ]
};


async function syncStudentAssignmentsFromBackend() {
    try {
        const studentClass = (studentClassroomData && studentClassroomData.student && studentClassroomData.student.class) || "CSE 1st Year";
        const studentEmail = (studentClassroomData && studentClassroomData.student && studentClassroomData.student.email) || "singh.pranjalabc2020@gmail.com";
        
        // 1. Fetch floated assignments
        const [asgnRes, subRes] = await Promise.all([
            fetch(`/api/student/assignments?class=${encodeURIComponent(studentClass)}`),
            fetch(`/api/student/submissions?student_email=${encodeURIComponent(studentEmail)}`)
        ]);

        let backendAssignments = [];
        let backendSubmissions = [];

        if (asgnRes.ok) {
            const data = await asgnRes.json();
            if (data && data.success && Array.isArray(data.assignments)) {
                backendAssignments = data.assignments;
            }
        }

        if (subRes.ok) {
            const sData = await subRes.json();
            if (sData && sData.success && Array.isArray(sData.submissions)) {
                backendSubmissions = sData.submissions;
            }
        }

        // Check local floating queue if teacher created assignment in same browser
        try {
            const savedQueue = localStorage.getItem('prashiksha_floating_queue');
            if (savedQueue) {
                const parsed = JSON.parse(savedQueue);
                if (Array.isArray(parsed)) {
                    parsed.forEach(item => {
                        const itemCls = (item.class || "").toLowerCase();
                        if (itemCls.includes("1") || itemCls.includes("all") || itemCls.includes("cse")) {
                            if (!backendAssignments.some(b => b.id === item.id || b.title === item.title)) {
                                backendAssignments.unshift(item);
                            }
                        }
                    });
                }
            }
        } catch (e) {}

        if (backendAssignments.length > 0) {
            let localSubs = {};
            try {
                const prev = localStorage.getItem('prashiksha_student_submissions');
                if (prev) localSubs = JSON.parse(prev);
            } catch (e) {}

            // Direct mapping: Replace list so ONLY 1st year assignments are displayed for Pranjal Singh
            studentClassroomData.assignments = backendAssignments.map(bAsgn => {
                const bSub = backendSubmissions.find(s => 
                    String(s.assignmentId) === String(bAsgn.id) || 
                    String(s.assignmentTitle).toLowerCase().trim() === String(bAsgn.title).toLowerCase().trim()
                );
                const lSub = localSubs[bAsgn.id];

                let status = bAsgn.status || "Active";
                let grade = bAsgn.grade || "Pending Review";
                let feedback = bAsgn.feedback || "";
                let submittedFile = bAsgn.submittedFile || null;
                let submittedDate = bAsgn.submittedDate || null;

                if (bSub) {
                    status = bSub.status || "Submitted";
                    grade = bSub.marks || "Pending Review";
                    feedback = bSub.feedback || "";
                    submittedFile = bSub.fileName;
                    submittedDate = bSub.submittedAt;
                } else if (lSub) {
                    status = lSub.status || "Submitted";
                    grade = lSub.grade || "Pending Review";
                    submittedFile = lSub.fileName;
                    submittedDate = lSub.submittedAt;
                }

                return {
                    id: bAsgn.id,
                    title: bAsgn.title,
                    subject: bAsgn.subject,
                    class: bAsgn.class || bAsgn.target_class || studentClass,
                    dueDate: bAsgn.dueDate || "Nov 05, 2026",
                    faculty: bAsgn.faculty || "Dr. Ananya Sharma",
                    instructions: bAsgn.instructions || "",
                    maxPoints: bAsgn.maxPoints || 100,
                    fileName: bAsgn.fileName,
                    fileSize: bAsgn.fileSize || "1.2 MB",
                    downloadUrl: bAsgn.downloadUrl || `/api/teacher/download-assignment/${encodeURIComponent(bAsgn.fileName)}`,
                    status: status,
                    grade: grade,
                    feedback: feedback,
                    submittedFile: submittedFile,
                    submittedDate: submittedDate
                };
            });

            renderStudentAssignments();
        }
    } catch (err) {
        console.warn("Could not sync student assignments from backend:", err);
    }
}

async function openClassroomDashboard() {
    const modal = document.getElementById("classroomFullscreenDashboard");
    if (!modal) return;

    // Load from localStorage if teacher floated new assignments
    try {
        const savedQueue = localStorage.getItem('prashiksha_floating_queue');
        if (savedQueue) {
            const parsed = JSON.parse(savedQueue);
            if (Array.isArray(parsed) && parsed.length > 0) {
                parsed.forEach(item => {
                    if (!studentClassroomData.assignments.some(a => a.id === item.id)) {
                        studentClassroomData.assignments.unshift({
                            id: item.id,
                            title: item.title,
                            subject: item.subject,
                            dueDate: item.dueDate,
                            fileName: item.fileName,
                            fileSize: item.fileSize,
                            status: "Active",
                            grade: "Pending Review",
                            downloadUrl: item.downloadUrl || `/api/teacher/download-assignment/${encodeURIComponent(item.fileName)}`
                        });
                    }
                });
            }
        }

        // Load submitted assignments from localStorage
        const savedSubmissions = localStorage.getItem('prashiksha_student_submissions');
        if (savedSubmissions) {
            const subs = JSON.parse(savedSubmissions);
            if (subs && typeof subs === 'object') {
                studentClassroomData.assignments.forEach(asgn => {
                    if (subs[asgn.id]) {
                        asgn.status = "Submitted";
                        asgn.submittedFile = subs[asgn.id].fileName;
                        asgn.submittedDate = subs[asgn.id].submittedAt;
                        if (!asgn.grade || asgn.grade === "Pending Review") {
                            asgn.grade = subs[asgn.id].grade || "Pending Review";
                        }
                    }
                });
            }
        }
    } catch (e) {
        console.warn("Could not load floated assignments", e);
    }

    renderStudentSyllabus();
    renderStudentAssignments();
    await syncStudentAssignmentsFromBackend();
    renderStudentQuizzes();
    renderStudentProgress();
    renderStudentResults();

    switchClassroomTab("hub");

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
}

function closeClassroomDashboard() {
    const modal = document.getElementById("classroomFullscreenDashboard");
    if (!modal) return;
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
}

function switchClassroomTab(tabName) {
    const tabBtns = document.querySelectorAll(".classroom-tab-btn");
    tabBtns.forEach(btn => {
        if (btn.getAttribute("data-class-tab") === tabName) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    const views = document.querySelectorAll(".classroom-tab-view");
    views.forEach(view => {
        if (view.id === `classTab-${tabName}`) {
            view.classList.remove("hidden");
            view.classList.add("active");
        } else {
            view.classList.add("hidden");
            view.classList.remove("active");
        }
    });

    if (tabName === "assignments") {
        syncStudentAssignmentsFromBackend();
    }

    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
}

let currentSyllabusSubjectCode = "CS-201";

function selectSyllabusSubject(code) {
    currentSyllabusSubjectCode = code;
    renderStudentSyllabus();
}

function renderStudentSyllabus() {
    const tabsContainer = document.getElementById("syllabusSubjectTabsGrid");
    const panelContainer = document.getElementById("studentSyllabusPanel");
    if (!panelContainer) return;

    const subjectsList = [
        { code: "CS-201", name: "Data Structures & Algorithms", faculty: "Dr. Ananya Sharma", covered: 72, credits: "4.0 Credits" },
        { code: "CS-202", name: "Operating Systems & Architecture", faculty: "Prof. Vikram Malhotra", covered: 65, credits: "4.0 Credits" },
        { code: "CS-203", name: "Database Management Systems", faculty: "Prof. Rajesh Verma", covered: 80, credits: "4.0 Credits" },
        { code: "CS-204", name: "Natural Sciences & Computational AI", faculty: "Dr. Sneha Rao", covered: 85, credits: "3.0 Credits" }
    ];

    // Render Subject Selector Tabs
    if (tabsContainer) {
        tabsContainer.innerHTML = subjectsList.map(subj => {
            const isActive = subj.code === currentSyllabusSubjectCode;
            return `
                <div class="subject-tab-pill ${isActive ? 'active' : ''}" onclick="selectSyllabusSubject('${subj.code}')">
                    <div class="subj-tab-top-row">
                        <span class="subj-tab-code">${subj.code}</span>
                        <span class="subj-tab-cov">${subj.covered}% Covered</span>
                    </div>
                    <div class="subj-tab-name">${subj.name}</div>
                    <div class="subj-tab-meta">Faculty: ${subj.faculty}</div>
                    <div class="subj-tab-progress-bar">
                        <div class="subj-tab-progress-fill" style="width: ${subj.covered}%;"></div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Retrieve active syllabus
    const curSyllabus = (studentClassroomData.syllabi && studentClassroomData.syllabi[currentSyllabusSubjectCode]) 
        ? studentClassroomData.syllabi[currentSyllabusSubjectCode] 
        : (studentClassroomData.syllabi ? studentClassroomData.syllabi["CS-201"] : null);

    if (!curSyllabus) return;

    // Render active subject syllabus
    panelContainer.innerHTML = `
        <div class="classroom-panel-header">
            <div>
                <div class="flex-row-gap">
                    <h3 class="panel-heading">Accredited Course Syllabus: ${curSyllabus.course}</h3>
                    <span class="code-pill">Course Code: ${curSyllabus.code}</span>
                    <span class="credits-pill">${curSyllabus.credits} &bull; Semester III</span>
                </div>
                <p class="panel-subtext">Curriculum authorized by Dept of CSE. Topics updated in real-time by ${curSyllabus.faculty}.</p>
            </div>
            <div class="syllabus-progress-stat">
                <span class="stat-number">${curSyllabus.coveredPercent}%</span>
                <span class="stat-label">Syllabus Covered</span>
            </div>
        </div>

        <div class="syllabus-units-grid">
            ${curSyllabus.units.map(unit => `
                <div class="syllabus-unit-box">
                    <div class="syllabus-unit-title-bar">
                        <div class="flex-row-gap">
                            <span class="unit-badge">Unit ${unit.unitNumber}</span>
                            <span class="unit-title-text">${unit.title}</span>
                        </div>
                        <span class="credits-pill">${unit.hours}</span>
                    </div>
                    <div class="unit-topics-list">
                        ${unit.topics.map(topic => {
                            let pillClass = "topic-status-pill upcoming";
                            if (topic.status === "Covered") pillClass = "topic-status-pill covered";
                            else if (topic.status === "In-Progress") pillClass = "topic-status-pill in-progress";
                            return `
                                <div class="student-topic-row">
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <i data-lucide="${topic.status === 'Covered' ? 'check-circle-2' : (topic.status === 'In-Progress' ? 'clock' : 'circle')}" style="width: 16px; height: 16px; color: ${topic.status === 'Covered' ? '#059669' : (topic.status === 'In-Progress' ? '#d97706' : '#94a3b8')};"></i>
                                        <div>
                                            <div style="font-size: 13px; font-weight: 700; color: #0f172a;">${topic.name}</div>
                                            <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Schedule: ${topic.date} • Mastery Target: ${topic.mastery}%</div>
                                        </div>
                                    </div>
                                    <span class="${pillClass}">${topic.status}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
}



// ====================================================================
// STUDENT ASSIGNMENT SUBMISSION & UPLOAD CONTROLLER
// ====================================================================
let activeUploadAssignmentId = null;
let selectedSubmissionFile = null;

function renderStudentAssignments() {
    const container = document.getElementById("studentAssignmentsList");
    if (!container) return;

    const totalCount = studentClassroomData.assignments.length;
    const submittedCount = studentClassroomData.assignments.filter(a => a.status === "Submitted").length;
    const pendingCount = totalCount - submittedCount;

    const totalEl = document.getElementById("asgnTotalCount");
    const subEl = document.getElementById("asgnSubmittedCount");
    const pendEl = document.getElementById("asgnPendingCount");
    if (totalEl) totalEl.textContent = totalCount;
    if (subEl) subEl.textContent = submittedCount;
    if (pendEl) pendEl.textContent = pendingCount;

    container.innerHTML = studentClassroomData.assignments.map(asgn => {
        const isSubmitted = asgn.status === "Submitted" || asgn.status === "Graded";
        const isGraded = asgn.status === "Graded" && asgn.grade && asgn.grade !== "Pending Review";
        return `
            <div class="student-asgn-card">
                <div style="flex: 1; min-width: 260px;">
                    <div class="flex-row-gap" style="margin-bottom: 6px; align-items: center; justify-content: space-between;">
                        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                            <span class="code-pill">${asgn.subject}</span>
                            <span class="credits-pill">${asgn.class || 'CSE 2nd Year'}</span>
                        </div>
                        ${isGraded
                            ? `<span class="asgn-status-badge submitted" style="background: #dcfce7; color: #15803d; border-color: #86efac;"><i data-lucide="award" style="width: 12px; height: 12px;"></i> Graded: ${asgn.grade}</span>`
                            : (isSubmitted
                                ? `<span class="asgn-status-badge pending" style="background: #eff6ff; color: #1d4ed8; border-color: #bfdbfe;"><i data-lucide="clock" style="width: 12px; height: 12px;"></i> Submitted &bull; Pending Review</span>`
                                : `<span class="asgn-status-badge pending"><i data-lucide="clock" style="width: 12px; height: 12px;"></i> Pending Submission</span>`
                              )
                        }
                    </div>
                    <h4 style="font-size: 15px; font-weight: 800; color: #0f172a; margin: 4px 0 6px;">${asgn.title}</h4>
                    <div style="font-size: 12px; color: #64748b; display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                        <span>Due Date: <strong>${asgn.dueDate}</strong></span>
                        <span>Faculty: <strong>${asgn.faculty || 'Dr. Ananya Sharma'}</strong></span>
                        <span>Max Points: <strong>${asgn.maxPoints || 100} pts</strong></span>
                        <span>Problem Sheet: <strong>${asgn.fileName}</strong> (${asgn.fileSize || '1.4 MB'})</span>
                    </div>

                    ${asgn.instructions ? `
                        <div style="font-size: 12px; color: #334155; margin-top: 8px; background: #f8fafc; padding: 7px 12px; border-radius: 8px; border-left: 3px solid #3b82f6; line-height: 1.45;">
                            <strong style="color: #1e40af;"><i data-lucide="info" style="width: 12px; height: 12px; vertical-align: middle;"></i> Teacher Instructions:</strong> ${asgn.instructions}
                        </div>
                    ` : ''}

                    ${isSubmitted || isGraded ? `
                        <div class="submission-meta-row" style="${isGraded ? 'background: #f0fdf4; border-color: #86efac;' : ''}">
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <i data-lucide="file-check" style="width: 14px; height: 14px; color: #059669;"></i>
                                <span>Uploaded Solution: <strong>${asgn.submittedFile || 'Solution_' + asgn.id + '.pdf'}</strong></span>
                            </div>
                            <span style="font-size: 12px; font-weight: 800; color: ${isGraded ? '#15803d' : '#059669'};">
                                ${isGraded ? 'Teacher Marks: ' + asgn.grade : 'Status: ' + (asgn.grade || 'Pending Evaluation')}
                            </span>
                        </div>

                        ${isGraded && asgn.feedback ? `
                            <div style="font-size: 12px; color: #064e3b; margin-top: 6px; background: #ecfdf5; padding: 7px 12px; border-radius: 8px; border-left: 3px solid #10b981; line-height: 1.45;">
                                <strong style="color: #047857;"><i data-lucide="award" style="width: 13px; height: 13px; vertical-align: middle;"></i> Dr. Ananya Sharma's Feedback:</strong> "${asgn.feedback}"
                            </div>
                        ` : ''}
                    ` : ''}
                </div>

                <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                    <a href="${asgn.downloadUrl || ('/api/teacher/download-assignment/' + encodeURIComponent(asgn.fileName))}" download="${asgn.fileName}" class="asgn-dl-btn" title="Download problem sheet from raw data/assignment/">
                        <i data-lucide="download" style="width: 14px; height: 14px;"></i>
                        <span>Download Sheet</span>
                    </a>
                    ${isSubmitted ? `
                        <button type="button" class="asgn-reupload-btn" onclick="openAssignmentUploadModal('${asgn.id}')" title="Re-upload or update your submitted solution">
                            <i data-lucide="refresh-cw" style="width: 13px; height: 13px;"></i>
                            <span>Re-upload Solution</span>
                        </button>
                    ` : `
                        <button type="button" class="asgn-upload-btn" onclick="openAssignmentUploadModal('${asgn.id}')" title="Upload your solved assignment file">
                            <i data-lucide="upload-cloud" style="width: 14px; height: 14px;"></i>
                            <span>Upload File</span>
                        </button>
                    `}
                </div>
            </div>
        `;
    }).join('');

    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
}

function openAssignmentUploadModal(asgnId) {
    const modal = document.getElementById("studentAssignmentUploadModal");
    if (!modal) return;

    activeUploadAssignmentId = asgnId;
    selectedSubmissionFile = null;

    const asgn = studentClassroomData.assignments.find(a => a.id === asgnId) || {
        title: "Assignment Submission",
        subject: "Computer Science"
    };

    const titleEl = document.getElementById("uploadModalAsgnTitle");
    const subjEl = document.getElementById("uploadModalSubject");
    const previewCard = document.getElementById("uploadFilePreviewCard");
    const dropzone = document.getElementById("studentAssignmentDropzone");
    const statusBanner = document.getElementById("studentUploadStatusBanner");
    const commentsEl = document.getElementById("studentSubmissionComments");
    const fileInput = document.getElementById("studentAssignmentFileInput");

    if (titleEl) titleEl.textContent = asgn.title;
    if (subjEl) subjEl.textContent = asgn.subject;
    if (previewCard) previewCard.classList.add("hidden");
    if (dropzone) dropzone.classList.remove("hidden");
    if (statusBanner) {
        statusBanner.className = "hidden upload-status-strip";
        statusBanner.textContent = "";
    }
    if (commentsEl) commentsEl.value = "";
    if (fileInput) fileInput.value = "";

    // Setup drag and drop events
    if (dropzone && !dropzone.dataset.dndInit) {
        dropzone.dataset.dndInit = "true";
        ["dragenter", "dragover"].forEach(evtName => {
            dropzone.addEventListener(evtName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropzone.classList.add("dragover");
            });
        });
        ["dragleave", "drop"].forEach(evtName => {
            dropzone.addEventListener(evtName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropzone.classList.remove("dragover");
            });
        });
        dropzone.addEventListener("drop", (e) => {
            const files = e.dataTransfer.files;
            if (files && files.length > 0) {
                setSubmissionSelectedFile(files[0]);
            }
        });
    }

    modal.style.display = "flex";
    modal.classList.remove("hidden");
    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
}

function closeAssignmentUploadModal() {
    const modal = document.getElementById("studentAssignmentUploadModal");
    if (modal) {
        modal.style.display = "none";
        modal.classList.add("hidden");
    }
    selectedSubmissionFile = null;
    activeUploadAssignmentId = null;
}

function handleAssignmentFileSelect(e) {
    if (e.target.files && e.target.files.length > 0) {
        setSubmissionSelectedFile(e.target.files[0]);
    }
}

function setSubmissionSelectedFile(file) {
    selectedSubmissionFile = file;
    const previewCard = document.getElementById("uploadFilePreviewCard");
    const dropzone = document.getElementById("studentAssignmentDropzone");
    const nameEl = document.getElementById("previewFileName");
    const sizeEl = document.getElementById("previewFileSize");

    if (nameEl) nameEl.textContent = file.name;
    if (sizeEl) {
        const sizeKb = file.size / 1024;
        sizeEl.textContent = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(sizeKb))} KB`;
    }

    if (dropzone) dropzone.classList.add("hidden");
    if (previewCard) previewCard.classList.remove("hidden");

    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
}

function clearSelectedAssignmentFile(e) {
    if (e) e.stopPropagation();
    selectedSubmissionFile = null;
    const fileInput = document.getElementById("studentAssignmentFileInput");
    if (fileInput) fileInput.value = "";

    const previewCard = document.getElementById("uploadFilePreviewCard");
    const dropzone = document.getElementById("studentAssignmentDropzone");
    if (previewCard) previewCard.classList.add("hidden");
    if (dropzone) dropzone.classList.remove("hidden");
}

async function submitStudentAssignment() {
    if (!selectedSubmissionFile) {
        alert("Please select or drop an assignment file to submit.");
        return;
    }

    const submitBtn = document.getElementById("btnSubmitStudentAssignment");
    const statusBanner = document.getElementById("studentUploadStatusBanner");
    const commentsEl = document.getElementById("studentSubmissionComments");

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i data-lucide="loader" style="width: 14px; height: 14px;" class="animate-spin"></i> <span>Uploading solution...</span>`;
    }
    if (window.lucide) window.lucide.createIcons();

    const formData = new FormData();
    formData.append("file", selectedSubmissionFile);
    formData.append("assignment_id", activeUploadAssignmentId || "");
    formData.append("student_name", "Pranjal Singh");
    formData.append("roll_number", "CSE-2026-084");
    formData.append("student_email", "singh.pranjalabc2020@gmail.com");
    formData.append("class", (studentClassroomData && studentClassroomData.student && studentClassroomData.student.class) || "CSE 1st Year");
    if (commentsEl) formData.append("comments", commentsEl.value.trim());

    try {
        const response = await fetch("/api/student/upload-assignment", {
            method: "POST",
            body: formData
        });

        const resData = await response.json();
        if (response.ok && resData.success) {
            // Update local memory
            const asgn = studentClassroomData.assignments.find(a => a.id === activeUploadAssignmentId);
            if (asgn) {
                asgn.status = "Submitted";
                asgn.submittedFile = resData.fileName || selectedSubmissionFile.name;
                asgn.submittedDate = resData.submittedAt;
                asgn.grade = "Pending Review";
            }

            // Persist to localStorage
            try {
                let subs = {};
                const prev = localStorage.getItem("prashiksha_student_submissions");
                if (prev) subs = JSON.parse(prev);
                subs[activeUploadAssignmentId] = {
                    fileName: resData.fileName || selectedSubmissionFile.name,
                    submittedAt: resData.submittedAt,
                    fileSize: resData.fileSize,
                    grade: "Pending Review"
                };
                localStorage.setItem("prashiksha_student_submissions", JSON.stringify(subs));
            } catch (err) {
                console.warn("Could not save to localStorage", err);
            }

            // Show success message
            if (statusBanner) {
                statusBanner.className = "upload-status-strip success";
                statusBanner.innerHTML = `<i data-lucide="check-circle" style="width: 14px; height: 14px; vertical-align: middle;"></i> Solution "${resData.fileName || selectedSubmissionFile.name}" submitted successfully! Dr. Ananya Sharma has been notified.`;
                statusBanner.classList.remove("hidden");
                if (window.lucide) window.lucide.createIcons();
            }

            renderStudentAssignments();

            setTimeout(() => {
                closeAssignmentUploadModal();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `<i data-lucide="send"></i> <span>Submit Assignment</span>`;
                }
            }, 1200);

        } else {
            throw new Error(resData.error || "Submission failed");
        }
    } catch (err) {
        console.error("Upload error:", err);
        if (statusBanner) {
            statusBanner.className = "upload-status-strip error";
            statusBanner.textContent = `Upload failed: ${err.message || 'Server error. Please try again.'}`;
            statusBanner.classList.remove("hidden");
        }
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<i data-lucide="send"></i> <span>Submit Assignment</span>`;
        }
    }
}


function renderStudentQuizzes() {
    const container = document.getElementById("studentQuizzesList");
    if (!container) return;

    container.innerHTML = studentClassroomData.quizzes.map(quiz => `
        <div class="student-asgn-card">
            <div>
                <span class="code-pill">${quiz.category}</span>
                <h4 style="font-size: 15px; font-weight: 800; color: #0f172a; margin: 6px 0 2px;">${quiz.title}</h4>
                <div style="font-size: 12px; color: #64748b;">Schedule: <strong>${quiz.scheduleDate}</strong> • ${quiz.duration}</div>
            </div>
            <span class="score-badge" style="background: #eef2ff; color: #4338ca; border-color: #c7d2fe;">${quiz.badge}</span>
        </div>
    `).join('');
}

function renderStudentProgress() {
    const container = document.getElementById("studentSubjectProgressGrid");
    if (!container) return;

    container.innerHTML = studentClassroomData.subjects.map(subj => `
        <div class="subject-item-card">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 11px; font-weight: 800; color: #2563eb; font-family: monospace;">${subj.code}</span>
                <span style="font-size: 15px; font-weight: 900; color: #059669;">${subj.mastery}%</span>
            </div>
            <h4 style="font-size: 14px; font-weight: 800; color: #0f172a; margin: 8px 0 2px;">${subj.name}</h4>
            <div class="subj-track">
                <div class="subj-fill" style="width: ${subj.mastery}%;"></div>
            </div>
            <div style="font-size: 11px; color: #64748b; display: flex; justify-content: space-between;">
                <span>${subj.topics} Topics Covered</span>
                <span>${subj.hours} Logged</span>
            </div>
        </div>
    `).join('');
}

function renderStudentResults() {
    const tbody = document.getElementById("studentQuizResultsTable");
    if (!tbody) return;

    tbody.innerHTML = studentClassroomData.results.map(res => `
        <tr>
            <td>
                <div style="font-weight: 700; color: #0f172a;">${res.quizName}</div>
                <small style="color: #64748b;">${res.category}</small>
            </td>
            <td>${res.date}</td>
            <td><strong style="color: #059669;">${res.score}</strong></td>
            <td>${res.accuracy}</td>
            <td><span style="font-size: 11.5px; font-weight: 700; color: #4338ca; background: #e0e7ff; padding: 2px 8px; border-radius: 9999px;">${res.timerAdherence}</span></td>
            <td><span class="score-badge">${res.status}</span></td>
        </tr>
    `).join('');
}
