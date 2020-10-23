import React from "react";
import "./App.css";

import { expenses, categories } from "./data";

import {
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from "carbon-components-react";

import Page from "./components/Page/Page";
import OverviewChart from "./components/OverviewChart/OverviewChart";
import MoneySpent from "./components/MoneySpent/MoneySpent";

function App() {
  return (
    <div className="App">
      <Header aria-label="On Budget">
        <HeaderName prefix="" href="#">
          OnBudget
        </HeaderName>
        {/* TODO: User Login */}
        {/* <HeaderGlobalBar>
			<HeaderGlobalAction aria-label="Search" onClick={action('search click')}>
				<Search20 />
			</HeaderGlobalAction>
		</HeaderGlobalBar> */}
      </Header>
      <Page>
        <MoneySpent expenses={expenses} />
        <OverviewChart expenses={expenses} categories={categories} />
      </Page>
    </div>
  );
}

export default App;
