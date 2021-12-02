import * as recommendationService from '../services/recommendation.service.js';

async function create(req, res, next) {
  const recommendationData = req.body;

  try {
    const createRecommendationRequest = await recommendationService.create(
      recommendationData
    );

    res.status(201).send(createRecommendationRequest);
  } catch (error) {
    next(error);
  }
}

export { create };
