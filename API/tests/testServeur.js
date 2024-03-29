/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable no-undef */
/* eslint-disable indent */
var request = require('supertest');
module.exports =
{
	test :describe('loading express', function () 
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

			it('login', function testPath(done) 
			{
				let data = 
				{
					email : 'antony.quent1@gmail.com',
					password : 'abcdefgh45'
				};

				let body = { firstname: 'Quentin', lastname: 'ANTONY', id_user: 37 };

				request(server)
				.post('/signin')
				.send(data)
				.expect(200)
				.then(response =>
				{
					assert(response.body.User,body);
				});
				done();
			});
	})
};