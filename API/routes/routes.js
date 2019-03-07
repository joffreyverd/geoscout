const user = require('../controllers/userController');
const circuit = require('../controllers/circuitController');
const step = require('../controllers/stepController');
const transit = require('../controllers/transitController');
const evaluation = require('../controllers/evaluationController');
module.exports = function(app)
{
	app.route('/signup').post(user.createUser);
	app.route('/signin').post(user.login)
	app.route('/whoami').get(user.whoami)
	app.route('/relations').get(user.listRelations);
	app.route('/relations').post(user.askRelation);
	app.route('/evaluations/:id_circuit').get(evaluation.evaluationsCircuit);
	app.route('/evaluations').post(evaluation.createEvaluation);	
	app.route('/transit').get(transit.transit);
	
	app.route('/step/:id_step').get(step.step);
	app.route('/steps/:id_circuit').get(step.stepCircuit);
	app.route('/step').post(step.createStep);
	app.route('/step/question/:id_question').get(step.questionOfStep);
	app.route('/step/:id_step/questions').get(step.questionsOfStep);
	app.route('/step/question').post(step.addQuestionToStep);
	app.route('/step/order').post(step.changeOrder)

	app.route('/circuit/:id_circuit').get(circuit.circuit);
	app.route('/my-circuits').get(circuit.myCircuits)
	app.route('/circuits').get(circuit.circuits);
	app.route('/circuit').post(circuit.createCircuit);
	app.route('/circuit').put(circuit.publicationCircuit);
	app.route('/circuit').delete(circuit.deleteCircuit);
}
