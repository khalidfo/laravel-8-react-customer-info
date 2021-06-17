import React from "react";
import { Card, Button, Badge, Spinner, Form } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";
import { DOMAIN_URL, PUBLIC_URL } from "../../../constants";
import {
  storeNewCustomer,
  updateCustomer,
} from "../../../services/CustomerService";


class CustomerEdit extends React.Component {
  
  

  state = {    
    id: this.props.match.params.id,
    name: "",
    address: "",
    customer: {},        
    isLoading: false,    
    toggleEditCustomer: false,    
    errors: {},
  };

  componentDidMount() {
    this.getCustomerDetails();
  }

  getCustomerDetails = () => {
    this.setState({ isLoading: true });
    Axios.get(
      `${DOMAIN_URL}${PUBLIC_URL}api/customers/${this.state.id}`
    ).then((res) => {
      console.log( res);
      this.setState({                
        customer: res.data.data,
        name: res.data.data.name,
        address: res.data.data.address,
        isLoading: false,
      });
    });
  };

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitForm = async (e) => {
    //console.log("Customer this.props: " + this.props)
    e.preventDefault();
    const { history } = this.props;

    this.setState({ isLoading: true });

    const postBody = {
      name: this.state.name,
      address: this.state.address,      
    };    
    
    const response = await updateCustomer(this.state.id, postBody);
    
    if (response.success) {
      this.setState({
        name: "",
        address: "",
        isLoading: false,
      });
      //this.props.onCompleteCustomerEdit();
      history.push(`${PUBLIC_URL}customers`);
    } else {
      this.setState({
        errors: response.errors,
        isLoading: false,
      });
    }
  };

  render() {
    return (
      <>
        <Card>
          <Card.Body>
            <Form onSubmit={this.submitForm}>             
                  <Form.Group controlId="name">
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter customer name"
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
                      placeholder="Enter customer address"                      
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

export default withRouter(CustomerEdit);
