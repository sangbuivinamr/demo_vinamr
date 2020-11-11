import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import QuotaManagement from '../pages/app/module_2/QuotaManagement';

// react-router-dom

const MainRoute = () => {
  return (
    <Router basename = '/demo'>
        <Switch> 
            <Route exact path="/" component={QuotaManagement} />
        </Switch>
    </Router>
  );
};

export default MainRoute;
