require('dotenv').config()

const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();

const dbaccess = require("./dbaccess.js");
function authorize(body) {
	try {
		return body.passphrase == process.env.PASSPHRASE;
	} catch (e) {
		return false;
	}
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.set('port', PORT);
app.get('/', (req, res) => {
	res.send("hello world");
	res.end();
});
/*
app.get('/writesomething', async (req, res) => {
	if (!authorize(req.body)) {
		res.send("wrong passphrase");
		return;
	}
	try {
		await dbaccess.writesomething();
	} catch (e) {
		console.log(e);
	}
	res.send("wrote");
	res.end();
});*/

app.post('/register_player', async (req, res) => {
	if (!authorize(req.body)) {
		res.send("wrong passphrase");
		res.end();
		return;
	}
	if(!req.body.name){
		res.send("missing name");
		res.end();
		return;
	}
	try {
		await dbaccess.registerPlayer(req.body.name);
	} catch (e) {
		console.log(e);
	}
	res.send("wrote");
	res.end();
});

app.post('/set_fail', async (req, res) => {
	if (!authorize(req.body)) {
		res.send("wrong passphrase");
		res.end();
		return;
	}
	if(!req.body.fails){
		res.send("missing fails");
		res.end();
		return;
	}
	try {
		await dbaccess.setFail(Number(req.body.fails));
	} catch (e) {
		console.log(e);
	}
	res.send("wrote");
	res.end();
});

app.post('/set_success', async (req, res) => {
	if (!authorize(req.body)) {
		res.send("wrong passphrase");
		res.end();
		return;
	}
	if(!req.body.success){
		res.send("missing success");
		res.end();
		return;
	}
	try {
		await dbaccess.setSuccess(Number(req.body.success));
	} catch (e) {
		console.log(e);
	}
	res.send("wrote");
	res.end();
});

app.post('/hanako_sent', async (req, res) => {
	if (!authorize(req.body)) {
		res.send("wrong passphrase");
		res.end();
		return;
	}
	if(!req.body.size){
		res.send("missing size");
		res.end();
		return;
	}
	try {
		await dbaccess.taroFromHanako(Number(req.body.size));
	} catch (e) {
		console.log(e);
	}
	res.send("wrote");
	res.end();
});
app.post('/hanako_received', async (req, res) => {
	if (!authorize(req.body)) {
		res.send("wrong passphrase");
		res.end();
		return;
	}
	if(!req.body.size){
		res.send("missing size");
		res.end();
		return;
	}
	try {
		await dbaccess.hanakoReceived(Number(req.body.size));
	} catch (e) {
		console.log(e);
	}
	res.send("wrote");
	res.end();
});

app.post('/taro_sent', async (req, res) => {
	if (!authorize(req.body)) {
		res.send("wrong passphrase");
		res.end();
		return;
	}
	if(!req.body.size){
		res.send("missing size");
		res.end();
		return;
	}
	try {
		await dbaccess.hanakoFromTaro(Number(req.body.size));
	} catch (e) {
		console.log(e);
	}
	res.send("wrote");
	res.end();
});

app.post('/taro_received', async (req, res) => {
	if (!authorize(req.body)) {
		res.send("wrong passphrase");
		res.end();
		return;
	}
	if(!req.body.size){
		res.send("missing size");
		res.end();
		return;
	}
	try {
		await dbaccess.taroReceived(Number(req.body.size));
	} catch (e) {
		console.log(e);
	}
	res.send("wrote");
	res.end();
});


app.post('/reset_game', async (req, res) => {
	if (!authorize(req.body)) {
		res.send("wrong passphrase");
		res.end();
		return;
	}
	try {
		await dbaccess.resetGame();
	} catch (e) {
		console.log(e);
	}
	res.send("wrote");
	res.end();
});

app.get("/scoreboard",async(req,res)=>{
	res.send(await dbaccess.getScoreboard());
	res.end();
});


app.get("/gamedata",async(req,res)=>{
	res.send(await dbaccess.getScore());
	res.end();
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`));