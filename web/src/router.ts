import { createBrowserRouter, RouteObject } from "react-router";
import DefaultLayout from "./pages/DefaultLayout";
import HomePage from "./pages/HomePage";
import UnauthorizedPage from "./pages/error/UnauthorizedPage";
import ForbiddenPage from "./pages/error/ForbiddenPage";
import NotFoundPage from "./pages/error/NotFoundPage";
import ServerErrorPage from "./pages/error/ServerErrorPage";
import GatewayErrorPage from "./pages/error/GatewayErrorPage";
import ServiceUnavailablePage from "./pages/error/ServiceUnavailablePage";
import PrototypeListPage from "./pages/PrototypeListPage";
import PrototypeDetailPage from "./pages/PrototypeDetailPage";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: DefaultLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/prototype-list-page",
        Component: PrototypeListPage,
      },
      {
        path: "/prototype-detail-page",
        Component: PrototypeDetailPage,
      },
      {
        path: "/error/unauthorized",
        Component: UnauthorizedPage,
      },
      {
        path: "/error/forbidden",
        Component: ForbiddenPage,
      },
      {
        path: "/error/not-found",
        Component: NotFoundPage,
      },
      {
        path: "/error/server-error",
        Component: ServerErrorPage,
      },
      {
        path: "/error/bad-gateway",
        Component: GatewayErrorPage,
      },
      {
        path: "/error/service-unavailable",
        Component: ServiceUnavailablePage,
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
