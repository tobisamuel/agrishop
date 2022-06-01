import {
  loginStart,
  loginSuccess,
  loginFailure,
  updateStart,
  updateUserDetails,
  updateFailure,
} from "./userRedux";
import {
  vendorRegister,
  vendorLoginStart,
  vendorLoginSuccess,
  vendorLoginFailure,
  updateVendorDetails,
} from "./vendorRedux";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";

import {
  addOrderStart,
  addOrderSuccess,
  addOrderFailure,
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailure,
} from "./orderRedux";
import { publicRequest, userRequest, vendorRequest } from "../api/index";

// USER API CALLS
export const registerUser = async (dispatch, user) => {
  try {
    console.log(user);
    const res = await publicRequest.post("/register", user);
    dispatch(registerUser(res.data));
  } catch (error) {}
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const editUser = async (user_id, dispatch, user) => {
  dispatch(updateStart());
  try {
    const res = await userRequest.put(`users/update/${user_id}`, user);
    dispatch(updateUserDetails(res.data));
  } catch (error) {
    updateFailure();
  }
};

// VENDOR API CALLS
export const vendorLogin = async (dispatch, user) => {
  dispatch(vendorLoginStart());
  try {
    const res = await publicRequest.post("vendors/login", user);
    dispatch(vendorLoginSuccess(res.data));
  } catch (error) {
    dispatch(vendorLoginFailure());
  }
};

export const registerVendor = async (dispatch, user) => {
  try {
    const res = await publicRequest.post("vendors/register", user);
    dispatch(vendorRegister(res.data));
  } catch (error) {}
};

export const editVendor = async (vendor_id, dispatch, user) => {
  try {
    const res = await vendorRequest.put(`vendors/update/${vendor_id}`, user);
    dispatch(updateVendorDetails(res.data));
  } catch (error) {}
};

// PRODUCT API CALLS
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await vendorRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    console.log(err);

    dispatch(addProductFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await vendorRequest.get(`products/vendor`);
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    const res = await vendorRequest.put(`/products/update/${id}`, product);
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await vendorRequest.delete(`/products/delete/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

// ORDERS API CALLS
export const addOrder = async (order, dispatch) => {
  dispatch(addOrderStart());
  try {
    const res = await userRequest.post(`/orders`, order);
    dispatch(addOrderSuccess(res.data));
  } catch (err) {
    console.log(err);

    dispatch(addOrderFailure());
  }
};

export const getOrders = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await userRequest.get(`orders/user`);
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};
