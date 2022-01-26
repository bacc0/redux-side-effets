import { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sentCartData, fetchCartData } from './store/cart-actions';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
<<<<<<< HEAD

     const dispatch = useDispatch();
     const showCart = useSelector(state => state.ui.cartIsVisible);
     const cart = useSelector(state => state.cart);
     const notification = useSelector(state => state.ui.notification);

=======
     //new comment VS Code
     const dispatch = useDispatch();
     const showCart = useSelector((state) => state.ui.cartIsVisible);
     const cart = useSelector((state) => state.cart);
     const notification = useSelector((state) => state.ui.notification);

     // console.log('cart', cart)
>>>>>>> parent of 9baa9b3 (thanks SAND)
     useEffect(() => {
          dispatch(fetchCartData());
     }, [dispatch]);

     useEffect(() => {
<<<<<<< HEAD
          if ( !isInitial) {
=======
          if (!isInitial) {
>>>>>>> parent of 9baa9b3 (thanks SAND)
               dispatch(sentCartData(cart));
          } else {
               isInitial = false;
          }
     }, [cart, dispatch]);

<<<<<<< HEAD

     return (
          <Fragment>
               {notification && notification.status !== 'done' && (
=======
     return (
          <Fragment>
               {notification && notification.status !== "done" && (
>>>>>>> parent of 9baa9b3 (thanks SAND)
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
          </Fragment>
     );
}

export default App;
