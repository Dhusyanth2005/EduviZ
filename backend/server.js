const app = require('./app');
const { gfs } = require('./config/db');

const port = process.env.PORT || 8080;

const startServer = async () => {
  // Wait for MongoDB connection to be established
  while (!gfs()) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  app.listen(port, () => console.log(`Server running on port ${port}`));
};

startServer();