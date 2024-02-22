import { Fragment, Key, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import HomeLayout from "../layout/home-layout";
import EmptyLayout from "../layout/empty-layout";

import SuspenseScreen from "./suspense-screen";
import React from "react";
import SubscriptionAndAuthWrapper from "./guards/SubscriptionAndAuthWrapper";
import RequireAuth from "./guards/require-auth";
// import AuthLayout from "../layout/auth-layout";
// import useAuth from "../utils/context/auth-context";

function Router() {
  const routes: any = [
    {
      path: "/",
      layout: EmptyLayout,
      routes: [{ element: lazy(() => import("../pages/sign-in")) }],
    },
    {
      path: "/sign-up",
      layout: EmptyLayout,
      routes: [{ element: lazy(() => import("../pages/sign-up")) }],
    },
    {
      path: "/account",
      layout: HomeLayout,
      guard: SubscriptionAndAuthWrapper,
      routes: [{ element: lazy(() => import("../pages/account")) }],
    },
    {
      path: "/plans",
      layout: HomeLayout,
      guard: RequireAuth,
      routes: [{ element: lazy(() => import("../pages/plans")) }],
    },

    { path: "*", element: lazy(() => import("./404")) },

    // {
    //   path: "/lesson",
    //   layout: HomeLayout,
    //   guard: AuthGuard,
    //   routes: [
    //     {
    //       path: ":lid",
    //       element: lazy(() => import("../pages/courses/lesson/index")),
    //     },
    //     { element: lazy(() => import("../pages/courses")) },
    //   ],
    // },

    // {
    //   path: "/auth",
    //   layout: AuthLayout,
    //   // guard: ReversGuard,
    //   routes: [
    //     {
    //       path: "forget-password",
    //       element: lazy(() => import("../pages/auth/forget-password")),
    //     },
    //     { path: "login", element: lazy(() => import("../pages/auth/login")) },
    //     {
    //       path: "register",
    //       element: lazy(() => import("../pages/auth/register")),
    //     },
    //     { element: lazy(() => import("../pages/tutors")) },
    //   ],
    // },
  ];

  const routeRender = (
    route: {
      element: any;
      guard: any;
      layout: any;
      path: string;
      routes: any[];
    },
    i: Key | null | undefined
  ) => {
    const Element = route.element ? route.element : Fragment;
    const Guard = route.guard ? route.guard : Fragment;
    const Layout = route.layout ? route.layout : Fragment;
    const isIndex: boolean = route.path ? false : true;
    let props: any = {};
    if (isIndex) {
      props["index"] = true;
    } else {
      props["path"] = route.path;
    }
    return (
      <Route
        key={i}
        {...props}
        // // index={isIndex}
        // path={route.path}
        element={
          <Guard>
            <Layout>
              <Suspense fallback={<SuspenseScreen />}>
                <Element />
              </Suspense>
            </Layout>
          </Guard>
        }
      >
        {route.routes && route.routes.map(routeRender)}
      </Route>
    );
  };
  return <Routes>{routes.map(routeRender)}</Routes>;
}

export default Router;
