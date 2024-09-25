import { AuthErrorCodes } from "./types";

export class AppError extends Error {
  code: string;
  status: number;

  constructor(code: string, message: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
    this.name = "AppError";
  }
}

export class Forbidden extends AppError {
  constructor(message: string, code: number = 403) {
    super(AuthErrorCodes.NotPermission, message, code);
  }
}

export class InternalError extends AppError {
  constructor(message: string = "INTERNAL_ERROR", code: number = 500) {
    super(AuthErrorCodes.GeneralError, message, code);
  }
}

export class Unauthorized extends AppError {
  constructor(message: string, code: number = 401) {
    super(AuthErrorCodes.WrongCredentials, message, code);
  }
}

export class BadRequest extends AppError {
  constructor(message: string, code: number = 400) {
    super(AuthErrorCodes.BadRequest, message, code);
  }
}

export class Conflict extends AppError {
  constructor(message: string, resource?: string, code: number = 409) {
    super(`${resource ?? ""}${AuthErrorCodes.Conflict}`, message, code);
  }
}

export class MethodNotAllowed extends AppError {
  constructor(message: string, code: number = 405) {
    super(AuthErrorCodes.MethodNotAllowed, message, code);
  }
}
