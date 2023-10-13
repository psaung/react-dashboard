import { Outlet } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authState } from '../../../store/authAtom';
import { useAccess } from '../../../hooks/useAccess';

export default function AppLayout() {
  const [, toggleLoggedIn] = useAtom(authState);
  useAccess('User');

  return (
    <>
      <h3>App</h3>
      <button
        onClick={() =>
          toggleLoggedIn({
            User: 'Mg Mg',
            isLoggedIn: true,
            role: 'Admin',
          })
        }
      >
        Toggle
      </button>
      <Outlet />
    </>
  );
}
