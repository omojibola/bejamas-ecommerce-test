import * as React from "react";
import styles from "./HeroSection.module.css";
import { getFeaturedProduct } from "../../utils/helpers";
import { cartData, productData } from "../../interfaces/interfaces";

type Iprops = {
  addToCart: (el: cartData) => void;
};

const HeroSection = ({ addToCart }: Iprops) => {
  const [product, setProduct] = React.useState<productData | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchFeaturedProduct = async () => {
    let res = await getFeaturedProduct();
    setLoading(true);
    if (res) {
      setProduct(res[0]);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchFeaturedProduct();
  }, []);

  let url = product?.image?.url;
  let name = product?.name;
  let price = product?.price;

  return (
    <div className={styles.heroWrapper}>
      <div className={styles.topSide}>
        <h2>{product?.name}</h2>
        <button
          className={styles.addToCart}
          onClick={() => addToCart({ url, name, price })}
        >
          ADD TO CART
        </button>
      </div>
      <div className={styles.heroImage}>
        <img src={product?.image?.url} alt="" />
      </div>
      {/* <div className={styles.photoOfTheDay}>
        <p>Photo of the day</p>
      </div> */}
      <button
        className={styles.mobileAddtoCart}
        onClick={() => addToCart({ url, name, price })}
      >
        ADD TO CART
      </button>
      <div className={styles.aboutSection}>
        <div className={styles.about_leftSide}>
          <h4>About the {product?.name}</h4>
          <p className={styles.boldGrey}>{product?.category}</p>
          <p className={styles.lightGrey}>{product?.description}</p>
        </div>
        <div className={styles.about_rightSide}>
          <h4>People also buy</h4>

          {product?.recommendations && (
            <div className={styles.recommededPictures}>
              <img src={product.recommendations.first} alt="" />
              <img src={product.recommendations.second} alt="" />
              <img src={product.recommendations.third} alt="" />
            </div>
          )}
          <div className={styles.about_leftSide_details}>
            <h4>Details</h4>
            <p>Size: 1020 x 1020 pixel</p>
            <p>Size: 15 mb</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
