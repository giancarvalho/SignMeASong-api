import express from 'express';
import cors from 'cors';
import * as recommendationController from './controllers/recommendation.controller.js';
import handleErrors from './middlewares/error.middleware.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.post('/recommendations', recommendationController.create);

app.use(handleErrors);

export default app;
