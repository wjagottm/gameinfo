const CharacterController = require('../controllers/character_controller');

module.exports = (app) => {
    app.get('/api/character/:id', CharacterController.get)
    app.post('/api/character/', CharacterController.create)
    app.put('/api/character/:id', CharacterController.edit)
    app.delete('/api/character/:id', CharacterController.delete)
}