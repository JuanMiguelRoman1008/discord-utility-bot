const Search = require("../models/Search");

addSearch = async ({ user, game, limit }) => {
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

    return search;
};

deleteSearch = async ({ searchID }) => {
    const search = await Search.findByIdAndDelete(searchID);
    if (!search) {
        throw new Error("NOT_FOUND");
    }

    return search;
};

joinSearch = async ({ searchID, playerID }) => {
    const search = await Search.findById(searchID);
    if (!search) {
        throw new Error("NOT_FOUND");
    }
    if (search.party.some((player) => player.user === playerID)) {
        throw new Error("ALREADY_EXISTS");
    }
    search.party.push({ user: playerID });
    await search.save();
    return search;
};

leaveSearch = async ({ searchID, playerID }) => {
    const search = await Search.findById(searchID);
    if (!search) {
        throw new Error("NOT_FOUND");
    }

    if (!search.party.some((player) => player.user === playerID)) {
        throw new Error("PLAYER_NOT_FOUND");
    }

    search.party.splice(
        search.party.findIndex((player) => {
            return player.user === playerID;
        }),
        1
    );

    await search.save();
    return search;
};
module.exports = {
    addSearch,
    deleteSearch,
    joinSearch,
    leaveSearch,
};
