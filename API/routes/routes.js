const user = require('../controllers/userController');
const circuit = require('../controllers/circuitController');
const step = require('../controllers/stepController');
const transit = require('../controllers/transitController');
const question = require('../controllers/questionController');
const evaluation = require('../controllers/evaluationController');
module.exports = function(app)
{
	app.route('/user').get(user.listUser);
	app.route('/create-user').post(user.createUser);
	app.route('/relations').get(user.listRelations);
	app.route('/ask-relation').post(user.askRelation);
	app.route('/evaluations-circuit').post(evaluation.evaluationsCircuit);
	app.route('/create-evaluation').post(evaluation.createEvaluation);	
	app.route('/transit').get(transit.transit);	
	app.route('/question').get(question.question);

	app.route('/circuit').post(circuit.createCircuit);
	app.route('/circuit').put(circuit.publicationCircuit);
	app.route('/circuit').delete(circuit.deleteCircuit);

	app.route('/step').get(step.step);
	app.route('/step').post(step.createStep);
	/*app.route('/step').delete(circuit.deleteCircuit);*/
}
