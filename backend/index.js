import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

// Load config
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Global Middleware
app.use(cors({
  origin: '*', // Allow all client links for total accessibility
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Server Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    status: 'ONLINE', 
    timestamp: new Date().toISOString() 
  });
});

// Register Authentication Routing Layer
app.use('/api/auth', authRoutes);

// Fallback Route Handler (404)
app.use((req, res, next) => {
  res.status(404).json({ success: false, error: `Route not found: ${req.originalUrl}` });
});

// Global Server Error Boundary
app.use((err, req, res, next) => {
  console.error('Unhandled Error Exception:', err.stack);
  res.status(500).json({ 
    success: false, 
    error: 'An unexpected error occurred on the server.' 
  });
});

// Launch listener
app.listen(PORT, () => {
  console.log(`
  🚀 =================================================== 🚀
  Backend Services running on: http://localhost:${PORT}
  Environment: Production/Development
  Database Connection: Supabase Client Initialized
  🚀 =================================================== 🚀
  `);
});
