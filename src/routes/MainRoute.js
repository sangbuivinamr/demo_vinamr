import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import QuotaManagement from '../pages/app/module_2/mode_expression/QuotaManagement';
import QuotaEditing from "../pages/app/module_2/mode_editing/QuotaEditing";
import QuotaTracking from "../pages/app/module_2/mode_tracking/QuotaTracking";
// react-router-dom

const MainRoute = () => {
  return (
    <Router basename = '/demo'>
        <Switch> 
            <Route exact path="/editing" component={QuotaEditing}/>
            <Route exact path="/tracking" component={QuotaTracking} />
            <Route exact path="/" component={QuotaManagement} />
        </Switch>
    </Router>
  );
};

export default MainRoute;
