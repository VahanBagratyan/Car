import React from "react";
import Header from "../Components/Header/Header";
import ProductList from "../Components/ProductList/ProductList"

function HomePage() {
  return (
    <React.StrictMode>
      <Header />
      <ProductList/>
    </React.StrictMode>
  );
}

export default HomePage;
