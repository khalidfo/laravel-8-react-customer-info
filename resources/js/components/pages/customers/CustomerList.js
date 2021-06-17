import React from "react";
import {
  Card,
  Button,
  Badge,
  Spinner,
  Form,
  InputGroup,
  FormControl,
  Alert,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import { PUBLIC_URL } from "../../../constants";
import {
  deleteCustomer,
  getCustomerList,
} from "../../../services/CustomerService";

/**
 * 
 */
class CustomerList extends React.Component {
  state = {
    customerList: [],
    searchCustomerList: [],
    isLoading: false,
    searchText: "",
  };  

  
  componentDidMount() {
    this.getCustomerLists();
    console.log("this.props", this.props);
  }

  getCustomerLists = async () => {
    this.setState({ isLoading: true });
    const response = await getCustomerList();
    if (response.success) {
      this.setState({
        customerList: response.data,
        searchCustomerList: response.data,
        isLoading: false,
      });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  };

  delete = async (id) => {
    if (window.confirm('Are you sure you wish to delete?')) {
      const response = await deleteCustomer(id);
      if (response.success) {
        this.getCustomerLists();
      } else {
        alert("Something went wrong.");
      }
    } 
  };

  onSearchCustomers = (e) => {
    const searchText = e.target.value;
    this.setState({
      isLoading: true,
    });
    if (searchText.length > 0) {
      const searchData = this.state.customerList.filter(function (item) {
        const itemData = item.name + " " + item.description;
        const textData = searchText.trim().toLowerCase();
        return itemData.trim().toLowerCase().indexOf(textData) !== -1;
      });
      this.setState({
        searchCustomerList: searchData,
        searchText: searchText,
        isLoading: false,
      });
    } else {
      this.setState({
        searchText,
      });
      this.getCustomerLists();
    }
  };

  render() {
    return (
      <>
        <div className="header-part">
          <div className="float-left">
            <h2>
              Customer List{" "}
              <Badge variant="primary">
                {this.state.searchCustomerList.length}
              </Badge>
            </h2>
          </div>
          <div className="float-left text-center ml-5">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search Customers"
                aria-label="Search Customers"
                aria-describedby="basic-addon2"
                onChange={(e) => this.onSearchCustomers(e)}
              />
            </InputGroup>
          </div>
          <div className="float-right">
            <Link to={`${PUBLIC_URL}customers/create`} className="btn btn-info">
              + Create New
            </Link>
          </div>
          <div className="clearfix"></div>
        </div>
        {this.state.isLoading && (
          <div className="text-center mt-5">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}

        {this.state.searchCustomerList.length === 0 && (
          <Alert variant={"warning"}>
            No data found.
          </Alert>
        )}
        
        {<Table responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>  
              <th>Actions</th>  
            </tr>
          </thead>
          <tbody>
            {
              this.state.searchCustomerList.map((customer, index)=>
              <tr key={index}>
                <th>{customer.name}</th>
                <th>{customer.address}</th>
                <th>
                  <Link
                    to={`${PUBLIC_URL}customers/edit/${customer.id}`}
                    className="btn btn-outline-primary mr-2">
                    Edit
                  </Link>
                  <Button
                  variant="outline-danger"
                  className="mr-2"
                  onClick={() => this.delete(customer.id)}>
                  Delete
                </Button>
                </th>  
              </tr>
              )
            }
          </tbody>
        </Table> }
      </>
    );
  }
}

export default CustomerList;
