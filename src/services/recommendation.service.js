import * as recommendationValidation from '../validations/recommendation.validation.js';
import * as recommendationRepository from '../repositories/recommendation.repository.js';

async function create(recommmendationData) {
  const validation =
    recommendationValidation.validateCreation(recommmendationData);

  if (validation.isInvalid) {
    return validation;
  }

  const insertRequest = await recommendationRepository.insert(
    recommmendationData
  );

  return { id: insertRequest };
}

export { create };
