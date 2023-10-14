import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout.tsx";
import ErrorBoundary from "./components/ErrorBoundary/index.tsx";
import AppLayout from "./components/Layout/AppLayout.tsx";
import AuthLayout from "./components/Layout/AuthLayout.tsx";

export const appRoutes: any = [
  {
    path: "app",
    element: <AppLayout />,
    handle: "*",
    children: [
      {
        index: true,
        path: "/app/",
        name: "Dashboard",
        lazy: () => import("./pages/App"),
      },
      {
        path: "/app/profile",
        name: "Profile",
        lazy: () => import("./pages/App/Profile"),
      },
      {
        handle: "admin",
        name: "Users",
        path: "/app/user",
        lazy: () => import("./pages/App/User"),
      },
    ],
  },
] as const;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        lazy: () => import("./pages/Home/index.tsx"),
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            lazy: () => import("./pages/Auth/Login"),
          },
        ],
      },
      ...appRoutes,
    ],
  },
]);
