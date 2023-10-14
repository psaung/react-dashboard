import { Outlet } from 'react-router-dom';
import { useAccess } from '../../../hooks/useAccess';
import { useAuth } from '../../../hooks/useAuth';

export default function AppLayout() {
  const { onLogin } = useAuth();

  useAccess('User');

  return (
    <>
      <h3>App</h3>
      <button
        onClick={() =>
          onLogin({
            user: 'Mg Mg',
            isLoggedIn: true,
            role: 'Admin',
            token: 'Abc'
          })
        }
      >
        Toggle
      </button>
      <Outlet />
    </>
  );
}
