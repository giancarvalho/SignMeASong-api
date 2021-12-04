import * as recommendationValidation from '../../src/validations/recommendation.validation.js';
import { createFakeRecommendation } from '../factories/recommendation.factory.js';
import * as recommendationRepository from '../../src/repositories/recommendation.repository.js';
import newRecommendationSchema from '../../src/validations/schemas/newRecommendation.js';
import { BadRequest, Conflict } from '../../src/utils/errors.js';

const sut = recommendationValidation;
describe('POST /recommendation', () => {
  it('should return true if body is valid', async () => {
    jest
      .spyOn(recommendationRepository, 'findByLink')
      .mockImplementationOnce(() => []);

    const fakeRecommendation = createFakeRecommendation();
    jest.spyOn(newRecommendationSchema, 'validate').mockReturnValueOnce({
      error: false,
    });

    const result = await sut.validateCreation(fakeRecommendation);

    expect(result).toBeTruthy();
  });

  it('should return 400 if body is valid', async () => {
    const fakeRecommendation = createFakeRecommendation();

    jest
      .spyOn(newRecommendationSchema, 'validate')
      .mockReturnValueOnce({ error: true });

    const promise = sut.validateCreation(fakeRecommendation);

    await expect(promise).rejects.toThrowError(BadRequest);
  });

  it('should return Recommendation is already registered', async () => {
    jest
      .spyOn(recommendationRepository, 'findByLink')
      .mockReturnValueOnce([{ id: 2 }]);

    const fakeRecommendation = createFakeRecommendation();

    jest
      .spyOn(newRecommendationSchema, 'validate')
      .mockReturnValueOnce({ error: false });

    const promise = sut.validateCreation(fakeRecommendation);

    await expect(promise).rejects.toThrowError(Conflict);
  });
});
