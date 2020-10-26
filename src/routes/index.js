import loadable from "@loadable/component";

import App from "../controllers/App/App";

// import AdminRoutes from 'routes/admin';
// import WorkoutRoutes from 'routes/workout';

export default [
  {
    component: App,
    routes: [
      {
        path: "/",
        exact: true,
        component: loadable(() => import("../controllers/Home/Home")),
      },
    ],
  },
];
