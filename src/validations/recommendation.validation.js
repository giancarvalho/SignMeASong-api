import newRecommendationSchema from './schemas/newRecommendation.js';
import * as recommendationRepository from '../repositories/recommendation.repository.js';
import { Conflict } from '../utils/errors.js';

async function validateCreation(data) {
  const validation = newRecommendationSchema.validate(data);

  if (validation.error) return { isInvalid: true, errorCode: 400 };

  const isExistingRecommendation = await recommendationRepository.find(
    data.youtubeLink
  );

  if (isExistingRecommendation.length > 0) {
    throw new Conflict('User is already registered.');
  }

  return { isInvalid: false };
}

export { validateCreation };
