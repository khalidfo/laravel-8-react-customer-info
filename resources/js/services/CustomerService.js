import Axios from "axios";
import { DOMAIN_URL, PUBLIC_URL } from "../constants";


export const getCustomerList = async () => {
  return await Axios.get(`${DOMAIN_URL}${PUBLIC_URL}api/customers`).then(
    (res) => {
      return res.data;
    }
  );
};

/**
 * storeNewCustomer()
 *
 * @param {object} data
 */
export const storeNewCustomer = async (data) => { 
  
  console.log("data: ", data);
  

  return await Axios.post(
    `${DOMAIN_URL}${PUBLIC_URL}api/customers`,
    data
  ).then((res) => {
    return res.data;
  });
};

export const updateCustomer = async (id, data) => {
  //console.log("", id, data)
  return await Axios.put(
    `${DOMAIN_URL}${PUBLIC_URL}api/customers/${id}`,
    data
  ).then((res) => {
    return res.data;
  });
};

export const deleteCustomer = async (id) => {
  //console.log("id", id);
  return await Axios.delete(
    `${DOMAIN_URL}${PUBLIC_URL}api/customers/${id}`
  ).then((res) => {
    return res.data;
  });
};
