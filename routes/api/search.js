const express = require("express");
const router = express.Router();

// @route  POST api/search
// @desc   Add Looking For request
// @access Private

router.post("/", (req, res) => {
    res.send("Add an LF request");
});

// @route  DELETE api/search/:id
// @desc   Delete your LF Request
// @access Private

router.delete("/:id", (req, res) => {
    res.send("Delete your own LF request");
});

// @route  POST api/search/:id/join/:playerID
// @desc   Manually add someone to your request
// @access Private

router.post(":id/join/:playerID", (req, res) => {
    res.send("Manually add someone to your LF Request");
});

// @route  DELETE api/search/:id/join/::playerID
// @desc   Join/Unjoin an LF request
// @access Private

router.delete(":id/join/:playerID", (req, res) => {
    res.send("Join/Unjoin an LF Request");
});

module.exports = router;
