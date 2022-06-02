var http = require('http');
var app = require('./config/express')();
require('./config/passport')();
const url = 'mongodb://dswa5:dswa5@cluster0-shard-00-00.mm6wo.mongodb.net:27017,cluster0-shard-00-01.mm6wo.mongodb.net:27017,cluster0-shard-00-02.mm6wo.mongodb.net:27017/ifsp?replicaSet=atlas-zk88h4-shard-0&ssl=true&authSource=admin';
require('./config/database.js')(url);
http.createServer(app).listen(app.get('port'), function() {
    console.log('Express Server escutando na porta ' + app.get('port'));
});