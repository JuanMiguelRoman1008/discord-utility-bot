const express = require("express");
const Search = require("../../models/Search");
const router = express.Router();
const databaseControllers = require("../../services/search-repository");

// @route  POST api/search
// @desc   Add Looking For request
// @access Private

router.post("/", async ({ body }, res) => {
    try {
        const search = await databaseControllers.addSearch(body);
        res.status(201).send(search);
        return;
    } catch (error) {
        res.status(500).send(
            `An error occured while trying to create your search, ${error}`
        );
        return;
    }
});

// @route  DELETE api/search/:id
// @desc   Delete your LF Request
// @access Private

router.delete("/:searchID", async (req, res) => {
    try {
        const search = await databaseControllers.deleteSearch(req.params);
        res.status(200).send(search);
        return;
    } catch (error) {
        if (error.message === "NOT_FOUND") {
            res.status(404).send(`Search ID does not exist`);
            return;
        } else {
            res.status(500).send(
                `An error occured while trying to delete your search, ${error}`
            );
            return;
        }
    }
});

// @route  POST api/search/:id/join/:playerID
// @desc   Manually add someone to your request
// @access Private

router.post("/:searchID/player/:playerID", async (req, res) => {
    try {
        const search = await databaseControllers.joinSearch(req.params);
        res.status(201).send(search);
        return;
    } catch (error) {
        if (error.message === "NOT_FOUND") {
            res.status(404).send(`Search ID does not exist`);
            return;
        } else if (error.message === "ALREADY_EXISTS") {
            res.status(409).send(`Player ID is already in Search`);
            return;
        } else {
            res.status(500).send(
                `An error occured while trying to join the search`
            );
            return;
        }
    }
});

// @route  DELETE api/search/:id/join/::playerID
// @desc   Unjoin search request
// @access Private

router.delete("/:searchID/player/:playerID", async (req, res) => {
    try {
        const search = await databaseControllers.leaveSearch(req.params);
        res.send(search);
        return;
    } catch (error) {
        if (error.message === "NOT_FOUND") {
            res.status(404).send(`Search ID does not exist`);
            return;
        } else if (error.message === "PLAYER_NOT_FOUND") {
            res.status(404).send(`Player ID is not in Search`);
            return;
        } else {
            res.status(500).send(
                `An error occured while trying to join the search`
            );
            return;
        }
    }
});

module.exports = router;
