import App from "controllers/App/App";

// import AdminRoutes from 'routes/admin';
import AuthRoutes from "routes/authentication";

const routes = [
  {
    component: App,
    routes: AuthRoutes,
  },
];

export default routes;
