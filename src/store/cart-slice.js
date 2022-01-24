import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
     name: 'cart',
     initialState: {
          items: [],
          totalQuantity: 0,
          totalPriceForArticle: 0,
          totalPrice: 0  //
     },
     reducers: {
          addItemToCart(state, action) {
               const newItem = action.payload;

               const existingItem = state.items.find(item => item.id === newItem.id);

               state.totalQuantity++;

               state.totalPrice += newItem.price;  //

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

               state.totalPrice -= removedItem.price;  //

               if (existingItem.quantity === 1) {
                    state.items = state.items.filter(item => item.id !== removedItem.id)
               }
               else {
                    existingItem.quantity--;
                    existingItem.totalPriceForArticle -= removedItem.price;
               }
          },
     }
});



export const sentCartData = (cart) => {

     return async (dispatch) => {

          dispatch(uiActions.showNotification({
               status: 'pending',
               title: 'Sending...',
               message: 'Sending cart data.',
          }));

          const sendCartData = async () => {

               try {
                    const response = await fetch('https://redux-side-effects-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
                         method: 'PUT',
                         body: JSON.stringify(cart)
                    });

                    if (response.ok) {
                         dispatch(uiActions.showNotification({
                              status: 'success',
                              title: 'Success...',
                              message: 'Sent cart data Successfully.',
                         }));
                    }
               }
               catch (error) {
                    dispatch(uiActions.showNotification({
                         status: 'error',
                         title: 'ERROR',
                         message: `Sending DATA failed. ( ${error} )`,
                    }));
               }
          };
          sendCartData();

          setTimeout(() => {
               dispatch(uiActions.showNotification({
                    status: 'done',
               }));
          }, 2500);
     };
};

export const cartAction = cartSlice.actions;

export default cartSlice;