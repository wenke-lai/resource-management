import type { RouteObject } from "react-router-dom";
import { Navigate, createBrowserRouter } from "react-router-dom";

const authGuard = async () => {
  try {
    return { ok: true };
  } catch (err) {
    throw err;
  }
};

const routes: RouteObject[] = [
  {
    path: "/",
    loader: authGuard,
    element: <div>Home Page</div>,
    errorElement: <Navigate to="/auth" />,
  },
  {
    path: "/auth",
    element: <>Auth</>,
  },
];

export const router = createBrowserRouter(routes);
