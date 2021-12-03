import * as recommendationValidation from '../validations/recommendation.validation.js';
import * as recommendationRepository from '../repositories/recommendation.repository.js';
import { NotFound } from '../utils/errors.js';

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

  await recommendationRepository.insertUpvote(recommendationId);

  return true;
}

async function downvote(recommendationId) {
  const recommendationData = await recommendationRepository.getScore(
    recommendationId
  );

  if (!recommendationData) throw new NotFound('Recommendation not found');

  const recommendationScore =
    recommendationData.upvoteCount - recommendationData.downvoteCount - 1;

  if (recommendationScore <= -5) {
    return recommendationRepository.deleteRecommendation(recommendationId);
  }

  return recommendationRepository.insertDownvote(recommendationId);
}

export { create, upvote, downvote };
