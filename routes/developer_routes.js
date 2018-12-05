const DeveloperController = require('../controllers/developer_controller');

module.exports = (app) => {
    app.get('/api/developer/:id', DeveloperController.get);
    app.get('/api/developers', DeveloperController.getAll);
    app.post('/api/developer/', DeveloperController.create);
    app.put('/api/developer/:id', DeveloperController.edit);
    app.delete('/api/developer/:id', DeveloperController.delete);
}