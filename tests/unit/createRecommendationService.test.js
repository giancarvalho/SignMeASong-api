import * as recommendationService from '../../src/services/recommendation.service.js';
import * as recommendationRepository from '../../src/repositories/recommendation.repository.js';
import * as recommendationValidation from '../../src/validations/recommendation.validation.js';
import createFakeRecommendation from '../factories/recommendation.factory.js';

const sut = recommendationService;
describe('unit test for recommendationService', () => {
  it('should return an object with an id', async () => {
    const recommendation = createFakeRecommendation();

    const returnedValue = { id: 1 };
    jest
      .spyOn(recommendationRepository, 'insert')
      .mockReturnValueOnce(returnedValue);

    jest
      .spyOn(recommendationValidation, 'validateCreation')
      .mockImplementationOnce(() => true);

    const result = await sut.create(recommendation);

    expect(result).toMatchObject(returnedValue);
  });
});
