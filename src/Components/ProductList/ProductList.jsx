import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./productList.module.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortOrder, setSortOrder] = useState("none");

  const [filter, setFilter] = useState({
    minPrice: null,
    maxPrice: null,
    availability: "All",
    carState: "All",
    name: null,
    brand: null,
  });

  useEffect(() => {
    console.log("Filter has been updated:", filter);
  }, [filter]);

  const changeState = (state) => {
    setFilter((prevState) => ({
      ...prevState,
      carState: state,
    }));
  };

  const changeAvailability = (state) => {
    setFilter((prevState) => ({
      ...prevState,
      availability: state,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data with filter:", filter);
        const response = await axios.get("http://localhost:8081/products", {
          params: filter,
        });
        let sortedProducts = response.data;
        if (sortOrder === "priceAsc") {
          sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "priceDesc") {
          sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
        } else if (sortOrder === "nameAsc") {
          sortedProducts = sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOrder === "nameDesc") {
          sortedProducts = sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        }
        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filter, sortOrder]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchValue = event.target.search.value;
    setFilter((prevState) => ({
      ...prevState,
      name: searchValue,
    }));
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
    setFilter((prevState) => ({
      ...prevState,
      minPrice: value[0],
      maxPrice: value[1],
    }));
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div className={styles.root}>
      <div className={styles.filter_root}>
        <div>
          <br />
          <form className={styles.search_form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search.."
              name="search"
              className={styles.search_box}
            />
            <br />
            <button type="submit" className={styles.search_button}>
              Search
            </button>
          </form>
        </div>
        <div className={styles.slider_container}>
          <h2>Price</h2>
          <Slider
            range
            min={0}
            max={100000}
            step={1000}
            value={priceRange}
            onChange={handlePriceChange}
            className={styles.custom_slider}
          />
          <p>{`Price: ${priceRange[0]} $ - ${priceRange[1]} $`}</p>
        </div>

        <div className={styles.filter_box}>
          <h2>Car State</h2>
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>{filter.carState}</button>
            <div className={styles.dropdownContent}>
              <a href="#" onClick={(e) => changeState(e.target.innerText)}>All</a>
              <a href="#" onClick={(e) => changeState(e.target.innerText)}>New</a>
              <a href="#" onClick={(e) => changeState(e.target.innerText)}>Used</a>
            </div>
          </div>
        </div>
        <div className={styles.filter_box}>
          <h2>Car Availability</h2>
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>{filter.availability}</button>
            <div className={styles.dropdownContent}>
              <a href="#" onClick={(e) => changeAvailability(e.target.innerText)}>All</a>
              <a href="#" onClick={(e) => changeAvailability(e.target.innerText)}>Available</a>
              <a href="#" onClick={(e) => changeAvailability(e.target.innerText)}>In Warehouse</a>
              <a href="#" onClick={(e) => changeAvailability(e.target.innerText)}>To Be Ordered</a>
            </div>
          </div>
        </div>

      </div>

      <div className={styles.products_container}>
        <div className={styles.sort_box}>
          <h2>Sort By - </h2>  
          <select value={sortOrder} onChange={handleSortChange} className={styles.sort_dropdown}>
            <option value="none">None</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="nameAsc">Name: A-Z</option>
            <option value="nameDesc">Name: Z-A</option>
          </select>
        </div>
        <div  className={styles.products_container}>
        {products.length > 0 ? (
          products.map((item) => (
            <div className={styles.products_box} key={item.productID}>
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
                  href={`http://localhost:3000/productdetails/${item.productID}`}
                  className={styles.leran_more}
                >
                  Learn More
                </a>
              </div>
              <div className={styles.product_name_box}>
                <p>{item.name}</p>
              </div>
              <p>{Math.round(item.price)} $</p>
              <div className={styles.add_to_cart}>
                <p>Add To Cart</p>
              </div>
            </div>
          ))
        ) : (
          <h1>No Products Found</h1>
        )}
        </div>
      </div>
    </div>
  );
};

export default Products;