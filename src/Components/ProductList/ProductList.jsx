import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./productList.module.css";
import productsJson from "../../MasterJson/AllProducts.json"

const Products = () => {
  const [products, setProducts] = useState([]);

  const [filter, setFilter] = useState({
    categoryId: null,
    carState: "Car State", //new, old
    availability: null, // coming, in werehouse, to be ordered
    count: 20,
    page: 1,
    priceFrom: null,
    priceTo: null,
    brands: "brand"
   });

  
  const changeName = (state) =>{
    setFilter(prevState => ({
      ...prevState,   // Spread other properties in case there are more
      carState: state      // Update only the "name" property
  }))
  ;
  } 

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("vahan")
        const response = await axios.get(
          "http://localhost:8081/products",
          filter
        );
        console.log("banannana")
        console.log(response)
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [filter]);

  return (
    <div className={styles.root}>
      <div className={styles.filter_root}>
        <div>
          <h2>Filters</h2>
          <div class={styles.dropdown}>
            <button class={styles.dropbtn}>{filter.carState}</button>
            <div class={styles.dropdownContent}>
              <a href="#" onClick={(e) => changeName(e.target.innerText)}>Link 1</a>
              <a href="#" onClick={(e) => changeName(e.target.innerText)}>Link 2</a>
              <a href="#" onClick={(e) => changeName(e.target.innerText)}>Link 3</a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.products_container}>
        {products.length > 0 ? (
          products.map((item) => (
            <div className={styles.products_box}>
              <div className={styles.products_img_box}>
                <div className={styles.image_wrapper}>
                  <img
                    src={item.image}
                    className={styles.products_img}
                    onError={(e) => {
                      e.target.src = "/images/logo-small.png";
                    }}
                  />
                </div>
                <a
                  href={"http://localhost:3000/productdetails/" + item.productID}
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
          console.log("Sorry")
        )}
      </div>
    </div>
  );
};

export default Products;
