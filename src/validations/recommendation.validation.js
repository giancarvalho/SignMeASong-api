import newRecommendationSchema from './schemas/newRecommendation.js';
import * as recommendationRepository from '../repositories/recommendation.repository.js';
import { Conflict, BadRequest } from '../utils/errors.js';

async function validateCreation(data) {
  const validation = newRecommendationSchema.validate(data);

  if (validation.error) {
    throw new BadRequest('Invalid name or link');
  }

  const isExistingRecommendation = await recommendationRepository.findByLink(
    data.youtubeLink
  );

  if (isExistingRecommendation.length > 0) {
    throw new Conflict('Recommendation is already registered.');
  }

  return true;
}

export { validateCreation };
