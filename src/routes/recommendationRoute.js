import express from 'express';
import * as recommendationController from '../controllers/recommendation.controller.js';

const route = express.Router();

route.post('', recommendationController.create);

export default route;
