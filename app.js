function start() {
  const app = require('./src/server/server.js');
  app.listen(process.env.PORT || 8080);
}

start();
