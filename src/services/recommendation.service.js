import * as recommendationValidation from '../validations/recommendation.validation.js';
import * as recommendationRepository from '../repositories/recommendation.repository.js';

async function create(recommmendationData) {
  await recommendationValidation.validateCreation(recommmendationData);

  const insertRequest = await recommendationRepository.insert(
    recommmendationData
  );

  return insertRequest;
}

export { create };
