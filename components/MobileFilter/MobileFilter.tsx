import React from "react";
import styles from "./MobileFilter.module.css";
import { priceFilter } from "../../data";

type Iprops = {
  closeFilter: () => void;
  categories: string[];
  priceRange: string;
  handlePriceRange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChecked: (el: string) => void;
};

const MobileFilter = ({
  closeFilter,
  categories,
  priceRange,
  handlePriceRange,
  handleChecked,
}: Iprops) => {
  return (
    <div className={styles.mobile_filter_wrapper}>
      <div className={styles.heading}>
        <h2>Filter</h2>
        <p onClick={() => closeFilter()}>x</p>
      </div>
      <div className={styles.filter_body}>
        {categories.map((el) => (
          <div key={el} className={styles.singleCheckbox}>
            <input
              type="checkbox"
              style={{ marginRight: 10 }}
              value={el}
              onChange={() => {
                handleChecked(el.toLowerCase());
              }}
            />
            <label style={{ textTransform: "capitalize" }}>{el}</label>
          </div>
        ))}
      </div>
      <div className={styles.filter_body_price}>
        {priceFilter.map((el) => (
          <div key={el.id} className={styles.singleCheckbox}>
            <input
              type="checkbox"
              style={{ marginRight: 10 }}
              value={el.value}
              checked={priceRange === el.value}
              onChange={(e) => handlePriceRange(e)}
            />
            <label style={{ textTransform: "capitalize" }}>{el.name}</label>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <button className={styles.clear_button}>CLEAR</button>
        <button className={styles.save_button} onClick={() => closeFilter()}>
          SAVE
        </button>
      </div>
    </div>
  );
};

export default MobileFilter;
