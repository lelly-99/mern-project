import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import router from './router/index';


//initialize app instance
const app = express()

//modules || middleaware configurations
dotenv.config();
app.use(cors({
    credentials : true
}));
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

//create and start || listen to server
const server = http.createServer(app)
const PORT = process.env.PORT || 3007
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})

//connect to database
const connectionString = process.env.MONGO_URL
mongoose.connect(connectionString, {
    ssl: true                 
  })
    .then(() => console.log('Database Connected'))
    .catch((err) => console.error('Database connection error:', err));



app.use('/', router())