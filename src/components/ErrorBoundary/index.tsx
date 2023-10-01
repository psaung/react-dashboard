// @src/components/ErrorBoundary.jsx
import { useEffect, useState } from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorBoundary = () => {
  const routerError = useRouteError();
  const [error, setError] = useState('');

  useEffect(() => {
    if (isRouteErrorResponse(routerError)) {
      setError(routerError.statusText);
    } else if (routerError instanceof Error) {
      setError(routerError.message);
    } else if (typeof routerError === 'string') {
      setError(routerError);
    } else {
      setError('Unknown error');
    }
  }, [routerError]);

  return (
    <section>
      <h1>Error Boundary</h1>
      <small>{error}</small>
    </section>
  );
};

export default ErrorBoundary;
