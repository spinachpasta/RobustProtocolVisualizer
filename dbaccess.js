var MongoClient = require('mongodb').MongoClient;
const mongourl = process.env.MONGOURL;

const writesomething = async (req, res) => {
	const client = await MongoClient.connect(mongourl, { useNewUrlParser: true });
	const dbo = client.db("a8visualizer");
	const collection = dbo.collection("request_collection");
	//await collection.insertOne({ "request_uuid": "thisisuuid", "timestamp": new Date() });
	//const myReservation = await collection.findOne({ "_id": ObjectId(req.body.object_id) });
	await client.close();
};

module.exports.writesomething = writesomething;