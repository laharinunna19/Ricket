const API_URL = "http://localhost:5000/api";

const state = {
    playerName: "",
    language: "",
    team: "",
    difficulty: "",

    score: 0,
    wickets: 0,

    over: 1,
    ball: 1,

    questionsPlayed: 0,

    currentQuestion: null,
    timer: null,
    timeLeft: 60
};


const screens = {
    home: document.getElementById("homeScreen"),
    setup: document.getElementById("setupScreen"),
    match: document.getElementById("matchScreen"),
    result: document.getElementById("resultScreen")
};


function showScreen(screen) {

    Object.values(screens).forEach(item => {
        item.classList.remove("active");
    });

    screen.classList.add("active");
}


/* START */

document.getElementById("startBtn").addEventListener("click", () => {
    showScreen(screens.setup);
});


/* LANGUAGE */

document
    .querySelectorAll("#languageSelection button")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll("#languageSelection button")
                .forEach(btn => btn.classList.remove("selected"));

            button.classList.add("selected");

            state.language = button.dataset.language;
        });

    });


/* TEAM */

document
    .querySelectorAll("#teamSelection button")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll("#teamSelection button")
                .forEach(btn => btn.classList.remove("selected"));

            button.classList.add("selected");

            state.team = button.dataset.team;
        });

    });


/* DIFFICULTY */

document
    .querySelectorAll("#difficultySelection button")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll("#difficultySelection button")
                .forEach(btn => btn.classList.remove("selected"));

            button.classList.add("selected");

            state.difficulty = button.dataset.difficulty;
        });

    });


/* BEGIN MATCH */

document
    .getElementById("beginMatchBtn")
    .addEventListener("click", startMatch);


async function startMatch() {

    state.playerName =
        document.getElementById("playerName").value.trim();

    if (!state.playerName) {
        alert("Please enter your name.");
        return;
    }

    if (!state.language) {
        alert("Please select a programming language.");
        return;
    }

    if (!state.team) {
        alert("Please select a team.");
        return;
    }

    if (!state.difficulty) {
        alert("Please select difficulty.");
        return;
    }

    state.score = 0;
    state.wickets = 0;
    state.over = 1;
    state.ball = 1;
    state.questionsPlayed = 0;

    document.getElementById("teamName").textContent =
        state.team;

    showScreen(screens.match);

    await loadQuestion();
}


/* LOAD QUESTION */

