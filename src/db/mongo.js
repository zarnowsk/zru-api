const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let dbServer;

const connect = async () => {
  await mongoose.disconnect(); // kill previous connections

  dbServer = await MongoMemoryServer.create();

  const dbUri = await dbServer.getUri();
  await mongoose.connect(
    dbUri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
};

const closeConnection = async () => {
  await mongoose.disconnect();
  await dbServer.stop();
};

module.exports = {
  connect,
  closeConnection,
};
