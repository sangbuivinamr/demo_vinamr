import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import QuotaManagement from '../pages/app/module_2/mode_epression/QuotaManagement';
import QuotaEditing from '../pages/app/module_2/mode_editing/QuotaEdting';
// react-router-dom

const MainRoute = () => {
  return (
    <Router basename = '/demo'>
        <Switch> 
            <Route exact path="/editing" component={QuotaEditing}/>
            <Route exact path="/" component={QuotaManagement} />
        </Switch>
    </Router>
  );
};

export default MainRoute;
