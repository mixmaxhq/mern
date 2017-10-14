const mongoist = require('mongoist');

// Get the mongo url from an environment variable. You can set this by starting the application
// like this: MONGO_URL='your_mongo_url' yarn start
const db = mongoist(process.env.MONGO_URL);

module.exports = db;
