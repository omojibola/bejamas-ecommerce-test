import { db } from "./firebase";

import { singleProduct } from "../interfaces/interfaces";

export const getProducts = async () => {
  let data: any = [];
  try {
    const productsRef = await db.collection("products").get();
    productsRef.forEach((doc) => {
      if (doc.id !== "" || doc.id !== null) {
        data.push({
          id: doc.id,
          ...doc.data({ serverTimestamps: "estimate" }),
        });
      }
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getFeaturedProduct = async () => {
  let data: any = [];
  try {
    const productsRef = await db
      .collection("products")
      .where("featured", "==", true)
      .get();
    productsRef.forEach((doc) => {
      if (doc.id !== "" || doc.id !== null) {
        data.push({
          id: doc.id,
          ...doc.data({ serverTimestamps: "estimate" }),
        });
      }
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const dynamicSort = (prop: any) => {
  let sortOrder = 1;
  if (prop[0] === "-") {
    sortOrder = -1;
    prop = prop.substr(1);
  }
  return function (a: any, b: any) {
    if (sortOrder == -1) {
      return b[prop].localeCompare(a[prop]);
    } else {
      return a[prop].localeCompare(b[prop]);
    }
  };
};

//price filter functions
export const filterPrice = (value: singleProduct[], filter: string) => {
  if (filter === "lower than $20") {
    let priceFilteredProducts = value.filter((el) => el.price < 20);
    return priceFilteredProducts;
  }

  if (filter === "$20 - $100") {
    let priceFilteredProducts = value.filter(
      (el) => el.price >= 20 && el.price <= 100
    );
    return priceFilteredProducts;
  } else if (filter === "$100 - $200") {
    let priceFilteredProducts = value.filter(
      (el) => el.price >= 100 && el.price <= 200
    );
    return priceFilteredProducts;
  } else if (filter === "more than $200") {
    let priceFilteredProducts = value.filter((el) => el.price >= 200);
    return priceFilteredProducts;
  } else return value;
};
