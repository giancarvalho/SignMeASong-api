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

async function upvote(req, res, next) {
  const { id } = req.params;

  try {
    await recommendationService.upvote(id);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

export { create, upvote };
