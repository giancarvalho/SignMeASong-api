import faker from 'faker';

function createFakeRecommendation() {
  const fakeRecommendation = {
    name: faker.lorem.words(),
    youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  };

  return fakeRecommendation;
}

export default createFakeRecommendation;
