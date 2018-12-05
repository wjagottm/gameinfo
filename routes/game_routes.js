const GameController = require('../controllers/game_controller');

module.exports = (app) => {
    app.get('/api/game/:id', GameController.get)
    app.post('/api/game/', GameController.create)
    app.put('/api/game/:id', GameController.edit)
    app.delete('/api/game/:id', GameController.delete)

}