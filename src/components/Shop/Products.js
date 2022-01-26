import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCT = [
     {
          id: 'p1📌',
          price: 6.33,
          title: 'My 🦁🦁🦁🦁🦁 Frst book 📕',
          description: 'The first book I ever wrote',
     },
     {
          id: 'p2🖌',
          price: 2.5,
          title: 'My 🐵🐵🐵🐵🐵 Second book 📚',
          description: 'The second book I ever wrote',
     },
];

const Products = (props) => {
     return (
          <section className={classes.products}>
               <h2>Buy your favorite products</h2>
               <ul>
                    { DUMMY_PRODUCT.map((product) => (
                         <ProductItem
                              key={product.id}
                              id={product.id}
                              title={product.title}
                              price={product.price}
                              description={product.description}
                         />
                    ))}
               </ul>
          </section>
     );
};

export default Products;
