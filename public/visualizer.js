window.onload = function () {
	async function loop(){
		setTimeout(loop,500);
		const result = await $.ajax({
			url: "/gamedata",
			type: 'GET'
		});
		console.log(result);
	}
	loop();
}
function createTd(text){
	const td=$("<td></td>");
	td.text(text);
	return td;
}