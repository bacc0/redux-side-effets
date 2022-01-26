import { uiActions } from "./ui-slice";
import { cartAction } from "./cart-slice";
//   custom Action 

export const fetchCartData = () => {

     return (dispatch) => {
          (async () => {
               try {
                    const response = await fetch('https://redux-side-effects-default-rtdb.europe-west1.firebasedatabase.app/cart.json');
                    if (response.ok) {
                         const data = await response.json();
                         dispatch(cartAction.replaceCart({
                              items: data.items || [],
                              totalQuantity: data.totalQuantity,
                              totalPrice: data.totalPrice
                         }));
                    };
               } catch (error) {
                    alert(error)
                    dispatch(uiActions.showNotification({
                         status: 'error',
                         title: 'ERROR',
                         message: `Fetching cart DATA failed. ( ${error} )`,
                    }));
               }
          })()
     };
};



export const sentCartData = (cart) => {

     return (dispatch) => {

          dispatch(uiActions.showNotification({
               status: 'pending',
               title: 'Sending...',
               message: 'Sending cart data.',
          }));

          (async () => {
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
                    };

               } catch (error) {
                    dispatch(uiActions.showNotification({
                         status: 'error',
                         title: 'ERROR',
                         message: `Sending DATA failed. ( ${error} )`,
                    }));
               }
          })();

          setTimeout(() => {
               dispatch(uiActions.showNotification({
                    status: 'done',
               }));
          }, 2500);
     };
};