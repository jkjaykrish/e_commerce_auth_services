// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { AppError, InternalServerError } from '../utils/error';
import logger from '../utils/logger';
import configuration from '../config/config';
import { StatusCodes } from 'http-status-codes';

// Global error handling middleware
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // Log the error for debugging purposes
    logger.error(`Error: ${err.message}`, {
        stack: err.stack,
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
        timestamp: new Date().toISOString(),
        // Add more context as needed (e.g., user ID)
    });

    if (err instanceof AppError) {
        // Handle custom operational errors (e.g., BadRequestError, ConflictError, NotFoundError)
         res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            code: err.statusCode,
            // In development, you might include:
            ...(configuration.env=== 'development' && { stack: err.stack })
        });
    } else {
        // Handle unexpected programming errors or non-operational errors
        // Do NOT leak sensitive error details in production
        const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        const message = 'Something went wrong!'; // Generic message for unexpected errors

         res.status(statusCode).json({
            status: 'error',
            message: message,
            code: statusCode,
            // Only send stack trace in development for debugging
            ...(configuration.env === 'development' && { stack: err.stack })
        });
    }
};