let connectionManager = {getConnection: () => {}, clearDatabase: () => {}, closeConnection: () => {}};
const MongooseConnection = require('./lib/mongoose.connection');
connectionManager = new MongooseConnection();

module.exports = connectionManager;
