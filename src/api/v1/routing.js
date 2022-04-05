const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const bootcamp = require("./bootcamp");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use("/bootcamp", bootcamp);

module.exports = router;
