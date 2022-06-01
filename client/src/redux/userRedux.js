import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    // set initial state of user
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    registerUser: (action) => {
      console.log(action.payload);
    },

    loginStart: (state) => {
      state.isFetching = true;
    },

    loginSuccess: (state, action) => {
      // if api request to login is successful, update user with the action payload (response)
      state.isFetching = false;
      state.currentUser = action.payload;
    },

    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    logout: (state) => {
      state.currentUser = null;
    },

    updateStart: (state) => {
      state.isFetching = true;
    },

    updateUserDetails: (state, action) => {
      state.isFetching = false;
      const { firstName, lastName, email, phone } = action.payload;
      state.currentUser = {
        ...state.currentUser,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
      };
      state.error = false;
    },

    updateFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  registerUser,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateStart,
  updateUserDetails,
  updateFailure,
} = userSlice.actions; // export actions used to update state
export default userSlice.reducer; // export reducer to be used in store
