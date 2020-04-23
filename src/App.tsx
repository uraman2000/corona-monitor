import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import AppBarComponent from "./Components/AppBarComponent";
import ContriesComponent from "./Components/ContriesComponent";
import { CountriesContextProvider } from "./Context/CountriesContext";

export default function App() {
  return (
    <>
      <CountriesContextProvider>
        <Router>
          <Switch>
            <AppBarComponent>
              <Route path="/" component={Home} />
              <Route path="/country/:country" component={ContriesComponent} />
            </AppBarComponent>

            {/* 
          <Route path="*" component={PageNotFound} /> */}
          </Switch>
        </Router>
      </CountriesContextProvider>
    </>
  );
}
