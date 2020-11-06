import loadable from "@loadable/component";

import App from "controllers/App/App";

// import AdminRoutes from 'routes/admin';
// import WorkoutRoutes from 'routes/workout';

const routes = [
  {
    component: App,
    routes: [
      {
        path: "/",
        exact: true,
        component: loadable(() => import("controllers/Home/Home")),
      },
    ],
  },
];

export default routes;
