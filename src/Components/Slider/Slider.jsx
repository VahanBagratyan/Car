import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./slider.module.css";
import "./slider.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";


const SliderComp = () => {

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(
          "http://localhost:8081/products/bigSlider"
        );
        setData(response.data);
        console.log(data);
        
      } catch (error) { 
        console.log(error);
      }
    };
    fetchData();
  },([]));

  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{ display: "block", marginRight: "55px" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    console.log(className);
    return (
      <div
        className={className}
        style={{ left: "7px", zIndex: "1" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  console.log(data);
  
  return data ? (
    <div className={styles.sliderRoot}>
      <Slider {...settings}>
        {data.map((element) => {
          return (
            <div className={styles.imgBox} key={element.id}> {/* Add a unique key */}
              <img src={element.image} alt="" className={styles.img} />
            </div>
          );
        })}
      </Slider>
    </div>
  ) : (    
    <Loader />
  );  
};

export default SliderComp;
