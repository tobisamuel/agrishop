import { createSlice } from "@reduxjs/toolkit";

const vendorSlice = createSlice({
  name: "vendor",
  initialState: {
    // set initial state of user
    currentVendor: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    VendorRegister: (action) => {
      console.log(action.payload);
    },

    vendorLoginStart: (state) => {
      state.isFetching = true;
    },

    vendorLoginSuccess: (state, action) => {
      // if api request to login is successful, update user with the action payload (response)
      state.isFetching = false;
      state.currentVendor = action.payload;
    },

    vendorLoginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    vendorLogout: (state) => {
      state.currentVendor = null;
    },

    updateVendorDetails: (state, action) => {
      const {
        firstName,
        lastName,
        email,
        phone,
        businessName,
        businessAddress,
      } = action.payload;
      state.currentVendor = {
        ...state.currentVendor,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        businessName: businessName,
        businessAddress: businessAddress,
      };
      console.log(action.payload);
    },
  },
});

export const {
  vendorRegister,
  vendorLoginStart,
  vendorLoginSuccess,
  vendorLoginFailure,
  vendorLogout,
  updateVendorDetails,
} = vendorSlice.actions; // export actions used to update state
export default vendorSlice.reducer; // export reducer to be used in store
