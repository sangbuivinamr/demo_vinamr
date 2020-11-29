//Packages
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


// react-router-dom
import RawData from "../pages/app/module_4/RawData";
import PreviewAssets from "../pages/app/module_4/PreviewAssets";
const MainRoute = () => {
  return (
    <Router basename="/demo">
      <Switch>
          <Route exact path="/preview" component = {PreviewAssets}/>
          <Route exact path="/" component = {RawData}/>
      </Switch>
    </Router>
  );
};

export default MainRoute;
