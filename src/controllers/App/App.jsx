import cn from "classnames";
import { connect } from "react-redux";
import React, { useState } from "react";
import { renderRoutes } from "react-router-config";
import {
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from "carbon-components-react";

import { FaceMask24 } from "@carbon/icons-react";

import AppLoading from "components/Loading/AppLoading";
import NotificationCenter from "components/NotificationCenter/NotificationCenter";

import { logoutAction } from "components/SignIn/SignInActions";
import "./Header.scss";

const App = ({ route, logout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!route?.routes) {
    return null;
  }

  const handleTogglePanel = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const signOut = () => {
    logout();
    setIsMenuOpen(false);
  };

  const todo = () => {
    console.warn("todo");
  };

  return (
    <main className="App">
      <Header aria-label="On Budget" className="Header">
        <HeaderName prefix="" href="#">
          On Budget
        </HeaderName>
        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label="Search"
            className="ProfileAction"
            onClick={handleTogglePanel}
          >
            <FaceMask24 className="Icon" />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
        <div className="DropdownMenu">
          <ul className={cn("menu", { "menu--opened": isMenuOpen })}>
            <li className="ListItem">
              <button className="TextButton" onClick={signOut}>
                Sign Out
              </button>
            </li>
            <li className="ListItem Disabled">
              <button className="TextButton" onClick={todo}>
                Settings [COMING SOON]
              </button>
            </li>
          </ul>
        </div>
      </Header>
      <NotificationCenter />
      <AppLoading />

      {renderRoutes(route.routes)}
    </main>
  );
};

const mapDispatchToProps = {
  logout: logoutAction,
};

export default connect(null, mapDispatchToProps)(App);
