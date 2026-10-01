const {
    judgeSubmission
} = require("../services/judgeService");


async function submitCode(req, res) {

    try {

        const {
            questionId,
            language,
            difficulty,
            code
        } = req.body;


        if (
            !questionId ||
            !language ||
            !difficulty ||
            !code
        ) {

            return res.status(400).json({
                error:
                    "questionId, language, difficulty and code are required."
            });

        }


        const result =
            await judgeSubmission({
                questionId,
                language,
                difficulty,
                code
            });


        res.json({
            result
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error:
                error.message ||
                "Code execution failed."
        });

    }

}


module.exports = {
    submitCode
};
