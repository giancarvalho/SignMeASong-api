import newRecommendationSchema from './schemas/newRecommendation.js';
import * as recommendationRepository from '../repositories/recommendation.repository.js';

async function validateCreation(data) {
  const validation = newRecommendationSchema.validate(data);

  if (validation.error) return { isInvalid: true, errorCode: 400 };

  try {
    const isExistingRecommendation = await recommendationRepository.find(
      data.youtubeLink
    );

    if (isExistingRecommendation.length > 0) {
      return { isInvalid: true, errorCode: 409 };
    }

    return { isInvalid: false };
  } catch (error) {
    return { isInvalid: true, errorCode: 500 };
  }
}

export { validateCreation };
