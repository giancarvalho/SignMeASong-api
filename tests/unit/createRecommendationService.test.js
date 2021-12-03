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

  it('should return true if upvote is inserted', async () => {
    jest
      .spyOn(recommendationRepository, 'insertUpvote')
      .mockReturnValueOnce(true);

    jest
      .spyOn(recommendationRepository, 'findById')
      .mockReturnValueOnce({ id: 1 });

    const result = await sut.upvote(1);

    expect(result).toBeTruthy();
  });

  it('should throw Recommendation not found if recommendation to be upvoted is not found', async () => {
    jest
      .spyOn(recommendationRepository, 'insertUpvote')
      .mockReturnValueOnce(true);

    jest.spyOn(recommendationRepository, 'findById').mockReturnValueOnce();

    expect(async () => {
      await sut.upvote(1);
    }).rejects.toThrow('Recommendation not found');
  });
});
