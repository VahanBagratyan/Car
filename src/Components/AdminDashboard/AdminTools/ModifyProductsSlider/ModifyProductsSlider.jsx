import { useState, useEffect } from "react";
import styles from "./modifyProductsSlider.module.css";
import axios from "axios";

const ModifyProductsSlider = () => {
  const [groupedProducts, setGroupedProducts] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/products/productSlider", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const grouped = response.data.reduce((acc, item) => {
          const type = item.type || "Other";
          if (!acc[type]) acc[type] = [];
          acc[type] = [...acc[type], ...item.product_list];
          return acc;
        }, {});

        setGroupedProducts(grouped);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8081/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllProducts(response.data);
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    };

    fetchData();
    fetchAllProducts();
  }, [token]);

  const addProductToType = async (type) => {
    if (!selectedProduct) return;
    try {
      await axios.post("http://localhost:8081/admin/addProductSlider", {
        type,
        productID: selectedProduct.productID,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setGroupedProducts(prevGrouped => ({
        ...prevGrouped,
        [type]: [...prevGrouped[type], selectedProduct]
      }));
      
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const deleteProduct = async (type, productID) => {
    try {
      await axios.post("http://localhost:8081/admin/deleteProductSlider", {
        headers: { Authorization: `Bearer ${token}` },
        data: { productID },
      });
      
      setGroupedProducts(prevGrouped => ({
        ...prevGrouped,
        [type]: prevGrouped[type].filter(product => product.productID !== productID)
      }));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const [clickCounter, setClickCounter] = useState(0);
  const height = clickCounter % 2 === 0 ? 0 : 600;

  return (
    <div className={styles.root}>
      <div className={styles.root_filter}></div>
      <div className={styles.productDropDown} onClick={() => setClickCounter(prev => prev + 1)}>
        <p>Products</p>
      </div>
      <div className={styles.root_procuctList} style={{ height: `${height}px` }}>
        {Object.entries(groupedProducts).map(([type, products]) => (
          <div key={type}>
            <h2 className={styles.productType}>{type}</h2>
            <select onChange={(e) => setSelectedProduct(JSON.parse(e.target.value))}>
              <option value="">Select a product</option>
              {allProducts
                .filter(p => !products.some(prod => prod.productID === p.productID))
                .map(product => (
                  <option key={product.productID} value={JSON.stringify(product)}>
                    {product.name} - {product.price}
                  </option>
                ))}
            </select>
            <button onClick={() => addProductToType(type)} disabled={!selectedProduct}>Add Product to {type}</button>
            <table border="1" style={{ width: "100%", textAlign: "left" }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Availability</th>
                  <th>Car State</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.productID}>
                    <td>{product.productID}</td>
                    <td>{product.name}</td>
                    <td>
                      <a href={product.image} target="_blank" rel="noreferrer">Link</a>
                    </td>
                    <td>{product.price}</td>
                    <td>{product.availability || "N/A"}</td>
                    <td>{product.carState}</td>
                    <td className={styles.description}>{product.description}</td>
                    <td>
                      <button onClick={() => deleteProduct(type, product.productID)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModifyProductsSlider;
