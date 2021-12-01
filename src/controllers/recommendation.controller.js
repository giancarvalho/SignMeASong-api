import * as recommendationService from '../services/recommendation.service.js';

async function create(req, res) {
  const recommendationData = req.body;

  try {
    const createRecommendationRequest = await recommendationService.create(
      recommendationData
    );

    if (createRecommendationRequest.isInvalid) {
      return res.sendStatus(createRecommendationRequest.erroCode);
    }

    res.status(201).send(createRecommendationRequest);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export { create };
