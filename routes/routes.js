const CharacterRoutes = require('./character_routes');
const DeveloperRoutes = require('./developer_routes');
const GameRoutes = require('./game_routes');

module.exports = (app) => {
    CharacterRoutes(app);
    DeveloperRoutes(app);
    GameRoutes(app);
}