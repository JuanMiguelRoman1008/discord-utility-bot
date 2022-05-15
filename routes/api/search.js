const express = require("express");
const router = express.Router();

// @route  POST api/search
// @desc   Add Looking For request
// @access Public

router.post("/", async (req, res) => {
    res.send("Add an LF request");
});

module.exports = router;
