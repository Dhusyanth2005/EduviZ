require('dotenv').config(); // Load environment variables first
const app = require('./app');

const port = 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));