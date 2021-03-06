import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
     name: 'cart',
     initialState: {
          items: [],
          totalQuantity: 0,
          totalPrice: 0,
          isChanged: false
     },
     reducers: {
          replaceCart(state, action) {
               state.totalQuantity = action.payload.totalQuantity;
               state.items = action.payload.items;
               state.totalPrice = action.payload.totalPrice;
          },
          addItemToCart(state, action) {
               const newItem = action.payload;

               const existingItem = state.items.find(item => item.id === newItem.id);

               state.totalQuantity++;
               state.totalPrice += newItem.price;
               state.isChanged = true;

               if (!existingItem) {
                    state.items.push({
                         id: newItem.id,
                         price: newItem.price,
                         quantity: 1,
                         totalPriceForArticle: newItem.price,
                         name: newItem.title
                    });
               }
               else {
                    existingItem.quantity++;
                    existingItem.totalPriceForArticle += newItem.price;
               };
          },
          removeItemToCart(state, action) {

               const removedItem = action.payload;
               const existingItem = state.items.find(item => item.id === removedItem.id)
              
               state.totalQuantity--;
               state.totalPrice -= removedItem.price;
               state.isChanged = true;

               if (existingItem.quantity === 1) {
                    state.items = state.items.filter(item => item.id !== removedItem.id)
               }
               else {
                    existingItem.quantity--;
                    existingItem.totalPriceForArticle -= removedItem.price;
               }
          }
     }
});





export const cartAction = cartSlice.actions;

export default cartSlice;