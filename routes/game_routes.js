const GameController = require('../controllers/game_controller');

module.exports = (app) => {
    app.get('/api/game/:id', GameController.get);
    app.get('/api/games', GameController.getAll);
    app.get('/api/game/developer/:id', GameController.getByDev);
    app.post('/api/game', GameController.create);
    app.post('/api/game/character/:id', GameController.addCharToGame);
    app.put('/api/game/:id', GameController.edit);
    app.delete('/api/game/:id', GameController.delete);

}