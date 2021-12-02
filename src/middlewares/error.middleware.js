import { GeneralError } from '../utils/errors.js';

function handleErrors(error, req, res, next) {
  console.log(error);
  if (error instanceof GeneralError) {
    return res.status(error.getCode()).send(error.message);
  }

  res.sendStatus(500);
}

export default handleErrors;
