import React from "react";
import { renderRoutes } from "react-router-config";
import { Header, HeaderName } from "carbon-components-react";

import AppLoading from "components/Loading/AppLoading";
import NotificationCenter from "components/NotificationCenter/NotificationCenter";

const App = ({ route }) =>
  !!route?.routes && (
    <main className="App">
      <Header aria-label="On Budget">
        <HeaderName prefix="" href="#">
          On Budget
        </HeaderName>
      </Header>
      <NotificationCenter />
      <AppLoading />

      {renderRoutes(route.routes)}
    </main>
  );

export default App;
