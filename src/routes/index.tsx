import type { RouteObject } from 'react-router-dom';
import Login from '../pages/Login';



export const routes: RouteObject[] = [
  {
    path: '/',
    element: <div />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  // Add more routes here as needed
];
