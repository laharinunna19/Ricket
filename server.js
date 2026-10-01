const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const questionRoutes =
    require("./routes/questionRoutes");

const submissionRoutes =
    require("./routes/submissionRoutes");

const gameRoutes =
    require("./routes/gameRoutes");


const app = express();

app.use(cors());

app.use(express.json({
    limit: "100kb"
}));


app.get("/", (req, res) => {

    res.json({
        name: "Ricket Backend",
        status: "running"
    });

});


app.use(
    "/api/questions",
    questionRoutes
);

app.use(
    "/api/submissions",
    submissionRoutes
);

app.use(
    "/api/game",
    gameRoutes
);


const PORT =
    process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log(
        `🏏 Ricket backend running on port ${PORT}`
    );

});
