/* eslint-disable no-param-reassign */
import * as recommendationValidation from '../validations/recommendation.validation.js';
import * as recommendationRepository from '../repositories/recommendation.repository.js';
import { NotFound } from '../utils/errors.js';
import chooseRandomItem from '../utils/getRandomItem.js';

async function create(recommmendationData) {
  await recommendationValidation.validateCreation(recommmendationData);

  const insertRequest = await recommendationRepository.insert(
    recommmendationData
  );

  return insertRequest;
}

async function upvote(recommendationId) {
  const isRecommendation = await recommendationRepository.findById(
    recommendationId
  );

  if (!isRecommendation) throw new NotFound('Recommendation not found');

  return recommendationRepository.insertUpvote(recommendationId);
}

async function downvote(recommendationId) {
  const recommendationData = await recommendationRepository.getScore(
    recommendationId
  );

  if (!recommendationData) throw new NotFound('Recommendation not found');

  const recommendationScore =
    recommendationData.upvoteCount - recommendationData.downvoteCount - 1;

  if (recommendationScore < -5) {
    return recommendationRepository.deleteRecommendation(recommendationId);
  }

  return recommendationRepository.insertDownvote(recommendationId);
}

async function getRandom() {
  let randomRecommendation;
  const aboveTenPoints = [];
  const belowTenPoints = [];

  const randomRecommendations = await recommendationRepository.getRandom();

  if (randomRecommendations.length === 0)
    throw new NotFound('0 recommendations registered');

  randomRecommendations.forEach((recommendation) => {
    recommendation.score =
      recommendation.upvoteCount - recommendation.downvoteCount;

    if (recommendation.score > 10) {
      aboveTenPoints.push(recommendation);
    } else {
      belowTenPoints.push(recommendation);
    }

    delete recommendation.upvoteCount;
    delete recommendation.downvoteCount;
  });

  if (aboveTenPoints.length === 0 || belowTenPoints.length === 0) {
    randomRecommendation = chooseRandomItem(randomRecommendations);
  } else {
    const chosenRecommendationArray =
      Math.random() > 0.3 ? aboveTenPoints : belowTenPoints;

    randomRecommendation = chooseRandomItem(chosenRecommendationArray);
  }

  return randomRecommendation;
}

export { create, upvote, downvote, getRandom };
