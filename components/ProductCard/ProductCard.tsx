import { cartData } from "../../interfaces/interfaces";
import styles from "./Card.module.css";

type Iprops = {
  bestSeller: boolean | undefined;
  url: string;
  category: string;
  name: string;
  price: number;
  addToCart: (e: cartData) => void;
};

const ProductCard = ({
  bestSeller,
  url,
  category,
  name,
  price,
  addToCart,
}: Iprops) => {
  return (
    <div className={styles.card}>
      {bestSeller && <div className={styles.best_seller}>Best Seller</div>}
      <img src={url} alt="" width="200px" height="280px" />
      <div className={styles.details}>
        <button
          className={styles.addToCart}
          onClick={() => addToCart({ name, price, url })}
        >
          ADD TO CART
        </button>
        <p className={styles.category}>{category}</p>
        <h3 className={styles.name}>
          {name.length > 20 ? name.substring(0, 10) + "..." : name}
        </h3>
        <p className={styles.price}> ${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
