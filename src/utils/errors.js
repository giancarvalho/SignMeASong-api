/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */

class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    }
    if (this instanceof NotFound) {
      return 404;
    }
    if (this instanceof NotAuthorized) {
      return 401;
    }
    if (this instanceof Conflict) {
      return 409;
    }
    return 500;
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class NotAuthorized extends GeneralError {}
class Conflict extends GeneralError {}

export { GeneralError, BadRequest, NotFound, NotAuthorized, Conflict };
