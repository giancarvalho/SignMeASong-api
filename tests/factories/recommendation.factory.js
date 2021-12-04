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
      upvoteCount: faker.datatype.number(10),
      downvoteCount: faker.datatype.number(5),
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
      upvoteCount: faker.datatype.number({ min: 15, max: 50 }),
      downvoteCount: 0,
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
