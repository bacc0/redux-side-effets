import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice'
import Notification from './components/UI/Notification'


let isInitial = true;


function App() {

     const dispatch = useDispatch();

     const showCart = useSelector(state => state.ui.cartIsVisible)

     const cart = useSelector(state => state.cart);
     const notification = useSelector(state => state.ui.notification);





     useEffect(() => {

          if (isInitial) {

               isInitial = false;
               return;


          } else {
               const sendCartData = async () => {
                    dispatch(uiActions.showNotification({
                         status: 'pending',
                         title: 'Sending...',
                         message: 'Sending cart data.',
                    }));
                    const response = await fetch('https://redux-side-effects-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
                         {
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

               sendCartData().catch(error => {
                    dispatch(uiActions.showNotification({
                         status: 'error',
                         title: 'Error...!',
                         message: `Sending cart data Failed. (${error})`,
                    }));
               })

          }
     }, [cart]);


     return (
          <>
               {notification && (
                    <Notification
                         status={notification.status}
                         title={notification.title}
                         message={notification.message}
                    />

               )}

               <Layout>
                    {showCart && <Cart />}
                    <Products />
               </Layout>
          </>
     );
}

export default App;
