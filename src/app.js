import express from 'express';
import cors from 'cors';
import handleErrors from './middlewares/error.middleware.js';
import recommendationRoute from './routes/recommendationRoute.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/recommendations', recommendationRoute);

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.use(handleErrors);

export default app;
