import axios from "axios";
import { userHeader, vendorHeader } from "./header";

const base_url = "http://localhost:5000/api/";

// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken;
// console.log(TOKEN);

// const vendor = JSON.parse(localStorage.getItem("persist:root"))?.vendor;
// const currentVendor = vendor && JSON.parse(vendor).currentVendor;
// const vendorToken = currentVendor?.accessToken;
// console.log(vendorToken);

export const publicRequest = axios.create({
  baseURL: base_url,
});

export const userRequest = axios.create({
  baseURL: base_url,
  headers: userHeader(),
});

export const vendorRequest = axios.create({
  baseURL: base_url,
  headers: vendorHeader(),
});
