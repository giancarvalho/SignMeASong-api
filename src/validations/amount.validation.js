import amountSchema from './schemas/amount.validation.js';
import { BadRequest } from '../utils/errors.js';

function validate(amount) {
  const validation = amountSchema.validate(amount);

  if (validation.error) {
    throw new BadRequest('Amount must be an integer above 1 and below 100');
  }
}

export { validate };
