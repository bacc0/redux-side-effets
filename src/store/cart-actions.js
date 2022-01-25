// import { ReactReduxContext } from "react-redux";
import { uiActions } from "./ui-slice";
import { cartAction } from "./cart-slice";


export const fetchCartData = () => {
     return async (dispatch) => {
          const fetchCartInfo = async () => {
               try {
                    const response = await fetch('https://redux-side-effects-default-rtdb.europe-west1.firebasedatabase.app/cart.json');

                    if (!response.ok) {
                         throw new Error('Could not fetch cart data!')
                    };
                    const data = await response.json();
// console.log(' totalQuantity: data.totalQuantity',  data.totalQuantity)
                    dispatch(cartAction.replaceCart({
                         items: data.items || [],
                         totalQuantity: data.totalQuantity,
                         totalPrice: data.totalPrice 
                    }))

//////////

               } catch (error) {
                    dispatch(uiActions.showNotification({
                         status: 'error',
                         title: 'ERROR',
                         message: `Fetching cart DATA failed. ( ${error} )`,
                    }));
               }
          };
      fetchCartInfo();
     };
};



export const sentCartData = (cart) => {

     return async (dispatch) => {

          dispatch(uiActions.showNotification({
               status: 'pending',
               title: 'Sending...',
               message: 'Sending cart data.',
          }));

          const sendCartInfo = async () => {
               try {
                    const response = await fetch('https://redux-side-effects-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
                         method: 'PUT',
                         body: JSON.stringify(cart)
                    });

                    if (response.ok) {
                         dispatch(uiActions.showNotification({
                              status: 'success',
                              title: 'Success...',
                              message: `Sent cart data Successfully. __ STATUS: ${response.status}`,
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
          sendCartInfo();

          setTimeout(() => {
               dispatch(uiActions.showNotification({
                    status: 'done',
               }));
          }, 2500);
     };
};