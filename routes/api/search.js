const express = require("express");
const Search = require("../../models/Search");
const router = express.Router();
const databaseControllers = require("../../services/search-repository");

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
        res.status(201).send(search);
    } catch (error) {
        res.status(500).send(
            `An error occured while trying to create your search, ${error}`
        );
    }
});

// @route  DELETE api/search/:id
// @desc   Delete your LF Request
// @access Private

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const search = await Search.findByIdAndDelete(id);
        if (!search) {
            return res.status(404).send(`Search ID: ${id} does not exist`);
        }
        res.status(200).send(search);
    } catch (error) {
        res.status(500).send(
            `An error occured while trying to delete your search, ${error}`
        );
    }
});

// @route  POST api/search/:id/join/:playerID
// @desc   Manually add someone to your request
// @access Private

router.post("/:id/player/:playerID", async (req, res) => {
    try {
        const id = req.params.id;
        const playerID = req.params.playerID;

        const search = await Search.findById(id);
        if (!search) {
            return res.status(404).send(`Search ID: ${id} does not exist`);
        }

        if (search.party.some((player) => player.user === playerID)) {
            return res
                .status(400)
                .send(`Player: ${playerID} is already in Search: ${id}`);
        }

        search.party.push({ user: playerID });
        await search.save();
        return res.status(201).send(search);
    } catch (error) {
        res.status(500).send(
            `An error occured while trying to join the search, ${error}`
        );
    }
});

// @route  DELETE api/search/:id/join/::playerID
// @desc   Join/Unjoin an LF request
// @access Private

router.delete("/:id/player/:playerID", async (req, res) => {
    try {
        const id = req.params.id;
        const playerID = req.params.playerID;

        const search = await Search.findById(id);
        if (!search) {
            return res.status(404).send(`Search ID: ${id} does not exist`);
        }

        if (!search.party.some((player) => player.user === playerID)) {
            return res
                .status(404)
                .send(`Player: ${playerID} is not in Search: ${id}`);
        }

        let updatedParty = search.party.filter((player) => {
            return player.user !== playerID;
        });

        search.party = updatedParty;
        await search.save();
        return res.send(search);
    } catch (error) {
        res.status(500).send(
            `An error occured while trying to leave the search, ${error}`
        );
    }
});

module.exports = router;
