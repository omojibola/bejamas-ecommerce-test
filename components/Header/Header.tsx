import * as React from "react";
import Image from "next/image";
import styles from "./Header.module.css";

import logo from "../../public/assets/images/logo.svg";
import { cartData } from "../../interfaces/interfaces";

type Iprops = {
  cart: cartData[];
  cartLength: number;
  clearCart: () => void;
  hideCart: () => void;
  toggleShowCart: () => void;
  showCart: boolean;
};

const Header = ({
  cart,
  cartLength,
  clearCart,
  showCart,
  hideCart,
  toggleShowCart,
}: Iprops) => {
  return (
    <>
      <div className={styles.wrapper}>
        <Image src={logo} alt="benjamas logo" width={100} height={30} />
        <div className={styles.cartWrap} onClick={() => toggleShowCart()}>
          <img
            src="/assets/icons/shopping-cart.svg"
            alt=""
            width={30}
            height={30}
          />
          <p>{cartLength}</p>
        </div>
      </div>
      {showCart && (
        <div className={styles.cartComponent}>
          <div className={styles.cancel} onClick={() => hideCart()}>
            <p>x</p>
          </div>
          {cart.length > 0 ? (
            <div className={styles.cartBody}>
              {cart.map((el) => (
                <div className={styles.cartItem}>
                  <div>
                    <p>{el.name}</p>
                    <p>${el.price}</p>
                  </div>
                  <img src={el.url} />
                </div>
              ))}
              <button onClick={() => clearCart()}>CLEAR</button>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <h3>Cart is Empty</h3>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
