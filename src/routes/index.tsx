import type { RouteObject } from 'react-router-dom';
import Landing from '../pages/Landing';
import Login from '../pages/auth/Login';
import RoleSelection from '../pages/auth/RoleSelection';
import VerifyEmail from '../pages/auth/VerifyEmail';
import Orders from '../pages/Orders';
import Scanner from '../pages/Scanner';
import ManagerDashboard from '../pages/ManagerDashboard';
import { OrderDetails } from '../pages/OrderDetails';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

export const routes: RouteObject[] = [
  // Public routes
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/auth/login',
    element: <Login />,
  },
  {
    path: '/auth/select-role',
    element: <RoleSelection />,
  },
  {
    path: '/auth/verify-email',
    element: <VerifyEmail />,
  },
  
  // Protected routes - require authentication
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute requireRole="manager">
        <ManagerDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/orders',
    element: (
      <ProtectedRoute>
        <Orders />
      </ProtectedRoute>
    ),
  },
  {
    path: '/scanner',
    element: (
      <ProtectedRoute>
        <Scanner />
      </ProtectedRoute>
    ),
  },
  {
    path: '/orders/:orderId',
    element: (
      <ProtectedRoute>
        <OrderDetails />
      </ProtectedRoute>
    ),
  },
  
  // Legacy redirects for old auth routes
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/select-role',
    element: <RoleSelection />,
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />,
  }
];
