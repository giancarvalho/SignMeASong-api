import express from 'express';
import * as recommendationController from '../controllers/recommendation.controller.js';

const route = express.Router();

route.post('', recommendationController.create);
route.post('/:id/upvote', recommendationController.upvote);

export default route;
