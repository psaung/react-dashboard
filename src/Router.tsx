import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/index.tsx';
import ErrorBoundary from './components/ErrorBoundary/index.tsx';
import AppLayout from './components/App/AppLayout/index.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        lazy: () => import('./pages/Home/index.tsx'),
      },
      {
        path: 'app',
        element: <AppLayout />,
        children: [
          {
            handle: '*',
            index: true,
            lazy: () => import('./pages/App'),
          },
          {
            handle: '*',
            path: 'profile',
            lazy: () => import('./pages/App/Profile'),
          },
        ],
      },
    ],
  },
]);
