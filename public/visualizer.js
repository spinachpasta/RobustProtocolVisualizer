const processedPackets = [];
const boxes = [];
window.onload = function () {
	async function dataloop() {
		const result = await $.ajax({
			url: "/gamedata",
			type: 'GET'
		});
		console.log(result);
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
				for (let i = 0; i < p.size&&i<10; i++) {
					boxes.push(new PacketBox(p.size, true, -i * 15));
				}
			}
		}
		for (p of result.hanakoReceived) {
			if (processedPackets.includes(p.request_uuid)) {

			} else if (new Date().getTime() - new Date(p.timestamp).getTime() < 10000) {
				processedPackets.push(p.request_uuid);
				for (let i = 0; i < p.size&&i<10; i++) {
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