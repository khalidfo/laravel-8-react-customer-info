import React, { Component } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { Container } from "react-bootstrap";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

//Component
import CustomerList from "./pages/customers/CustomerList";
import CustomerCreate from "./pages/customers/CustomerCreate";
import CustomerEdit from "./pages/customers/CustomerEdit";

import { PUBLIC_URL } from "../constants";

/**
 * 
 */
class App extends Component {
  state = {
    user: {},
    isLoggedIn: false,
  };

  /**
   * 
   */
  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <Router>
          <Header authData={this.state} />
          <div>
            <Container className="p-4">
              <Switch>
                <Route
                  path={`${PUBLIC_URL}about`}
                  exact={true}
                  component={About}
                />
                <Route
                  path={`${PUBLIC_URL}contact`}
                  exact={true}
                  component={Contact}
                />
                <Route
                  path={`${PUBLIC_URL}customers`}
                  exact={true}
                  component={CustomerList}
                />
                <Route
                  path={`${PUBLIC_URL}customers/create`}                  
                  component={CustomerCreate}
                /> 
                <Route
                  path={`${PUBLIC_URL}customers/edit/:id`}                  
                  exact={true}
                  component={CustomerEdit}
                />                 

                <Route path={`${PUBLIC_URL}`} exact={true} component={Home} />
              </Switch>

              <Footer />
            </Container>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

if (document.getElementById("app")) {
  ReactDOM.render(<App />, document.getElementById("app"));
}
