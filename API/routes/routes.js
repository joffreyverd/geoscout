const user = require('../controllers/userController');
const circuit = require('../controllers/circuitController');
const step = require('../controllers/stepController');
const evaluation = require('../controllers/evaluationController');
const question = require('../controllers/questionController');
const achievements = require('../controllers/achievedCircuitController');
module.exports = function(app)
{
	app.route('/signup').post(user.createUser);
	app.route('/signin').post(user.login)
	app.route('/whoami').get(user.whoami)
	app.route('/relations').get(user.listRelations);
	app.route('/relations').post(user.askRelation);
	app.route('/evaluations/:id_circuit').get(evaluation.evaluationsCircuit);
	app.route('/evaluations').post(evaluation.createEvaluation);	
	
	app.route('/step/:id_step').get(step.step);
	app.route('/step/:id_step').put(step.updateStep);
	app.route('/step/:id_circuit/:id_step').delete(step.deleteStep);
	app.route('/steps/:id_circuit').get(step.stepCircuit);
	app.route('/step').post(step.createStep);
	app.route('/step/:id_step/questions').get(step.questionsOfStep);
	app.route('/step/question').post(step.addQuestionToStep);
	app.route('/question/:id_question').put(step.updateQuestion);
	app.route('/step/order').put(step.changeOrder);

	app.route('/circuit/:id_circuit').get(circuit.circuit);
	app.route('/my-circuits').get(circuit.myCircuits);
	app.route('/circuits').get(circuit.circuits);
	app.route('/circuit').post(circuit.createCircuit);
	app.route('/publish-circuit').put(circuit.publicationCircuit);
	app.route('/circuit/:id_circuit').put(circuit.updateCircuit);
	app.route('/circuit').delete(circuit.deleteCircuit);
	app.route('/circuit/nearby').post(circuit.nearbyCircuits)

	app.route('/achievedcircuit').post(achievements.createAchievement)

	app.route('/question/:id_question').get(question.getQuestion);
	app.route('/question').post(question.createQuestion);
	app.route('/question/:id_question').put(question.updateQuestion);
}
