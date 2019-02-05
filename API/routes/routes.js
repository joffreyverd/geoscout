
const test = require('../controlers/testController')
module.exports=function(app)
{
	app.route('/test')
	.get(test.test); // HOME
};
