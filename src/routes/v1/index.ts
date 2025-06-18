// src/routes/index.ts
import { Router } from 'express';

// Import all your individual route modules using ES Module syntax
import userRoutes from '../v1/user.routes';
// import dashboardRoute from './dashboard.route';
// import facilityRoute from './facility.route';
// import invoiceRoute from './invoice.route';
// import paymentRoute from './payment.route';
// import planRoute from './plan.route';
// import uploadRoute from './upload.route';
// import ratingsRoute from './ratings.route';

// Define an interface for route configuration for better type safety
interface RouteConfig {
  path: string;
  route: Router;
}

// Create an Express router for this index file
const router: Router = Router();

// Define default routes with associated route modules
// Keep them in alphabetical order for maintainability
const defaultRoutes: RouteConfig[] = [
  { path: '/auth', route: userRoutes },
//   { path: '/dashboard', route: dashboardRoute },
//   { path: '/facility', route: facilityRoute },
//   { path: '/invoice', route: invoiceRoute },
//   { path: '/payment-requests', route: paymentRoute },
//   { path: '/plan', route: planRoute },
//   { path: '/uploads', route: uploadRoute },
//   { path: '/ratings', route: ratingsRoute }
];

// Use each default route with its associated route module
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// Export the router for use in app.ts
export default router;