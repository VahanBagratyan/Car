import { useEffect, useState } from "react";
import styles from "./products.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";

const Products = () => {
  const { id } = useParams();
  const [getFilter, setGetFilter] = useState(null);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({
    categoryId: id,
    count: 20,
    page: 1,
    priceFrom: null,
    priceTo: null,
    countries: [],
    brands: [],
    search: null,
    parentId: id,
    isDiscounted: false,
    sortBy: 3,
  });

  return (
    <div className={styles.root}>
      <div className={styles.filter_root}>
        <div>
          <h1>Brands</h1>
          {getFilter
            ? getFilter.brands.map((brand) => {
                return (
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        onChange={() => {
                          filter.brands.push(brand.id);
                          setFilter((prevObject) => ({
                            ...prevObject,
                            brands: [...prevObject.brands, brand.id],
                          }));
                          console.log(filter);
                        }}
                      />
                      {brand.name}
                    </label>
                  </div>
                  
                );
              })
            : null}
        </div>
      </div>
      <div className={styles.products_container}>
        {products.length > 0 ? (
          products.map((item) => (
            <div className={styles.products_box}>
              <div className={styles.products_img_box}>
                <div className={styles.image_wrapper}>
                  <img
                    src={item.photo}
                    className={styles.products_img}
                    onError={(e) => {
                      e.target.src = "/images/logo-small.png";
                    }}
                  />
                </div>
                <a
                  href={"http://localhost:3000/productdetails/" + item.id}
                  className={styles.leran_more}
                >
                  Learn More
                </a>
              </div>

              <div className={styles.product_name_box}>
                <p>{item.name}</p>
              </div>
              <p>{Math.round(item.price)} ֏</p>
              <div className={styles.add_to_cart}>
                <p>Add To Cart</p>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Products;
