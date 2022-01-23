import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import cartSlice from './cart-slice'


// console.warn(uiSlice.reducer)
// console.warn(cartSlice.reducer) 

const store = configureStore({
     reducer: {
          ui: uiSlice.reducer,
          cart: cartSlice.reducer
     }
});

export default store;