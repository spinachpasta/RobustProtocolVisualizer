window.onload = function () {
	async function loop(){
		setTimeout(loop,5000);
		const result = await $.ajax({
			url: "/scoreboard",
			type: 'GET'
		});
		console.log(result);
		const tbody = $("#tbody");
		tbody.html("");
		{
			const row = $("<tr></tr>");
			tbody.append(row);
			row.append(createTd("名前"));
			row.append(createTd("受信したパケット数"));
			row.append(createTd("送信したパケット数"));
			row.append(createTd("成功したファイル数"));
			row.append(createTd("誤りのあるファイル数"));
		}
		for (var p of result) {
			const row = $("<tr></tr>");
			tbody.append(row);
			row.append(createTd(p.name));
			row.append(createTd(p.received));
			row.append(createTd(p.sent));
			row.append(createTd(p.success));
			row.append(createTd(p.fail));
		}
	}
	loop();
}
function createTd(text){
	const td=$("<td></td>");
	td.text(text);
	return td;
}