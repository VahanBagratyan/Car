import { useState, useEffect } from "react";
import styles from "./modifyProducts.module.css";
import axios from "axios";
import PopUpAdd from "../PopUpAdd/PopUpAdd";

const token = sessionStorage.getItem('token') || localStorage.getItem('token');    

const ModifyProducts = () => {
    const [products, setProducts] = useState([]);
    const [availabilityStates, setAvailabilityStates] = useState({});
    const [carStates, setCarStates] = useState({});
    const [filter, setFilter] = useState({
        minPrice: null,
        maxPrice: null,
        availability: "All",
        carState: "All",
        brand: null,
    });
    const [descriptionStates, setDescriptionStates] = useState({});
    const [priceStates, setPriceStates] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8081/products", {
                    params: filter,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProducts(response.data);

                // Set initial states for availability, carState, description, and price
                const initialAvailabilityStates = response.data.reduce((acc, product) => {
                    acc[product.productID] = product.availability;
                    return acc;
                }, {});

                const initialCarStates = response.data.reduce((acc, product) => {
                    acc[product.productID] = product.carState;
                    return acc;
                }, {});

                const initialDescriptionStates = response.data.reduce((acc, product) => {
                    acc[product.productID] = product.description;
                    return acc;
                }, {});

                const initialPriceStates = response.data.reduce((acc, product) => {
                    acc[product.productID] = product.price;
                    return acc;
                }, {});

                setAvailabilityStates(initialAvailabilityStates);
                setCarStates(initialCarStates);
                setDescriptionStates(initialDescriptionStates);
                setPriceStates(initialPriceStates);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [filter]);

    const handleAvailabilityChange = (productID, newState) => {
        setAvailabilityStates((prevStates) => {
            const updatedStates = { ...prevStates, [productID]: newState };
            sendPatchRequest(productID, "availability", newState);
            return updatedStates;
        });
    };

    const handleCarStateChange = (productID, newState) => {
        setCarStates((prevStates) => {
            const updatedStates = { ...prevStates, [productID]: newState };
            sendPatchRequest(productID, "carState", newState);
            return updatedStates;
        });
    };

    const handleDescriptionChange = (productID, newDescription) => {
        setDescriptionStates((prevStates) => {
            const updatedStates = { ...prevStates, [productID]: newDescription };
            sendPatchRequest(productID, "description", newDescription);
            return updatedStates;
        });
    };

    const handlePriceChange = (productID, newPrice) => {
        setPriceStates((prevStates) => {
            const updatedStates = { ...prevStates, [productID]: newPrice };
            sendPatchRequest(productID, "price", newPrice);
            return updatedStates;
        });
    };

    const sendPatchRequest = async (productID, attribute, newValue) => {
        try {
            await axios.patch("http://localhost:8081/admin/changeProduct", {
                productID,
                [attribute]: newValue,
                key: attribute,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(`Product ${productID} updated with ${attribute}: ${newValue}`);
        } catch (error) {
            console.error("Error sending PATCH request:", error);
        }
    };

    const handleDeleteProduct = async (productID) => {
        try {
            await axios.post("http://localhost:8081/admin/deleteProduct", { productID }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const response = await axios.get("http://localhost:8081/products", { params: filter, headers: { Authorization: `Bearer ${token}` } });
            setProducts(response.data);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    let height = 0;
    const [clickCounter, setClickCounter] = useState(0);

    if (clickCounter % 2 === 0) {
        height = 0;
    } else {
        height = 600;
    }

    return (
        <div className={styles.root}>
            <div className={styles.root_filter}></div>
            <div className={styles.productDropDown} onClick={() => {
                setClickCounter((prevCounter) => prevCounter + 1);
            }}><p>Products</p></div>
            <div className={styles.root_procuctList} style={{
                height: `${height}px`,
            }}>
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
                            <th>Delete Product</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            const currentAvailability = availabilityStates[product.productID] || product.availability;
                            const currentCarState = carStates[product.productID] || product.carState;
                            const currentDescription = descriptionStates[product.productID] || product.description;
                            const currentPrice = priceStates[product.productID] || product.price;

                            const availabilityOptions = ["Available", "In Warehouse", "To Be Ordered"].filter(
                                (option) => option !== currentAvailability
                            );

                            const carStateOptions = ["New", "Used"].filter(
                                (option) => option !== currentCarState
                            );

                            return (
                                <tr key={product.productID}>
                                    <td>{product.productID}</td>
                                    <td>{product.name}</td>
                                    <td>
                                        <a href={product.image} target="_blank" rel="noreferrer">
                                            Link
                                        </a>
                                        
                                    </td>

                                    <td>
                                        <input
                                            type="number"
                                            value={currentPrice}
                                            onChange={(e) => handlePriceChange(product.productID, e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <div className={styles.dropdown}>
                                            <select
                                                value={currentAvailability}
                                                onChange={(e) =>
                                                    handleAvailabilityChange(product.productID, e.target.value)
                                                }
                                            >
                                                <option value={currentAvailability}>{currentAvailability}</option>
                                                {availabilityOptions.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.dropdown}>
                                            <select
                                                value={currentCarState}
                                                onChange={(e) =>
                                                    handleCarStateChange(product.productID, e.target.value)
                                                }
                                            >
                                                <option value={currentCarState}>{currentCarState}</option>
                                                {carStateOptions.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </td>
                                    <td className={styles.description}>
                                        <input
                                            type="text"
                                            value={currentDescription}
                                            onChange={(e) =>
                                                handleDescriptionChange(product.productID, e.target.value)
                                            }
                                        />
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteProduct(product.productID)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <PopUpAdd />
        </div>
    );
};

export default ModifyProducts;
