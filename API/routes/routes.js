/* eslint-disable no-undef */
const user = require('../controllers/userController');
const circuit = require('../controllers/circuitController');
const step = require('../controllers/stepController');
const evaluation = require('../controllers/evaluationController');
const question = require('../controllers/questionController');
const achievements = require('../controllers/achievedCircuitController');
const images = require('../controllers/imageController');
const admin = require('../controllers/adminController');

const path = require('path');
const multer = require('multer');
const upload = multer({dest : path.join(path.dirname(process.execPath)) + '/images/awaiting'});
module.exports = function(app)
{
	app.route('/upload').post(upload.any('file'),images.upload);
	app.route('/download').post(images.download);
	app.route('/delete').post(images.delete);
	app.route('/signup').post(user.createUser);
	app.route('/signin').post(user.login);
	app.route('/update-user').post(user.updateUser);
	app.route('/whoami').get(user.whoami);
	app.route('/relations').get(user.listRelations);
	app.route('/user-info/:id_user').get(user.getCount);
	app.route('/ask-relation/:id_user').put(user.askRelation);
	app.route('/answer-relation/:id_user').put(user.answerRelation);
	app.route('/favorites').get(user.getFavorites);
	app.route('/favorites/:id_circuit').post(user.setFavorite);
	app.route('/favorites/:id_circuit').delete(user.deleteFavorite);
	app.route('/evaluations/:id_circuit').get(evaluation.evaluationsCircuit);
	app.route('/evaluations').post(evaluation.createEvaluation);	
	app.route('/step/:id_step').get(step.step);
	app.route('/step/:id_step').put(step.updateStep);
	app.route('/step/:id_circuit/:id_step').delete(step.deleteStep);
	app.route('/steps/:id_circuit').get(step.stepCircuit);
	app.route('/step').post(step.createStep);
	app.route('/step/question').post(step.addQuestionToStep);
	app.route('/question/:id_question').put(step.updateQuestion);
	app.route('/step-order').put(step.changeOrder);
	app.route('/circuit/:id_circuit').get(circuit.circuit);
	app.route('/download-circuit/:id_circuit').get(circuit.downloadCircuit);
	app.route('/my-circuits').get(circuit.myCircuits);
	app.route('/circuits').get(circuit.circuits);
	app.route('/circuit').post(circuit.createCircuit);
	app.route('/publish-circuit').put(circuit.publicationCircuit);
	app.route('/circuit/:id_circuit').put(circuit.updateCircuit);
	app.route('/circuit/patch/:id_circuit').put(circuit.patch);
	app.route('/circuit').delete(circuit.deleteCircuit);
	app.route('/circuit/nearby').post(circuit.nearbyCircuits);
	app.route('/achievedcircuit').get(achievements.getAchievements);
	app.route('/achievedcircuit').post(achievements.createAchievement);
	app.route('/achievedcircuit/:id_achievement').delete(achievements.deleteAchievement);
	app.route('/achievedcircuit/:id_achievement').put(achievements.updateAchievement);
	app.route('/question/:id_question').get(question.getQuestion);
	app.route('/question').post(question.createQuestion);
	app.route('/question/:id_question').put(question.updateQuestion);
	app.route('/download-user/:id_user').get(user.downloadUser);
	app.route('/published-circuits').get(circuit.publishedCircuits);
	app.route('/circuits-admin').get(admin.circuitsAdmin);
	app.route('/circuits-admin/:id_circuit').put(admin.blockCircuit);
};
