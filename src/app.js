import express from 'express';
import auth from './Routes/auth.routes.js';
import tweets from './Routes/tweets.routes.js';
import cors from 'cors'
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin: '*',
        credentials: true,
    }
))
app.use('/api/auth', auth);
app.use('/api/', tweets);

export default app;