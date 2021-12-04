import * as recommendationService from '../../src/services/recommendation.service.js';
import * as recommendationRepository from '../../src/repositories/recommendation.repository.js';
import * as recommendationValidation from '../../src/validations/recommendation.validation.js';
import * as amountValidation from '../../src/validations/amount.validation.js';
import {
  createFakeRecommendation,
  createRecommendationsAboveTenPoints,
  createRecommendationsBelowTenPoints,
} from '../factories/recommendation.factory.js';
import chooseRandomItem from '../../src/utils/getRandomItem.js';
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
    const returnedData = { id: 1, score: -5 };
    jest
      .spyOn(recommendationRepository, 'getScore')
      .mockReturnValueOnce(returnedData);

    const result = await sut.downvote(1);

    expect(result).toBe('deleted');
  });
});

describe('Unit tests for getRandom recommendation service', () => {
  const mockedChooseRandomItem = jest.fn(chooseRandomItem);

  it('should throw NotFound if there isnt any recommendation registered', async () => {
    const returnedData = [];
    jest
      .spyOn(recommendationRepository, 'getRandom')
      .mockReturnValueOnce(returnedData);

    const promise = sut.getRandom();

    await expect(promise).rejects.toThrowError(NotFound);
  });

  it('should get a random item if there isnt any recommendations above 10', async () => {
    const returnedData = createRecommendationsBelowTenPoints();

    jest
      .spyOn(recommendationRepository, 'getRandom')
      .mockReturnValueOnce(returnedData);

    mockedChooseRandomItem.mockReturnValueOnce(returnedData[1]);

    const result = await sut.getRandom();

    expect(result.youtubeLink).toBe(returnedData[1].youtubeLink);
  });

  it('should get an item from recommendationAboveTenPoints array', async () => {
    const recommendationsAboveTenPoints = createRecommendationsAboveTenPoints();
    const recommendationsBelowTenPoints = createRecommendationsBelowTenPoints();
    const returnedData = recommendationsAboveTenPoints.concat(
      recommendationsBelowTenPoints
    );

    jest
      .spyOn(recommendationRepository, 'getRandom')
      .mockReturnValueOnce(returnedData);

    jest.spyOn(global.Math, 'random').mockReturnValueOnce(0.301);

    const result = await sut.getRandom();

    expect(result.name).toBe('above ten points');
  });

  it('should get an item from recommendationBelowTenPoints array', async () => {
    const recommendationsAboveTenPoints = createRecommendationsAboveTenPoints();
    const recommendationsBelowTenPoints = createRecommendationsBelowTenPoints();
    const returnedData = recommendationsAboveTenPoints.concat(
      recommendationsBelowTenPoints
    );

    jest
      .spyOn(recommendationRepository, 'getRandom')
      .mockReturnValueOnce(returnedData);

    jest.spyOn(global.Math, 'random').mockReturnValueOnce(0.299);

    const result = await sut.getRandom();

    expect(result.name).toBe('below ten points');
  });
});

describe('unit test for getTopSongs recommendationService', () => {
  it('should return an object with top 10 songs ordered by score', async () => {
    const recommendations = createRecommendationsAboveTenPoints();
    const sortedRecommendations = recommendations.sort(
      (a, b) => b.score - a.score
    );

    const returnedValue = sortedRecommendations;

    jest
      .spyOn(recommendationRepository, 'getTopSongs')
      .mockReturnValueOnce(returnedValue);
    jest.spyOn(amountValidation, 'validate').mockReturnValueOnce();

    const result = await sut.getTopSongs(10);

    expect(result[0]).toMatchObject(sortedRecommendations[0]);
    expect(result.length).toBe(10);
  });
});
