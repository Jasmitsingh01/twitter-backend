import express from 'express';
import auth from './Routes/auth.routes';
import tweets from './Routes/tweets.routes';
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
app.use('/auth', auth);
app.use('/tweets', tweets);

export default app;