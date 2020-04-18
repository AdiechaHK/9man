const GeneralController = require('./controllers/general')

exports = module.exports = function(app)
{
	app.get('/', GeneralController.home);
	app.get('/game/:gameId', GeneralController.game);
}