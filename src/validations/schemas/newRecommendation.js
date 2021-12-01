import joi from 'joi';

const youtubeUrlPattern =
  '~(?:https?://)?(?:www.)?youtu(?:be.com/watch?(?:.*?&(?:amp;)?)?v=|.be/)([w-]+)(?:&(?:amp;)?[w?=]*)?~';

const newRecommendationSchema = joi.object({
  name: joi.string().min(3).max(60).required(),
  youtubeLink: joi.string().pattern(youtubeUrlPattern).required(),
});

export default newRecommendationSchema;
