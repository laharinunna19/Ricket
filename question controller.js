const {
    getQuestion
} = require("../services/questionService");


function getRandomQuestion(req, res) {

    try {

        const {
            language,
            difficulty
        } = req.query;

        if (!language || !difficulty) {

            return res.status(400).json({
                error:
                    "Language and difficulty are required."
            });

        }

        const question =
            getQuestion(language, difficulty);

        if (!question) {

            return res.status(404).json({
                error:
                    "No questions available."
            });

        }

        res.json({
            question
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Could not load question."
        });

    }

}


module.exports = {
    getRandomQuestion
};
