import type { RouteObject } from 'react-router-dom';
import Landing from '../pages/Landing';
import Login from '../pages/auth/Login';
import RoleSelection from '../pages/auth/RoleSelection';
import VerifyEmail from '../pages/auth/VerifyEmail';
import Orders from '../pages/Orders';
import Scanner from '../pages/Scanner';
import ManagerDashboard from '../pages/ManagerDashboard';
import { OrderDetails } from '../pages/OrderDetails';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Landing />,
  },
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
  },
  {
    path: '/dashboard',
    element: <ManagerDashboard />,
  },
  {
    path: '/orders',
    element: <Orders />,
  },
  {
    path: '/scanner',
    element: <Scanner />,
  },
  {
    path: '/orders/:orderId',
    element: <OrderDetails />,
  }
  // Add more routes here as needed
];
