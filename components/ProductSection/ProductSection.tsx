import * as React from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductSection.module.css";

import { cartData, singleProduct } from "../../interfaces/interfaces";
import { getProducts, dynamicSort, filterPrice } from "../../utils/helpers";
import { priceFilter } from "../../data";

import ReactPaginate from "react-paginate";
import LeftArrow from "../icons/LeftArrow";
import RightArrow from "../icons/RightArrow";
import Spinner from "../Spinner/Spinner";
import MobileFilter from "../MobileFilter/MobileFilter";

type Iprops = {
  addToCart: (el: cartData) => void;
};

const ProductSection = ({ addToCart }: Iprops) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showMobileFilter, setShowMobileFilter] =
    React.useState<boolean>(false);
  const [products, setProducts] = React.useState<singleProduct[]>([]);
  const [checkedValues, setCheckedValues] = React.useState<string[]>([]);
  const [priceRange, setPriceRange] = React.useState<string>("");
  const [pageNumber, setPageNumber] = React.useState<number>(0);
  const [productsPerPage] = React.useState<number>(6);
  const [selectValue, setSelectValue] = React.useState<string>("price");
  const [asc, setAsc] = React.useState<boolean>(true);

  //fetch products
  const fetchProducts = async () => {
    let res = await getProducts();
    setLoading(true);
    if (res) {
      setProducts(res);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  //filter products by category
  let filteredProducts =
    checkedValues.length > 0
      ? filterPrice(
          products.filter((product) =>
            checkedValues.includes(product.category)
          ),
          priceRange
        )
      : filterPrice(products, priceRange);
  //get current products
  const pagesVisited = pageNumber * productsPerPage;
  const currentProducts =
    checkedValues.length > 0
      ? filteredProducts.slice(pagesVisited, pagesVisited + productsPerPage)
      : products.slice(pagesVisited, pagesVisited + productsPerPage);

  //get last page
  const isLastPage = currentProducts.length !== productsPerPage;
  const pageCount = Math.ceil(products.length / productsPerPage);
  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  //pull out category options
  let categories: string[] = products.map((el) => el.category);
  let newCategories: string[] = Array.from(new Set(categories));

  //handle price and aaphabetical sorting
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(() => e.target.value);
  };
  const handleSort = () => {
    if (selectValue === "alphabetically") {
      if (asc) {
        currentProducts.sort(dynamicSort("name"));
      } else {
        currentProducts.sort(dynamicSort("-name"));
      }
    }

    if (selectValue === "price") {
      if (asc) {
        currentProducts.sort((a, b) => a.price - b.price);
      } else {
        currentProducts.sort((a, b) => b.price - a.price);
      }
    }
  };

  handleSort();

  //handle category filter
  const handleChecked = (category: string) => {
    const isSelected = checkedValues.includes(category);
    const selectedCategories = isSelected
      ? checkedValues.filter((el) => el !== category)
      : [...checkedValues, category.toLocaleLowerCase()];

    setCheckedValues(selectedCategories);
  };

  //handle price range check
  const handlePriceRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange(e.target.value);
  };

  //close filter modal
  const closeFilter = () => {
    setShowMobileFilter(false);
  };

  return (
    <div className={showMobileFilter ? styles.noMargin : styles.wrapper}>
      <div
        className={showMobileFilter ? styles.heading_on_filter : styles.heading}
      >
        <div className={styles.heading_text}>
          <span>
            <h2 className={styles.bold}>Photography / </h2>
          </span>
          <span>
            <p className={styles.light}> Premium Photos</p>
          </span>
        </div>
        <div
          className={styles.mobile_filter}
          onClick={() => setShowMobileFilter(!showMobileFilter)}
        >
          <img src="/assets/icons/filter.svg" alt="" />
        </div>
        {showMobileFilter && (
          <MobileFilter
            closeFilter={closeFilter}
            categories={newCategories}
            priceRange={priceRange}
            handlePriceRange={handlePriceRange}
            handleChecked={handleChecked}
          />
        )}
        <div className={styles.sort_section}>
          <div>
            <img
              src="/assets/icons/sortArrow.svg"
              alt=""
              onClick={() => setAsc(!asc)}
              style={{ cursor: "pointer" }}
            />
            <p>Sort By</p>
          </div>

          <select value={selectValue} onChange={handleSelectChange}>
            <option value="price">Price</option>
            <option value="alphabetically">Alphabetically</option>
          </select>
        </div>
      </div>
      <div className={styles.productSection}>
        <div className={styles.filterSide}>
          <p>Category</p>
          <div className={styles.categoryfilterItems}>
            {newCategories.map((el) => (
              <div key={el}>
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
          <div className={styles.pricefilterItems}>
            {priceFilter.map((el) => (
              <div key={el.id}>
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
        </div>
        {currentProducts.length == 0 ? (
          <div className={styles.notFound}>No Products Found</div>
        ) : (
          <div className={styles.productItems}>
            {loading ? (
              <Spinner />
            ) : (
              currentProducts.length > 0 &&
              currentProducts.map((el) => (
                <ProductCard
                  key={el.id}
                  name={el.name}
                  price={el.price}
                  bestSeller={el.bestSeller}
                  category={el.category}
                  url={el.image.url}
                  addToCart={addToCart}
                />
              ))
            )}
          </div>
        )}
      </div>
      <ReactPaginate
        previousLabel={<LeftArrow />}
        nextLabel={<RightArrow />}
        pageRangeDisplayed={3}
        marginPagesDisplayed={3}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={styles.paginationButtons}
        previousLinkClassName={
          pagesVisited === 0 ? styles.hide : styles.prevButton
        }
        nextLinkClassName={isLastPage ? styles.hide : styles.nextButton}
        disabledClassName={styles.pagDisabled}
        activeClassName={styles.pagActive}
      />
    </div>
  );
};

export default ProductSection;
