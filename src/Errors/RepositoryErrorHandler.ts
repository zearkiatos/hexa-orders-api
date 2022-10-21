const INTERNAL_SERVER_ERROR = 500;

class RepositoryErrorHandler extends Error {
  statusCode: number;
  constructor(message: string, statusCode = INTERNAL_SERVER_ERROR) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, RepositoryErrorHandler.prototype);
  }

  getErrorMessage() {
    return `Something was wrong with the queue: ${this.message}`;
  }
}

export default RepositoryErrorHandler;
