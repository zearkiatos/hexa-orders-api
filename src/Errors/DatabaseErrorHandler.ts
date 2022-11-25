const INTERNAL_SERVER_ERROR = 500;

class DatabaseErrorHandler extends Error {
  statusCode: number;
  constructor(message: string, statusCode = INTERNAL_SERVER_ERROR) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, DatabaseErrorHandler.prototype);
  }

  getErrorMessage() {
    return `Something was wrong with the database: ${this.message}`;
  }
}

export default DatabaseErrorHandler;