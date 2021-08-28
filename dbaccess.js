var MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const mongourl = process.env.MONGOURL;
const uuidv4 = require("uuid").v4;

module.exports.writesomething = async () => {
	const client = await MongoClient.connect(mongourl, { useNewUrlParser: true });
	const dbo = client.db("a8visualizer");
	const collection = dbo.collection("request_collection");
	await collection.insertOne({ "request_uuid": "thisisuuid", "timestamp": new Date() });
	//const myReservation = await collection.findOne({ "_id": ObjectId(req.body.object_id) });
	await client.close();
};
module.exports.taroFromHanako = async (size) => {
	const client = await MongoClient.connect(mongourl, { useNewUrlParser: true });
	const dbo = client.db("a8visualizer");
	const collection = dbo.collection("taroFromHanako");
	await collection.insertOne({ "request_uuid": uuidv4(), "timestamp": new Date(), "size": size });
	//const myReservation = await collection.findOne({ "_id": ObjectId(req.body.object_id) });
	await client.close();
};
module.exports.hanakoFromTaro = async (size) => {
	const client = await MongoClient.connect(mongourl, { useNewUrlParser: true });
	const dbo = client.db("a8visualizer");
	const collection = dbo.collection("hanakoFromTaro");
	await collection.insertOne({ "request_uuid": uuidv4(), "timestamp": new Date(), "size": size });
	//const myReservation = await collection.findOne({ "_id": ObjectId(req.body.object_id) });
	await client.close();
};
const getRecentReq = async (dbo, name) => {
	const collection = dbo.collection(name);
	return collection.find({}).limit(3).toArray();
}
module.exports.getRecent = async (collectionName) => {
	const client = await MongoClient.connect(mongourl, { useNewUrlParser: true });
	const dbo = client.db("a8visualizer");
	const collection = dbo.collection(collectionName);
	const result = await collection.find({}).limit(3).toArray();
	await client.close();
	return result;
}

module.exports.registerPlayer = async (name) => {
	const client = await MongoClient.connect(mongourl, { useNewUrlParser: true });
	const dbo = client.db("a8visualizer");
	const collection_gamedata = dbo.collection("gameData");
	await collection_gamedata.findOneAndUpdate({}, {$set:{ "name": name, "success": 0, "fail": 0, "sent": 0, "received": 0 }}, { upsert: true });
	await client.close();
};

module.exports.setSuccess = async (number) => {
	const client = await MongoClient.connect(mongourl, { useNewUrlParser: true });
	const dbo = client.db("a8visualizer");
	const collection_gamedata = dbo.collection("gameData");
	await collection_gamedata.findOneAndUpdate({ },{$set: { "success": Number(number) }});
	//const myReservation = await collection.findOne({ "_id": ObjectId(req.body.object_id) });
	await client.close();
};
module.exports.setFail = async (number) => {
	const client = await MongoClient.connect(mongourl, { useNewUrlParser: true });
	const dbo = client.db("a8visualizer");
	const collection_gamedata = dbo.collection("gameData");
	await collection_gamedata.findOneAndUpdate({ },{$set: { "fail": Number(number) }});
	//const myReservation = await collection.findOne({ "_id": ObjectId(req.body.object_id) });
	await client.close();
};

module.exports.getScore = async () => {
	const client = await MongoClient.connect(mongourl, { useNewUrlParser: true });
	const dbo = client.db("a8visualizer");
	const collection_gamedata = dbo.collection("gameData");
	const result = await collection_gamedata.findOne({});
	await client.close();
	return result;
};
module.exports.getRecentHanakoAndTaro = async () => {
	const client = await MongoClient.connect(mongourl, { useNewUrlParser: true });
	const dbo = client.db("a8visualizer");
	const [result, result1] =
		await Promise.all([getRecentReq(dbo, "hanakoFromTaro"), getRecentReq(dbo, "taroFromHanako")]);
	await client.close();
	return { hanakoFromTaro: result, taroFromHanako: result1 };
}

module.exports.resetGame = async () => {
	const client = await MongoClient.connect(mongourl, { useNewUrlParser: true });
	const dbo = client.db("a8visualizer");
	const collection = dbo.collection("taroFromHanako");
	const collection1 = dbo.collection("hanakoFromHanako");
	try {
		await Promise.all([collection.drop(), collection1.drop()]);
	} catch (e) {

	}
	await client.close();
}