// src/middleware/validateRequest.ts
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { BadRequestError } from '../utils/error';
import logger from '../utils/logger';

export const validate = (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            // Parse all relevant parts of the request
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next(); // Validation successful, proceed to the next middleware/controller
        } catch (error) {
            if (error instanceof ZodError) {
                // Format Zod errors for a cleaner response
                const errors = error.errors.map(err => ({
                    path: err.path.join('.'),
                    message: err.message,
                }));
                logger.warn(`Validation failed for request: ${JSON.stringify(errors)}`);
                // Throw a BadRequestError for validation failures
                next(new BadRequestError(`Validation failed: ${JSON.stringify(errors)}`));
            } else {
                // Pass any other unexpected errors to the global error handler
                next(error);
            }
        }
    };