var MongoClient = require('mongodb').MongoClient;
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
module.exports.tarosent = async (size) => {
	const client = await MongoClient.connect(mongourl, { useNewUrlParser: true });
	const dbo = client.db("a8visualizer");
	const collection = dbo.collection("tarosent");
	await collection.insertOne({ "request_uuid": uuidv4(), "timestamp": new Date(), "size": size });
	//const myReservation = await collection.findOne({ "_id": ObjectId(req.body.object_id) });
	await client.close();
};


module.exports.taroReceived = async (size) => {
	const client = await MongoClient.connect(mongourl, { useNewUrlParser: true });
	const dbo = client.db("a8visualizer");
	const collection = dbo.collection("taroReceived");
	await collection.insertOne({ "request_uuid": uuidv4(), "timestamp": new Date(), "size": size });
	//const myReservation = await collection.findOne({ "_id": ObjectId(req.body.object_id) });
	await client.close();
};
module.exports.hanakoReceived = async (size) => {
	const client = await MongoClient.connect(mongourl, { useNewUrlParser: true });
	const dbo = client.db("a8visualizer");
	const collection = dbo.collection("hanakoReceived");
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
	const result = await collection.find({}).limit(10).toArray();
	await client.close();
	return result;
}

module.exports.registerPlayer = async (name) => {
	const client = await MongoClient.connect(mongourl, { useNewUrlParser: true });
	const dbo = client.db("a8visualizer");
	const collection_gamedata = dbo.collection("gameData");
	await collection_gamedata.findOneAndUpdate({}, { $set: { "name": name, "success": 0, "fail": 0, "sent": 0, "received": 0 } }, { upsert: true });
	await client.close();
};

module.exports.setSuccess = async (number) => {
	const client = await MongoClient.connect(mongourl, { useNewUrlParser: true });
	const dbo = client.db("a8visualizer");
	const collection_gamedata = dbo.collection("gameData");
	await collection_gamedata.findOneAndUpdate({}, { $set: { "success": Number(number) } });
	//const myReservation = await collection.findOne({ "_id": ObjectId(req.body.object_id) });
	await client.close();
};
module.exports.setFail = async (number) => {
	const client = await MongoClient.connect(mongourl, { useNewUrlParser: true });
	const dbo = client.db("a8visualizer");
	const collection_gamedata = dbo.collection("gameData");
	await collection_gamedata.findOneAndUpdate({}, { $set: { "fail": Number(number) } });
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
	const [result, result1, taroReceived, hanakoReceived] =
		await Promise.all([
			getRecentReq(dbo, "tarosent"),
			getRecentReq(dbo, "taroFromHanako"),
			getRecentReq(dbo, "taroReceived"),
			getRecentReq(dbo, "hanakoReceived")
		]);
	await client.close();
	return { tarosent: result, hanakosent: result1, hanakoReceived: hanakoReceived, taroReceived: taroReceived };
}

module.exports.resetGame = async () => {
	const client = await MongoClient.connect(mongourl, { useNewUrlParser: true });
	const dbo = client.db("a8visualizer");
	const collection = dbo.collection("taroFromHanako");
	const collection1 = dbo.collection("hanakoFromHanako");
	const collection2 = dbo.collection("taroReceived");
	const collection3 = dbo.collection("hanakoReceived");
	try {
		await Promise.all([collection.drop(), collection1.drop(), collection2.drop(), collection3.drop(), updateScoreboard()]);
	} catch (e) {

	}
	await client.close();
}

module.exports.getScoreboard = async () => {
	const client = await MongoClient.connect(mongourl, { useNewUrlParser: true });
	const dbo = client.db("a8visualizer");
	const collection = dbo.collection("scoreboard");
	const result = await collection.find({}).toArray();
	await client.close();
	return result;
}

const updateScoreboard = async () => {
	const data = await module.exports.getScore();
	const client = await MongoClient.connect(mongourl, { useNewUrlParser: true });
	const dbo = client.db("a8visualizer");
	const collection = dbo.collection("scoreboard");
	await collection.findOneAndUpdate({ "name": data.name }, { $set: { "name": data.name, "success": data.success, "fail": data.fail, "sent": data.sent, "received": data.received } }, { upsert: true });
}