const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();

var MongoClient = require('mongodb').MongoClient;
const mongourl = process.env.MONGOURL;
{
	const client = await MongoClient.connect(mongourl, { useNewUrlParser: true });
	const dbo = client.db(dbname);
	const collection = dbo.collection(collectionname);
	console.log(req.body.object_id);
	const myReservation = await collection.findOne({ "_id": ObjectId(req.body.object_id) });
	await client.close();
}


app.set('port', PORT);
app.get('/', (req, res) => {
	res.send("hello world");
	res.end();
});
app.listen(PORT, () => console.log(`Listening on ${PORT}`));