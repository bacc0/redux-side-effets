import { useSelector } from 'react-redux';

import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {


     const cartItems = useSelector(state =>
          state.cart.items
     );
     const totalPrice = useSelector(state =>
          state.cart.totalPrice
     )

     return (
          <Card className={classes.cart}>
               <div className={classes.cart_head}>
                    <h2>Your Shopping Cart </h2>
                    <h2> ${totalPrice.toFixed(2)}</h2>
               </div>
               <ul>

                    {cartItems.map(item => (

                         <CartItem
                              key={item.id}
                              item={{
                                   id: item.id,
                                   title: item.name,
                                   quantity: item.quantity,
                                   totalPriceForArticle: item.totalPriceForArticle,
                                   price: item.price,
                              }}
                         />
                    ))}
               </ul>
          </Card>
     );
};

export default Cart;
