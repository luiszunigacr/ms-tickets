import { CustomError } from './custom-error';

const DEFAULT_ERROR_REASON = 'Error connecting to database';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = DEFAULT_ERROR_REASON;

  constructor() {
    super(DEFAULT_ERROR_REASON);
    console.log('new DatabaseConnectionError');

    // Only because we are extending a built-in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
