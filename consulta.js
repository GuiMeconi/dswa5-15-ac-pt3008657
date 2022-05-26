const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('contatos');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Foram encontrados os seguintes docs:");
        console.log(docs)
        callback(docs);
    });
};
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://dswa5:dswa5@cluster0-shard-00-00.mm6wo.mongodb.net:27017,cluster0-shard-00-01.mm6wo.mongodb.net:27017,cluster0-shard-00-02.mm6wo.mongodb.net:27017/ifsp?replicaSet=atlas-zk88h4-shard-0&ssl=true&authSource=admin';
// Database Name
const dbName = 'ifsp';
// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
    assert.equal(null, err);
    console.log("Aluno: Fabio Teixeira");
    console.log("Servidor conectado!");

    const db = client.db(dbName);

    findDocuments(db, function() {
        client.close();
    });

});