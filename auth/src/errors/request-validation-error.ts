import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

const DEFAULT_ERROR_REASON = 'Invalid request params';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super(DEFAULT_ERROR_REASON);
    console.log('new RequestValidationError');

    // Only because we are extending a built-in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => ({
      message: err.msg,
      field: err.type === 'field' ? err.path : undefined,
    }));
  }
}
