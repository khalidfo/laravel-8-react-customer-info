import React from "react";
import { Card, Button, Badge, Spinner, Form } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";
import { PUBLIC_URL } from "../../../constants";
import { storeNewCustomer } from "../../../services/CustomerService";

class CustomerCreate extends React.Component {
  state = {
    isLoading: false,
    name: "",
    address: "",
    errors: {},
  };

  componentDidMount() {}

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  
  submitForm = async (e) => {
    e.preventDefault();
    const { history } = this.props;

    this.setState({ isLoading: true });
    const postBody = {
      name: this.state.name,
      address: this.state.address,
    };
    const response = await storeNewCustomer(postBody);
    if (response.success) {
      this.setState({
        name: "",
        address: "",
        isLoading: false,
      });
      history.push(`${PUBLIC_URL}customers`);
    } else {
      console.log("response.errors", response.errors);
      this.setState({
        errors: response.errors,
        isLoading: false,
      });
    }
  };

  render() {
    return (
      <>
        <div className="header-part">
          <div className="float-left">
            <h2>New Customer</h2>
          </div>
          <div className="float-right">
            <Link to={`${PUBLIC_URL}customers`} className="btn btn-info">
              See All Customers
            </Link>
          </div>
          <div className="clearfix"></div>
        </div>

        <Card>
          <Card.Body>
            <Form onSubmit={this.submitForm}>
              <Form.Group controlId="name">
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Customer Name"
                  value={this.state.name}
                  name="name"
                  onChange={(e) => this.changeInput(e)}
                />
              </Form.Group>
              {this.state.errors && this.state.errors.name && (
                <p className="text-danger">{this.state.errors.name[0]}</p>
              )}

              <Form.Group controlId="address">
                <Form.Label>Customer Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Customer Address"                 
                  name="address"
                  value={this.state.address}
                  onChange={(e) => this.changeInput(e)}
                />
              </Form.Group>
              {this.state.errors && this.state.errors.address && (
                <p className="text-danger">
                  {this.state.errors.address[0]}
                </p>
              )}

              {this.state.isLoading && (
                <Button variant="primary" type="button" disabled>
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>{" "}
                  Saving...
                </Button>
              )}

              {!this.state.isLoading && (
                <Button variant="primary" type="submit">
                  Save Customer
                </Button>
              )}
            </Form>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default withRouter(CustomerCreate);
