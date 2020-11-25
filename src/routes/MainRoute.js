import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import QuotaManagement from '../pages/app/module_2/mode_expression/QuotaManagement';
import QuotaExceeded from "../pages/app/module_2/mode_when_exceeded/QuotaExceeded";
import QuotaInterview from "../pages/app/module_2/mode_interview/QuotaInterview";
// react-router-dom

const MainRoute = () => {
  return (
    <Router basename = '/demo'>
        <Switch> 
            <Route exact path="/exceeded" component={QuotaExceeded}/>
            <Route exact path="/interview" component={QuotaInterview} />
            <Route exact path="/" component={QuotaManagement} />
        </Switch>
    </Router>
  );
};

export default MainRoute;
