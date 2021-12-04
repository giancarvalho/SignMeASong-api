import { BadRequest } from '../../src/utils/errors.js';
import * as amountValidation from '../../src/validations/amount.validation.js';
import faker from 'faker';

const sut = amountValidation;
describe('unit test for amountValidation', () => {
  it('should throw a BadRequest if amount is not sent', () => {
    expect(sut.validate).toThrowError(BadRequest);
  });

  it('should throw a BadRequest if amount is invalid', () => {
    const amount = faker.datatype.float();

    expect(() => {
      sut.validate(amount);
    }).toThrowError(BadRequest);
  });

  it('should not throw a BadRequest if amount is valid', () => {
    expect(() => {
      sut.validate(amount);
    }).not.toThrowError(BadRequest);
  });
});
