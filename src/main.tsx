import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/fira-mono';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router.tsx';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // disable retries if something was fail
      retry: false,

      // disable window focus to refetch
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
