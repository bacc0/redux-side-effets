import { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sentCartData } from './store/cart-slice';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {

     const dispatch = useDispatch();
     const showCart = useSelector(state => state.ui.cartIsVisible);
     const cart = useSelector(state => state.cart);
     const notification = useSelector(state => state.ui.notification);

     useEffect(() => {
          if ( !isInitial) {
               dispatch(sentCartData(cart));
          } else {
               isInitial = false;
          }
     }, [cart, dispatch]);


     return (
          <Fragment>
               {notification && notification.status !== 'done' && (
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
