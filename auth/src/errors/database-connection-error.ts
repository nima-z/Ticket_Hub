import { CustomError } from "./custom-error";
//============================================================================
export class DatabaseConnectionError extends CustomError {
  reason = "Error on connecting to database";
  statusCode = 500;

  constructor() {
    super("Error on connecting to database");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializedErrors() {
    return [{ message: this.reason }];
  }
}
