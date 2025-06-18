import { StatusCodes } from 'http-status-codes';

export class AppError extends Error {
    statusCode: number;
    status: string; // <-- Add this property
    isOperational: boolean; // Indicates if the error is expected and handled gracefully

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        // Determine status based on status code (e.g., 'fail' for 4xx, 'error' for 5xx)
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // <-- Add this line
        this.isOperational = true; // Most custom errors are operational

        // Capture stack trace for better debugging, excluding the constructor call itself
        Error.captureStackTrace(this, this.constructor);
    }
}

// Specific Custom Errors (These are all fine as they extend AppError correctly)
export class BadRequestError extends AppError {
    constructor(message: string = "Bad Request") {
        super(message, StatusCodes.BAD_REQUEST); // 400
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = "Unauthorized") {
        super(message, StatusCodes.UNAUTHORIZED); // 401
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = "Forbidden") {
        super(message, StatusCodes.FORBIDDEN); // 403
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = "Not Found") {
        super(message, StatusCodes.NOT_FOUND); // 404
    }
}

export class ConflictError extends AppError {
    constructor(message: string = "Conflict") {
        super(message, StatusCodes.CONFLICT); // 409
    }
}

export class InternalServerError extends AppError {
    constructor(message: string = "Internal Server Error") {
        super(message, StatusCodes.INTERNAL_SERVER_ERROR); // 500
        this.isOperational = false; // Usually indicates an unexpected server-side issue
    }
}