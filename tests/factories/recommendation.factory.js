import faker from 'faker';

function createFakeRecommendation() {
  const fakeRecommendation = {
    name: faker.lorem.words(),
    youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  };

  return fakeRecommendation;
}

function createRecommendationsBelowTenPoints() {
  const recommendationArray = [];
  for (let i = 0; i < 10; i += 1) {
    const recommendation = createFakeRecommendation();

    recommendationArray.push({
      id: i,
      name: 'below ten points',
      youtubeLink: recommendation.youtubeLink,
      score: faker.datatype.number({ min: -5, max: 10 }),
    });
  }

  return recommendationArray;
}

function createRecommendationsAboveTenPoints() {
  const recommendationArray = [];
  for (let i = 0; i < 10; i += 1) {
    const recommendation = createFakeRecommendation();

    recommendationArray.push({
      name: 'above ten points',
      link: recommendation.youtubeLink,
      score: faker.datatype.number({ min: 15, max: 500 }),
      id: i,
    });
  }

  return recommendationArray;
}

export {
  createFakeRecommendation,
  createRecommendationsBelowTenPoints,
  createRecommendationsAboveTenPoints,
};
