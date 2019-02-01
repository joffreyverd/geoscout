
const test = require('../controlers/testControleur')
module.exports=function(app)
{
	app.route('/test')
	.get(test.test); // HOME
};