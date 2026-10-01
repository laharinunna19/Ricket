const {
    findQuestion
} = require("./questionService");

const {
    calculateRuns
} = require("./scoringService");

const {
    runTests
} = require("../utils/testRunner");

const {
    executeCode
} = require("../execution/dockerExecutor");


async function judgeSubmission({
    questionId,
    language,
    difficulty,
    code
}) {

    const question =
        findQuestion(
            language,
            difficulty,
            questionId
        );


    if (!question) {

        throw new Error(
            "Question not found."
        );

    }


    const testCases = [
        ...(question.visibleTestCases || []),
        ...(question.hiddenTestCases || [])
    ];


    const results =
        await runTests(
            (submittedCode, input) =>
                executeCode(
                    language,
                    submittedCode,
                    input
                ),
            code,
            testCases
        );


    const passed =
        results.filter(
            result => result.passed
        ).length;


    const total =
        testCases.length;


    const timedOut =
        results.some(
            result => result.timedOut
        );


    const percentage =
        total === 0
            ? 0
            : Math.round(
                (passed / total) * 100
            );


    const scoring =
        calculateRuns(
            passed,
            total,
            timedOut
        );


    return {

        passed,

        total,

        percentage,

        runs: scoring.runs,

        wicket: scoring.wicket,

        timeout: timedOut,

        tests: results

    };
}


module.exports = {
    judgeSubmission
};
