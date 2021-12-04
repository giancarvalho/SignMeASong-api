import express from 'express';
import * as recommendationController from '../controllers/recommendation.controller.js';

const route = express.Router();

route.post('', recommendationController.create);
route.post('/:id/upvote', recommendationController.upvote);
route.post('/:id/downvote', recommendationController.downvote);
route.get('/random', recommendationController.getRandom);
route.get('/top/:amount', recommendationController.getTopSongs);

export default route;
