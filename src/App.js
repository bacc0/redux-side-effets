import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sentCartData, fetchCartData } from "./store/cart-actions";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  //new comment VS Code ..thanks SAND
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  // console.log('cart', cart)
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (!isInitial) {
      dispatch(sentCartData(cart));
    } else {
      isInitial = false;
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && notification.status !== "done" && (
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
