const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();

const dbaccess = require("./dbaccess.js");

app.set('port', PORT);
app.get('/', (req, res) => {
	res.send("hello world");
	res.end();
});
app.get('/writesomething', async (req, res) => {
	try {
		await dbaccess.writesomething();
	} catch (e) {
		console.log(e);
	}
	res.send("wrote");
	res.end();
});
app.listen(PORT, () => console.log(`Listening on ${PORT}`));