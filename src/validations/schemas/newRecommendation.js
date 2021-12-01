import joi from 'joi';

const youtubeUrlPattern = `(?:https?:\\/\\/)?(?:www\\.)?youtu\\.?be(?:\\.com)?\\/?.*(?:watch|embed)?(?:.*v=|v\\/|\\/)([\\w\\-_]+)\\&?`;

const newRecommendationSchema = joi.object({
  name: joi.string().min(3).max(60).required(),
  youtubeLink: joi.string().pattern(RegExp(youtubeUrlPattern)).required(),
});

export default newRecommendationSchema;
