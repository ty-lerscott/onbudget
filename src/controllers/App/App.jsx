import cn from "classnames";
import { connect } from "react-redux";
import { renderRoutes } from "react-router-config";
import React, { useState, useRef, useEffect } from "react";
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
import { isAuthenticated } from "state/selectors/UserSelectors";

import "./Header.scss";

const App = ({ route, logout, isSignedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isMenuOpen) {
      console.log(dropdownRef.current);
      dropdownRef.current.focus();
    }
  }, [isMenuOpen]);

  if (!route?.routes) {
    return null;
  }

  const handleOpenPanel = () => {
    setIsMenuOpen(true);
  };

  const handleClosePanel = () => {
    setIsMenuOpen(false);
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
          OnBudget
        </HeaderName>
        <HeaderGlobalBar>
          {isSignedIn && (
            <HeaderGlobalAction
              aria-label="Search"
              className="ProfileAction"
              onClick={handleOpenPanel}
            >
              <FaceMask24 className="Icon" />
            </HeaderGlobalAction>
          )}
        </HeaderGlobalBar>

        <div className="DropdownMenu">
          <ul
            ref={dropdownRef}
            className={cn("menu", { "menu--opened": isMenuOpen })}
            onBlur={handleClosePanel}
          >
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

const mapStateToProps = (state) => ({
  isSignedIn: isAuthenticated(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
