const express = require("express");
const router = express.Router();

// @route  POST api/search
// @desc   Add Looking For request
// @access Private

router.post("/", (req, res) => {
    res.send("Add an LF request");
});

// @route  DELETE api/search/join/:id
// @desc   Delete your LF Request
// @access Private

router.delete("/join/:id", (req, res) => {
    res.send("Delete your own LF request");
});

// @route  PUT api/search/join/:id
// @desc   Manually add someone to your request
// @access Private

router.put("/join/:id", (req, res) => {
    res.send("Manually add someone to your LF Request");
});

// @route  POST api/search/join/:id
// @desc   Join/Unjoin an LF request
// @access Private

router.post("/join/:id", (req, res) => {
    res.send("Join/Unjoin an LF Request");
});

module.exports = router;
