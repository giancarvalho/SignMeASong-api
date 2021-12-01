import newRecommendationSchema from './schemas/newRecommendation';

function validateCreation(data) {
  const validation = newRecommendationSchema.validate(data);

  if (validation.error) return { isInvalid: true, errorCode: 400 };

  return { isInvalid: false };
}

export { validateCreation };
