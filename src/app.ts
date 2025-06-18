// src/app.ts
import express from 'express';
import { StatusCodes } from 'http-status-codes';
// import { NotFoundError } from './utils/error'; // You can keep this or remove if not directly used by 404 handler
import { errorHandler } from './middleware/errorHandler';

// Import the API v1 router from your routes index file
import apiV1Router from './routes/v1'; // This now points to src/routes/index.ts

const app = express();

app.use(express.json());

// Mount the API v1 router under the '/api/v1' base path
app.use('/ws-ecommerce/v1', apiV1Router); // Changed from /ecommerce/v1 to /api/v1 for common practice

// Catch-all for undefined routes


// app.all('*', (req, res) => { // This is the ONLY active app.all block
//     res.status(StatusCodes.NOT_FOUND).json({
//         status: 'error',
//         message: `Can't find ${req.originalUrl} on this server!`,
//         code: StatusCodes.NOT_FOUND
//     });
// })


// Global Error Handling Middleware
app.use(errorHandler);

export default app;









// src/app.ts
// import express from 'express';
// import { StatusCodes } from 'http-status-codes';
// import { NotFoundError } from './utils/error'; // Make sure this is uncommented
// import { errorHandler } from './middleware/errorHandler';

// import apiV1Router from './routes/v1'; // Or whatever your correct path is now

// const app = express();

// app.use(express.json());

// // app.use('/ecommerce/v1', apiV1Router); // Your main API routes

// // --- Catch-all for undefined routes (404 Not Found) ---
// // This should now work without the TypeError
// // app.all('*', (req, res, next) => {
// //     next(new NotFoundError(`Can't find ${req.originalUrl} on this server!`));
// // });
// app.get('/health', (req, res) => {
//     res.send('Server is alive and custom routes are disabled.');
// });
// // --- Global Error Handling Middleware (MUST be last) ---
// app.use(errorHandler);

// export default app;

// import express from 'express';
// import { StatusCodes } from 'http-status-codes'; // Might be needed by routes
// import apiV1Router from './routes/v1'; // Or whatever your correct path is now

// const app = express();
// app.use(express.json());

// app.get('/health', (req, res) => { // Keep this test route
//     res.send('Server is alive, main router re-enabled.');
// });

// app.use('/ecommerce/v1', apiV1Router); // UNCOMMENTED

// // app.all('*', (req, res, next) => { ... }); // KEPT COMMENTED
// // app.use(errorHandler); // KEPT COMMENTED

// export default app;