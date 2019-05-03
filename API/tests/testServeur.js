var request = require('supertest');
describe('loading express', function () 
{
		var server = null;
		this.beforeAll(function () 
		{
			server = require('../serveur');
			console.log('--------------------------- Demmarage serveur ---------------------------');
		});

		this.afterAll(function () 
		{
			require('../serveur').close();
			console.log('--------------------------- Arret serveur ---------------------------');
		});

		/////////////////////////////////////////////////////

		it('Chargement serveur à la racine \'/\'', function testSlash(done) 
		{
			request(server)
			.get('/')
			.expect(200, done);
		});
		
		it('Acces mauvaise route', function testPath(done) 
		{
			request(server)
			.get('/test')
			.expect(404, done);
		});
});