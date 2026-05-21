class AppError extends Error {
  public statusCode: number;
  public success: boolean;

    //  isOperational: boolean;

  constructor(message: string, statusCode: number, ) {
    super(message);

    this.statusCode = statusCode;
    this.success = false;
  
    // this.isOperational = true;


    Error.captureStackTrace(this, this.constructor);
  }
}
class BadRequestError extends AppError {
  constructor(message = "BAD_REQUEST", ) {
    super(message, 400,);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = "UNAUTHORIZED" , ) {
    super(message, 401);
  }
}

class ForbiddenError extends AppError {
  constructor(message = "FORBIDDEN" , ) {
    super(message, 403);
  }
}

class NotFoundError extends AppError {
  constructor(message = "NOT_FOUND" , ) {
    super(message, 404);
  }
}
class ConflictError extends AppError{
  constructor(message="ALREADY_EXITS",){
    super(message,500);
  }
}
class TooManyRequest extends AppError{
  constructor(message="TOO_MANY_REQUESTS", ){
    super(message,403)
  }
}
export {
  AppError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError ,
  TooManyRequest
};