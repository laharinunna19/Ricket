const express = require("express");

const {
    startGame
} = require("../controllers/gameController");

const router = express.Router();


router.post(
    "/start",
    startGame
);


module.exports = router;
