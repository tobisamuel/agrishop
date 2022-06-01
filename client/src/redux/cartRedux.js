import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1; // increase cart quantity when uses clicks adds to cart button
      state.products.push(action.payload); // update products state with added product
      state.total += action.payload.price * action.payload.quantity; // update price state
    },

    addDirect: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },

    removeProduct: {
      reducer(state, action) {
        state.quantity -= 1;
        const index = state.products.findIndex(
          (product) => product.cart_id === action.payload.cart_id
        );
        state.products.splice(index, 1);
        state.total -= action.payload.price * action.payload.quantity;
      },
    },

    resetCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },

    increaseQuantity: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.cart_id === action.payload.cart_id
      );
      state.products[index].quantity += 1;
      state.total += action.payload.price;
    },

    reduceQuantity: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.cart_id === action.payload.cart_id
      );
      if (state.products[index].quantity > 1) {
        state.products[index].quantity -= 1;
        state.total -= action.payload.price;
      }
    },
  },
});

export const {
  addProduct,
  addDirect,
  removeProduct,
  increaseQuantity,
  reduceQuantity,
  resetCart,
} = cartSlice.actions; // export actions used to update state
export default cartSlice.reducer; // export reducer to be used in store
