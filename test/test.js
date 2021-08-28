var assert = require('assert');
const dbaccess = require("../dbaccess.js");


describe('dbaccess', function () {
	describe("start game", function () {
		const playername = "player" + Math.random();
		it('registerPlayer should end without error', async function () {
			this.timeout(10000);
			await dbaccess.registerPlayer(playername);
		});
		it('getScore', async function () {
			this.timeout(10000);
			const result = await dbaccess.getScore();
			console.log(result);
			assert(result.name == playername);
			assert(result.success == 0);
			assert(result.fail == 0);
			assert(result.sent == 0);
			assert(result.received == 0);
		});
		it('setFail', async function () {
			this.timeout(10000);
			const before = await dbaccess.getScore();
			const fail = Math.floor(Math.random() * 100);
			await dbaccess.setFail(fail);
			const result = await dbaccess.getScore();
			console.log(result);
			assert(result.name == playername);
			assert(result.success == before.success);
			assert(result.fail == fail);
			assert(result.sent == before.sent);
			assert(result.received == before.received);
		});
		it('setSuccess', async function () {
			this.timeout(10000);
			const before = await dbaccess.getScore();
			const success = Math.floor(Math.random() * 100);
			await dbaccess.setSuccess(success);
			const result = await dbaccess.getScore();
			console.log(result);
			assert(result.name == playername);
			assert(result.success == success);
			assert(result.fail == before.fail);
			assert(result.sent == before.sent);
			assert(result.received == before.received);
		});

	});
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
			const before = await dbaccess.getScore();
			await dbaccess.resetGame();
			const result = await dbaccess.getRecent("taroFromHanako");
			const scoreboard = await dbaccess.getScoreboard();
			assert(result.length == 0);
			assert(scoreboard.length > 0);
			// console.log(scoreboard);
			// console.log(before);
			assert(scoreboard.filter((d) => {
				return d.name == before.name;
			}).length==1);
		});
	});
	describe('getRecentHanakoAndTaro', function () {
		it('should clear taroFromHanako and hanakoFromTaro collection', async function () {
			this.timeout(20000);
			await dbaccess.taroFromHanako();
			await dbaccess.resetGame();
			const result = await dbaccess.getRecentHanakoAndTaro();
			console.log(result);
			//assert(result.hanakoFromTaro.length == 0 && result.taroFromHanako == 0);
			await Promise.all([dbaccess.taroFromHanako(), dbaccess.taroFromHanako(), dbaccess.taroFromHanako(), dbaccess.hanakoFromTaro()]);
			const result2 = await dbaccess.getRecentHanakoAndTaro();
			console.log(result2);
			assert(result2.hanakoFromTaro.length !== 0);
			assert(result2.taroFromHanako !== 0);

		});
	});
});