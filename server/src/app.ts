import cors from 'cors';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import express from 'express';
import config from './config/config';
import { corsConfig } from './config/cors';
import { errorHandler } from './middlewares/errorHandler';
import userRoutes from './routes/userRoutes';

export const db = drizzle(config.databaseUrl);

const app = express();

app.use(express.json());
app.use(cors(corsConfig));

// Routes
app.use('/api/users', userRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
