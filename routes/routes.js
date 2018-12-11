const CharacterRoutes = require('./character_routes');
const DeveloperRoutes = require('./developer_routes');
const GameRoutes = require('./game_routes');
const UserRoutes = require('./user_routes');
const RCharacterRoutes = require('./r_character_routes');
const RDeveloperRoutes = require('./r_developer_routes');
const RGameRoutes = require('./r_game_routes');
var jwt = require('jsonwebtoken');

function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
        if (err) {
            res.json({status:"error", message: err.message, data:null});
        }else{
            // add user id to request
            req.body.userId = decoded.id;
            req.body.expiresIn = decoded.exp;
            next();
        }
    });
    
}
module.exports = (app) => {
    app.use('/api/user', UserRoutes);
    app.use('/api/character', RCharacterRoutes);
    app.use('/api/developer', RDeveloperRoutes);
    app.use('/api/game', RGameRoutes);
    app.use('/api/character', validateUser, CharacterRoutes);
    app.use('/api/developer', validateUser, DeveloperRoutes);
    app.use('/api/game', validateUser, GameRoutes);
}