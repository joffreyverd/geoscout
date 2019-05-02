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

  it('Chargement serveur à la racine \'/\'', function testSlash(done) 
  {
	request(server)
	.get('/')
	.expect(200, done);
  });
  
  it('Acces circuits (non connecté)', function testPath(done) 
  {
	  request(server)
	  .get('/circuits')
	  .expect('Content-Type', /json/)
	  .expect(200, done);
  });
});