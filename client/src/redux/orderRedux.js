import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //CREATE
    addOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },

    addOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders.push(action.payload);
    },

    addOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //GET ALL
    getOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },

    getOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders = action.payload;
    },

    getOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // //DELETE
    // deleteProductStart: (state) => {
    //   state.isFetching = true;
    //   state.error = false;
    // },

    // deleteProductSuccess: (state, action) => {
    //   state.isFetching = false;
    //   state.products.splice(
    //     state.products.findIndex((item) => item._id === action.payload),
    //     1
    //   );
    // },

    // deleteProductFailure: (state) => {
    //   state.isFetching = false;
    //   state.error = true;
    // },

    //UPDATE
    updateOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateOrderSuccess: (state, action) => {
      state.isFetching = false;
      const index = state.orders.findIndex(
        (item) => item._id === action.payload.id
      );
      const { name, description, price, inStock, vendor, img } = action.payload;
      state.orders[index] = {
        ...state.orders[index],
        name: name,
        description: description,
        price: price,
        inStock: inStock,
        vendor: vendor,
        img: img,
      };
    },
    updateOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  addOrderStart,
  addOrderSuccess,
  addOrderFailure,
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailure,
} = orderSlice.actions;

export default orderSlice.reducer;
