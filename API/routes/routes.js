const user = require('../controllers/userController');
const circuit = require('../controllers/circuitController');
const step = require('../controllers/stepController');
const transit = require('../controllers/transitController');
const question = require('../controllers/questionController');

module.exports = function(app)
{
	app.route('/user').get(user.user);
	app.route('/circuit').get(circuit.circuit);
	app.route('/step').get(step.step);
	app.route('/transit').get(transit.transit);
	app.route('/question').get(question.question);
};
