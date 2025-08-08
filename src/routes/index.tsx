import type { RouteObject } from 'react-router-dom';
import Login from '../pages/Login';
import RoleSelection from '../pages/RoleSelection';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <div />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/select-role',
    element: <RoleSelection />,
  },
  // Add more routes here as needed
];
