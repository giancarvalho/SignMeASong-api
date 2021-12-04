import * as recommendationService from '../../src/services/recommendation.service.js';
import * as recommendationRepository from '../../src/repositories/recommendation.repository.js';
import * as recommendationValidation from '../../src/validations/recommendation.validation.js';
import createFakeRecommendation from '../factories/recommendation.factory.js';
import { NotFound } from '../../src/utils/errors.js';

const sut = recommendationService;
describe('unit test for create recommendationService', () => {
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

describe('Unit tests for upvote recommendation service', () => {
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

    const promise = sut.upvote(1);

    await expect(promise).rejects.toThrowError(NotFound);
  });
});

describe('Unit tests for downvote recommendation service', () => {
  jest
    .spyOn(recommendationRepository, 'deleteRecommendation')
    .mockReturnValue('deleted');

  jest
    .spyOn(recommendationRepository, 'insertDownvote')
    .mockReturnValue('inserted');

  it('should return true if downvote is inserted', async () => {
    const returnedData = { id: 1, upvoteCount: 3, downvoteCount: 6 };
    jest
      .spyOn(recommendationRepository, 'getScore')
      .mockReturnValueOnce(returnedData);

    const result = await sut.downvote(1);

    expect(result).toBe('inserted');
  });

  it('should throw Recommendation not found if recommendation to be downvoted is not found', async () => {
    jest.spyOn(recommendationRepository, 'getScore').mockReturnValueOnce();

    const promise = sut.downvote(1);

    await expect(promise).rejects.toThrowError(NotFound);
  });

  it('should delete the recomendation if score is equal or less than -5', async () => {
    const returnedData = { id: 1, upvoteCount: 0, downvoteCount: 4 };
    jest
      .spyOn(recommendationRepository, 'getScore')
      .mockReturnValueOnce(returnedData);

    const result = await sut.downvote(1);

    expect(result).toBe('deleted');
  });
});
