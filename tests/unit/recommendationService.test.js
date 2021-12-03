import * as recommendationValidation from '../../src/validations/recommendation.validation.js';
import createFakeRecommendation from '../factories/recommendation.factory.js';
import * as recommendationRepository from '../../src/repositories/recommendation.repository.js';
import newRecommendationSchema from '../../src/validations/schemas/newRecommendation.js';

const sut = recommendationValidation;
describe('POST /recommendation', () => {
  it('should return true if body is valid', async () => {
    jest
      .spyOn(recommendationRepository, 'find')
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

    expect(async () => {
      await sut.validateCreation(fakeRecommendation);
    }).rejects.toThrow('Invalid name or link');
  });

  it('should return User is already registered', async () => {
    jest
      .spyOn(recommendationRepository, 'find')
      .mockReturnValueOnce([{ id: 2 }]);

    const fakeRecommendation = createFakeRecommendation();

    jest
      .spyOn(newRecommendationSchema, 'validate')
      .mockReturnValueOnce({ error: false });

    expect(async () => {
      await sut.validateCreation(fakeRecommendation);
    }).rejects.toThrow('Recommendation is already registered.');
  });
});
