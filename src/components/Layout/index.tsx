import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <h3>Layout</h3>
      <Outlet />
    </>
  );
}
