const processedPackets = [];
const boxes = [];
let gamedata={};
window.onload = function () {
	async function dataloop() {
		const result = await $.ajax({
			url: "/gamedata",
			type: 'GET'
		});
		console.log(result);
		gamedata=result;
		setTimeout(dataloop, 500);
	}
	dataloop();
	async function requestloop() {
		const result = await $.ajax({
			url: "/requests",
			type: 'GET'
		});
		for (p of result.tarosent) {
			if (processedPackets.includes(p.request_uuid)) {
			} else  if (new Date().getTime() - new Date(p.timestamp).getTime() < 10000) {
				processedPackets.push(p.request_uuid);
				for (let i = 0; i < p.size*0.1&&i<10; i++) {
					boxes.push(new PacketBox(p.size, true, -i * 15));
				}
			}
		}
		for (p of result.hanakoReceived) {
			if (processedPackets.includes(p.request_uuid)) {

			} else if (new Date().getTime() - new Date(p.timestamp).getTime() < 10000) {
				processedPackets.push(p.request_uuid);
				for (let i = 0; i < p.size*0.1&&i<10; i++) {
					boxes.push(new PacketBox(p.size, false, -i * 15));
				}
			}
		}
		console.log(result);
		setTimeout(requestloop, 500);
	}
	requestloop();

	const canvas = $("#canvas");
	const ctx = canvas[0].getContext("2d");
	setInterval(function () {
		ctx.clearRect(0, 0, 600, 300);
		ctx.fillStyle="#000";
		for (const box of boxes) {
			box.step(0.03);
			box.render(ctx);
		}
		for (const box of boxes) {
			if (box.x > 600) {
				const index = boxes.indexOf(box);
				if (index > -1) {
					boxes.splice(index, 1);
				}
			}
		}

		ctx.fillStyle="#eee";
		ctx.fillRect(250,50,100,100);
		ctx.fillStyle="#000";
		ctx.font = "20px Arial";
		ctx.fillText("jammer",260,100);


		ctx.fillStyle="#efe";
		ctx.fillRect(0,50,100,100);
		ctx.fillStyle="#000";
		ctx.font = "20px Arial";
		ctx.fillText("Taro",10,100);



		ctx.fillStyle="#eef";
		ctx.fillRect(500,50,100,100);
		ctx.fillStyle="#000";
		ctx.font = "20px Arial";
		ctx.fillText("Hanako",510,100);


		ctx.font = "20px MS Pゴシック";
		ctx.fillText("送信パケット数",10,30);
		ctx.font = "20px Arial";
		ctx.fillText(gamedata.sent,10,60);
		ctx.font = "20px MS Pゴシック";
		ctx.fillText("受信パケット数",400,30);
		ctx.font = "20px Arial";
		ctx.fillText(gamedata.received,400,60);
//MS Pゴシック
	}, 30);
}
function createTd(text) {
	const td = $("<td></td>");
	td.text(text);
	return td;
}

class PacketBox {
	constructor(size, taro, x) {
		this.x = x || 0;
		this.size = size;
		this.taro = taro;
	}
	step(dt) {
		this.x += dt * 300;
	}
	render(ctx) {
		if (this.taro) {
			if (this.x > 300) {
				return;
			}
		} else {
			if (this.x < 300) {
				return;
			}
		}
		ctx.fillRect(this.x, 100, 10, 10);
	}
}