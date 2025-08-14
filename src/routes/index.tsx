import type { RouteObject } from 'react-router-dom';
import Login from '../pages/auth/Login';
import RoleSelection from '../pages/auth/RoleSelection';
import VerifyEmail from '../pages/auth/VerifyEmail';
import Orders from '../pages/Orders';
import { OrderDetails } from '../pages/OrderDetails';

export const routes: RouteObject[] = [
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
    path: '/orders',
    element: <Orders />,
  },
  {
    path: '/orders/:orderId',
    element: <OrderDetails />,
  },
  {
    path: '/',
    element: <RoleSelection />,
  }
  // Add more routes here as needed
];
