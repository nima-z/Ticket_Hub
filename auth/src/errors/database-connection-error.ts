export class DatabaseConnectionError extends Error {
  reason = "Error on connecting to database";
  constructor() {
    super();
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
