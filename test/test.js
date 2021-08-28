var assert = require('assert');
const dbaccess = require("../dbaccess.js");


describe('dbaccess', function () {
	describe('writesomething', function () {
		it('should end without errors', async function () {
			this.timeout(10000);
			await dbaccess.writesomething();
		});
	});
	describe('taroFromHanako', function () {
		it('should end without errors', async function () {
			this.timeout(10000);
			await dbaccess.taroFromHanako();
		});
	});
	describe('getRecent', function () {
		it('should end without errors', async function () {
			this.timeout(10000);
			const result = await dbaccess.getRecent("taroFromHanako");
			console.log(result);
		});
	});
	describe('resetGame', function () {
		it('should clear taroFromHanako collection', async function () {
			this.timeout(20000);
			await dbaccess.resetGame();
			const result = await dbaccess.getRecent("taroFromHanako");
			assert(result.length == 0);
		});
	});
	describe('getRecentHanakoAndTaro', function () {
		it('should clear taroFromHanako and hanakoFromTaro collection', async function () {
			this.timeout(20000);
			await dbaccess.taroFromHanako();
			await dbaccess.resetGame();
			const result = await dbaccess.getRecentHanakoAndTaro();
			console.log(result);
			assert(result.hanakoFromTaro.length == 0 && result.taroFromHanako == 0);
			await Promise.all([dbaccess.taroFromHanako(),dbaccess.taroFromHanako(),dbaccess.taroFromHanako(),dbaccess.hanakoFromTaro()]);
			const result2 = await dbaccess.getRecentHanakoAndTaro();
			console.log(result2);
			assert(result2.hanakoFromTaro.length !== 0);
			assert(result2.taroFromHanako !== 0);

		});
	});
});