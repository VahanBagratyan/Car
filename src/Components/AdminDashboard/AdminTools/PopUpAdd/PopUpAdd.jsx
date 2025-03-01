import React, { useState } from "react";
import axios from "axios";
import styles from "./popUpAdd.module.css"; // Importing CSS module

const AddProductPopup = () => {
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');    

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    price: "",
    carState: "",
    availability: "",
    brand: "",
    description: "",
  });

  const [responsePayload, setResponsePayload] = useState(null); // Store response
  const [isLoading, setIsLoading] = useState(false); // Loading state to control the loading bar

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (
      !formData.name ||
      !formData.image ||
      !formData.price ||
      !formData.carState ||
      !formData.availability ||
      !formData.brand ||
      !formData.description
    ) {
      alert("All fields are required.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    setIsLoading(true); // Start loading

    axios
      .post("http://localhost:8081/admin/addProduct", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      })
      .then((response) => {
        setResponsePayload(response.data); // Store the response
        alert("Product added successfully!");

        // Reset form after successful submission
        setFormData({
          name: "",
          image: null,
          price: "",
          carState: "",
          availability: "",
          brand: "",
          description: "",
        });

        togglePopup();
        setIsLoading(false);
        window.location.reload(); // Refresh page
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("There was an error submitting the form.");
        setIsLoading(false);
      });
  };

  return (
    <>
      <button className={styles.addButton} onClick={togglePopup}>
        Add Product
      </button>

      {isOpen && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2>Add Product</h2>

            {/* The Form is inside an iframe-like container */}
            <div className={styles.iframeContainer}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Image</label>
                  <input type="file" accept="image/*" onChange={handleImageChange} required />
                </div>
                <div>
                  <label>Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Car State</label>
                  <select
                    name="carState"
                    value={formData.carState}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Car State
                    </option>
                    <option value="new">New</option>
                    <option value="used">Used</option>
                  </select>
                </div>
                <div>
                  <label>Availability</label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Availability
                    </option>
                    <option value="To Be Ordered">To Be Ordered</option>
                    <option value="In warehouse">In Warehouse</option>
                    <option value="Available">Available</option>
                  </select>
                </div>
                <div>
                  <label>Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" disabled={isLoading}>Submit</button>
              </form>
            </div>

            <button className={styles.closeButton} onClick={togglePopup}>
              Close
            </button>

            {isLoading && (
              <div className={styles.loadingBar}>
                <div className={styles.loading}></div>
              </div>
            )}

            {responsePayload && (
              <div className={styles.response}>
                <h3>Response:</h3>
                <pre>{JSON.stringify(responsePayload, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AddProductPopup;
