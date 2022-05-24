const express = require("express");

const router = express.Router();
const databaseControllers = require("../../services/search-repository");

// @route  POST api/search
// @desc   Add search request
// @access Private

router.post("/", async ({ body }, res) => {
  try {
    const search = await databaseControllers.addSearch(body);
    res.status(201).send(search);
    return;
  } catch (error) {
    res
      .status(500)
      .send(`An error occured while trying to create your search, ${error}`);
  }
});

// @route  DELETE api/search/:id
// @desc   Delete search request
// @access Private

router.delete("/:searchID", async ({ params }, res) => {
  try {
    const search = await databaseControllers.deleteSearch(params);
    res.status(200).send(search);
    return;
  } catch (error) {
    if (error.message === "NOT_FOUND") {
      res.status(404).send(`Search ID: ${params.searchID} does not exist`);
    } else {
      res
        .status(500)
        .send(`An error occured while trying to delete your search, ${error}`);
    }
  }
});

// @route  POST api/search/:id/join/:playerID
// @desc   Join search request
// @access Private

router.post("/:searchID/player/:playerID", async ({ params }, res) => {
  try {
    const search = await databaseControllers.joinSearch(params);
    res.status(201).send(search);
    return;
  } catch (error) {
    if (error.message === "NOT_FOUND") {
      res.status(404).send(`Search ID: ${params.searchID} does not exist`);
    } else if (error.message === "ALREADY_EXISTS") {
      res
        .status(409)
        .send(`Player ID: ${params.playerID} is already in Search`);
    } else {
      res
        .status(500)
        .send(`An error occured while trying to join the search, ${error}`);
    }
  }
});

// @route  DELETE api/search/:id/join/::playerID
// @desc   Unjoin search request
// @access Private

router.delete("/:searchID/player/:playerID", async ({ params }, res) => {
  try {
    const search = await databaseControllers.leaveSearch(params);
    res.send(search);
    return;
  } catch (error) {
    if (error.message === "NOT_FOUND") {
      res.status(404).send(`Search ID: ${params.searchID} does not exist`);
    } else if (error.message === "PLAYER_NOT_FOUND") {
      res.status(404).send(`Player ID: ${params.playerID} is not in Search`);
    } else {
      res
        .status(500)
        .send(`An error occured while trying to join the search, ${error}`);
    }
  }
});

module.exports = router;
