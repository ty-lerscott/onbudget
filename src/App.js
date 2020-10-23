import React from "react";
import "./App.css";

import { expenses, categories, balance } from "./data";

import { Header, HeaderName } from "carbon-components-react";

import Page from "./components/Page/Page";
import MoneySpent from "./components/MoneySpent/MoneySpent";
import ExpenseOverview from "./components/ExpenseOverview/ExpenseOverview";
import OverviewChart from "./components/OverviewChart/OverviewChart";

function App() {
  return (
    <div className="App">
      <Header aria-label="On Budget">
        <HeaderName prefix="" href="#">
          OnBudget
        </HeaderName>
        {/* TODO: User Login */}
      </Header>
      <Page>
        <div className="cashFlow">
          <MoneySpent expenses={expenses} />
          <ExpenseOverview expenses={expenses} balance={balance} />
        </div>

        <OverviewChart expenses={expenses} categories={categories} />
      </Page>
    </div>
  );
}

export default App;
