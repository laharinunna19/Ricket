const express = require("express");

const {
    submitCode
} = require("../controllers/submissionController");

const router = express.Router();


router.post(
    "/",
    submitCode
);


module.exports = router;
