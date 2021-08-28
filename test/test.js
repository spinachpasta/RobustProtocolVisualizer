var assert = require('assert');
const dbaccess = require("../dbaccess.js");


describe('dbaccess', function () {
	describe('writesomething', function () {
		it('should end without errors', async function () {
			this.timeout(10000); 
			await dbaccess.writesomething();
		});
	});
});