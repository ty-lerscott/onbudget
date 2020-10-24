import React, { useState } from "react";
import "./App.css";

import { lineItems, categories } from "./data";

import { Header, HeaderName } from "carbon-components-react";

import Page from "./components/Page/Page";
import AddExpense from "./components/AddExpense/AddExpense";
import MoneySpent from "./components/MoneySpent/MoneySpent";
import MonthDisplay from "./components/MonthDisplay/MonthDisplay";
import OverviewChart from "./components/OverviewChart/OverviewChart";
import ExpenseOverview from "./components/ExpenseOverview/ExpenseOverview";
import CategoryBreakdown from "./components/CategoryBreakdown/CategoryBreakdown";

function App() {
  const [month, setMonth] = useState(new Date());

  const expenses = lineItems.filter((item) =>
    Object(item).hasOwnProperty("paidOn")
  );
  const incomes = lineItems.filter((item) =>
    Object(item).hasOwnProperty("depositedOn")
  );

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
          <MoneySpent expenses={expenses} month={month} />
          <ExpenseOverview
            expenses={expenses}
            incomes={incomes}
            month={month}
          />
        </div>

        <OverviewChart
          expenses={expenses}
          categories={categories}
          month={month}
        />

        <div className="monthAndAdd">
          <MonthDisplay month={month} setMonth={setMonth} />
          <AddExpense />
        </div>

        <CategoryBreakdown
          month={month}
          expenses={expenses}
          categories={categories}
        />
      </Page>
    </div>
  );
}

export default App;
