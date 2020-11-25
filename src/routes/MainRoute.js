import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RawData from "../pages/app/module_4/RawData";
// react-router-dom

const MainRoute = () => {
  return (
    <Router basename="/demo">
      <Switch>
          <Route exact path="/" component = {RawData}/>
      </Switch>
    </Router>
  );
};

export default MainRoute;
