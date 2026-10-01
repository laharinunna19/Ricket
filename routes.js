const express = require("express");

const {
    getRandomQuestion
} = require("../controllers/questionController");

const router = express.Router();


router.get(
    "/random",
    getRandomQuestion
);


module.exports = router;
