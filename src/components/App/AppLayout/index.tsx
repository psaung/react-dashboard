import { Outlet } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authState, isUserLoggedIn } from '../../../store/authAtom';

export default function AppLayout() {
  const [isLoggedIn] = useAtom(isUserLoggedIn);
  const [, toggleLoggedIn] = useAtom(authState);

  return (
    <>
      <h3>App</h3>
      <button
        onClick={() =>
          toggleLoggedIn({
            User: 'Mg Mg',
            isLoggedIn: !isLoggedIn,
          })
        }
      >
        Toggle
      </button>
      <Outlet />
    </>
  );
}