async function loadQuestion() {

    clearInterval(state.timer);

    state.timeLeft = 60;

    updateTimer();

    hideResult();

    document.getElementById("codeEditor").value = "";

    try {

        const response = await fetch(
            `${API_URL}/questions/random?language=${state.language}&difficulty=${state.difficulty}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Question loading failed");
        }

        state.currentQuestion = data.question;

        displayQuestion(data.question);

        startTimer();

    } catch (error) {

        console.error(error);

        alert(
            "Backend is not running or question could not be loaded."
        );
    }
}


/* DISPLAY QUESTION */

function displayQuestion(question) {

    document.getElementById("questionId").textContent =
        question.id;

    document.getElementById("questionTitle").textContent =
        question.title;

    document.getElementById("questionDescription").textContent =
        question.description;

    document.getElementById("inputFormat").textContent =
        question.inputFormat;

    document.getElementById("outputFormat").textContent =
        question.outputFormat;

    document.getElementById("sampleInput").textContent =
        question.sampleInput;

    document.getElementById("sampleOutput").textContent =
        question.sampleOutput;

    document.getElementById("difficultyBadge").textContent =
        state.difficulty.toUpperCase();

    document.getElementById("editorLanguage").textContent =
        state.language.toUpperCase();
}


/* TIMER */

function startTimer() {

    state.timer = setInterval(() => {

        state.timeLeft--;

        updateTimer();

        if (state.timeLeft <= 0) {

            clearInterval(state.timer);

            handleTimeout();
        }

    }, 1000);
}


function updateTimer() {

    document.getElementById("timer").textContent =
        state.timeLeft;
}


/* TIMEOUT */

function handleTimeout() {

    state.wickets++;

    state.questionsPlayed++;

    showResult({
        passed: 0,
        total: 1,
        percentage: 0,
        runs: 0,
        timeout: true
    });
}


/* SUBMIT */

document
    .getElementById("submitCodeBtn")
    .addEventListener("click", submitCode);


async function submitCode() {

    const code =
        document.getElementById("codeEditor").value.trim();

    if (!code) {
        alert("Write your code first.");
        return;
    }

    clearInterval(state.timer);

    const button =
        document.getElementById("submitCodeBtn");

    button.disabled = true;
    button.textContent = "⏳ RUNNING...";

    try {

        const response = await fetch(
            `${API_URL}/submissions`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    questionId: state.currentQuestion.id,
                    language: state.language,
                    difficulty: state.difficulty,
                    code
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Submission failed"
            );
        }

        state.questionsPlayed++;

        if (data.result.timeout) {

            state.wickets++;

        } else {

            state.score += data.result.runs;

        }

        showResult(data.result);

    } catch (error) {

        console.error(error);

        alert(error.message);

        startTimer();

    } finally {

        button.disabled = false;
        button.textContent = "▶ RUN CODE";
    }
}


/* SHOW RESULT */

function showResult(result) {

    const panel =
        document.getElementById("resultPanel");

    panel.classList.remove("hidden");

    const title =
        document.getElementById("resultTitle");

    const resultBox =
        document.getElementById("testResult");

    const runs =
        document.getElementById("ballRuns");

    runs.textContent =
        result.runs || 0;

    if (result.timeout) {

        title.textContent = "⏰ TIME OUT — WICKET!";

        resultBox.innerHTML =
            `<p class="test-fail">
                Time expired.
            </p>`;

    } else {

        title.textContent =
            result.runs === 6
                ? "🏏 SIX!"
                : result.runs === 4
                    ? "🔥 FOUR!"
                    : result.runs === 2
                        ? "🏏 2 RUNS"
                        : "❌ 0 RUNS";

        resultBox.innerHTML = `
            <p>
                <strong>
                    ${result.passed}/${result.total}
                </strong>
                test cases passed
            </p>

            <p>
                Accuracy:
                <strong>
                    ${result.percentage}%
                </strong>
            </p>
        `;
    }

    updateScoreboard();
}


function hideResult() {

    document
        .getElementById("resultPanel")
        .classList.add("hidden");
}


/* NEXT BALL */

document
    .getElementById("nextBallBtn")
    .addEventListener("click", nextBall);


function nextBall() {

    if (state.ball === 6) {

        if (state.over === 3) {

            finishMatch();
            return;
        }

        state.over++;
        state.ball = 1;

    } else {

        state.ball++;
    }

    updateScoreboard();

    loadQuestion();
}


/* SCOREBOARD */

function updateScoreboard() {

    document.getElementById("score").textContent =
        `${state.score}/${state.wickets}`;

    document.getElementById("overNumber").textContent =
        `${state.over}.${state.ball - 1}`;

    document.getElementById("ballNumber").textContent =
        state.ball;
}


/* MATCH END */

function finishMatch() {

    clearInterval(state.timer);

    document.getElementById("finalPlayerName").textContent =
        state.playerName;

    document.getElementById("finalScore").textContent =
        `${state.score}/${state.wickets}`;

    document.getElementById("finalRuns").textContent =
        state.score;

    document.getElementById("finalWickets").textContent =
        state.wickets;

    document.getElementById("finalQuestions").textContent =
        state.questionsPlayed;

    showScreen(screens.result);
}


/* PLAY AGAIN */

document
    .getElementById("playAgainBtn")
    .addEventListener("click", () => {

        state.score = 0;
        state.wickets = 0;
        state.over = 1;
        state.ball = 1;
        state.questionsPlayed = 0;

        showScreen(screens.setup);
    });
