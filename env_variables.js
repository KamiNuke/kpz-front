// Load .env variables
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Access environment variables
const port = process.env.PORT || 8080;
const apiKey = process.env.API_KEY || 'default_key';
const environment = process.env.ENVIRONMENT || 'production';

// Output the results
console.log(`🚀 Server running on port: ${port}`);
console.log(`🔑 API Key: ${apiKey}`);
console.log(`🌍 Environment: ${environment}`);
