import React from "react";
import Header from "../Components/Header/Header";
import SliderComp from "../Components/Slider/Slider";
import ProductsSliderComp from "../Components/ProductsSlider/ProductsSlider";

function HomePage() {
  return (
    <React.StrictMode>
      <Header />
      <SliderComp/>
      <ProductsSliderComp/>
    </React.StrictMode>
  );
}

export default HomePage;
