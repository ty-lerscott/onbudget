import React from "react";
import { renderRoutes } from "react-router-config";
import { Header, HeaderName } from "carbon-components-react";

const App = ({ route }) =>
  !!route?.routes && (
    <main className="App">
      <Header aria-label="On Budget">
        <HeaderName prefix="" href="#">
          OnBudget
        </HeaderName>
        {/* TODO: User Login */}
      </Header>

      {renderRoutes(route.routes)}
    </main>
  );

export default App;
