// server.js
// 1. Load environment variables from .env file
require('dotenv').config();

const app = require('./app.js');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');
const path = require('path');

// Swagger UI setup
const YAMLSOURCE = path.join(__dirname, '../openapi.yaml'); // YAML file in project root
const file = fs.readFileSync(YAMLSOURCE, 'utf8');
const swaggerDocument = YAML.parse(file);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Catch-all 404 handler (placed LAST)
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// 2. Use the PORT from process.env, with a fallback for safety
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
