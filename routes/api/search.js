const express = require("express");
const Search = require("../../models/Search");
const router = express.Router();

// @route  POST api/search
// @desc   Add Looking For request
// @access Private

router.post("/", async (req, res) => {
    try {
        // Get value from body
        const { user, game, limit } = req.body;
        const search = new Search({
            user,
            game,
            limit,
            party: [
                {
                    user,
                },
            ],
        });
        await search.save();
        res.status(200).send(search);
    } catch (error) {
        res.status(500).send(
            `An error occured while trying to create your search, ${error}`
        );
    }
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

router.post("/:id/player/:playerID", (req, res) => {
    res.send("Add a player to an LF Request");
});

// @route  DELETE api/search/:id/join/::playerID
// @desc   Join/Unjoin an LF request
// @access Private

router.delete("/:id/player/:playerID", (req, res) => {
    res.send("Remove a player from an LF Request");
});

module.exports = router;
