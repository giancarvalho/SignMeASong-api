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

async function downvote(req, res, next) {
  const { id } = req.params;

  try {
    await recommendationService.downvote(id);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

async function getRandom(req, res, next) {
  try {
    const getRandomRequest = await recommendationService.getRandom();

    res.send(getRandomRequest);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export { create, upvote, downvote, getRandom };
