import loadable from "@loadable/component";

import App from "controllers/App/App";

const routes = [
  {
    component: App,
    routes: [
      {
        path: "/transaction-history",
        exact: true,
        component: loadable(() =>
          import("controllers/TransactionHistory/TransactionHistory")
        ),
      },
    ],
  },
];

export default routes;
