import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(message: string) {
    super(message);

    // Only because we are extending a built-in class
    Object.setPrototypeOf(this, BadRequestError.prototype);

    this.message = message;
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [
      {
        message: this.message,
      },
    ];
  }
}
