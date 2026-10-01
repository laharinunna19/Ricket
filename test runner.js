const {
    compareOutput
} = require("./outputComparator");


async function runTests(
    executor,
    code,
    testCases
) {

    const results = [];


    for (const testCase of testCases) {

        try {

            const execution =
                await executor(
                    code,
                    testCase.input
                );


            if (execution.timedOut) {

                results.push({
                    passed: false,
                    timedOut: true,
                    input: testCase.input
                });

                break;
            }


            const passed =
                compareOutput(
                    execution.output,
                    testCase.output
                );


            results.push({
                passed,
                input: testCase.input
            });


        } catch (error) {

            results.push({
                passed: false,
                error: error.message
            });

        }

    }


    return results;
}


module.exports = {
    runTests
};
