require('dotenv').config(); // Load environment variables first
const app = require('./app');
require('./config/db'); // Initialize database connection

const port = 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));