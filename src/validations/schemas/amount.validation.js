import joi from 'joi';

const amountSchema = joi.number().integer().min(1).max(100).required();

export default amountSchema;
