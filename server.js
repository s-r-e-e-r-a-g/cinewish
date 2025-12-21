import express from 'express';
import 'dotenv/config'
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js'
import tmdbRoutes from './routes/tmdbRoutes.js'
import wishListRoutes from './routes/wishlistRoutes.js'
import userRoutes from './routes/userRoutes.js'
import './utilities/fetchFrequently.js';
import './utilities/sleepPreventer.js'
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 4000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
connectDB();

app.use(cookieParser());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/tmdb", tmdbRoutes);
app.use("/api/wishlist", wishListRoutes);
app.use("/api/user", userRoutes);


app.use(express.static(path.join(__dirname, 'dist')));

app.get('/{*any}', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.get("/ping", (req, res) => {
    res.json({ message: "Server Ping"})
})

app.listen(PORT, ()=>{
    console.log(`Server running: http://localhost:${PORT}`)
})