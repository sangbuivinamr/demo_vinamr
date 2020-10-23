import React, { Component } from 'react';

import { BrowserRouter as Router, Link, Route , IndexRedirect, Switch } from "react-router-dom";
import IndexClass from './modules/index'

class App extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <Router basename = '/demo'>
        <Route exact path="/" component={IndexClass} />
		  </Router>
	  );
    
  }
}
export default App;
