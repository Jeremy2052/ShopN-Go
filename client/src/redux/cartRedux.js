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
      const item = state.products.find((p) => p._id === action.payload._id);
      if (item) {
        state.products.map((item) => (item._id === action.payload._id ? (item.quantity += action.payload.quantity) : item));
        state.quantity += action.payload.quantity;
        state.total += action.payload.price * action.payload.quantity;
      } else {
        state.quantity += action.payload.quantity;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
      }
    },

    resetCart: (state) => {
      state.quantity = 0;
      state.products = [];
      state.total = 0;
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter((item) => item._id !== action.payload.productId);
      state.quantity -= action.payload.quantity;
      state.total -= action.payload.total;
    },
  },
});

export const { addProduct, resetCart, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
