import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import QuotaManagement from "../pages/app/module_2/mode_expression/QuotaManagement";
import QuotaEditing from "../pages/app/module_2/mode_editing/QuotaEditing";
import QuotaTracking from "../pages/app/module_2/mode_tracking/QuotaTracking";
import QuotaExceeded from "../pages/app/module_2/mode_when_exceeded/QuotaExceeded";
import QuotaInterview from "../pages/app/module_2/mode_interview/QuotaInterview";
import RawData from "../pages/app/module_4/RawData";
// react-router-dom

const MainRoute = () => {
  return (
    <Router basename="/demo">
      <Switch>
          <Route exact path="/editing" component={QuotaEditing} />
          <Route exact path="/exceeded" component={QuotaExceeded} />
          <Route exact path="/tracking" component={QuotaTracking} />
          <Route exact path="/interview" component={QuotaInterview} />
          <Route exact path="/" component = {QuotaManagement}/>
          <RawData exact path = "/rawData"/>
      </Switch>
    </Router>
  );
};

export default MainRoute;
