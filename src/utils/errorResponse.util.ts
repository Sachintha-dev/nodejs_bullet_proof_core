class ErrorResponse extends Error {
  statusCode: number;
  errorCode: string;

  constructor(
    message: string,
    statusCode: number,
    errorCode: string = "UNKNOWN_ERROR"
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorResponse;
