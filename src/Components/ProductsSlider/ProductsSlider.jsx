import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./productsSlider.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductsSliderComp = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/products/productSlider"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const SampleNextArrow = ({ className, onClick }) => (
    <div className={className} style={{ display: "block", right: "0", top: "130px" }} onClick={onClick} />
  );

  const SamplePrevArrow = ({ className, onClick }) => (
    <div className={className} style={{ display: "block", top: "130px" }} onClick={onClick} />
  );

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    infinite: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1700, settings: { slidesToShow: 4 } },
      { breakpoint: 1400, settings: { slidesToShow: 3 } },
      { breakpoint: 1150, settings: { slidesToShow: 2 } },
      { breakpoint: 700, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className={styles.root}>
      {data.length > 0 &&
        data.map((section, index) => (
          <div className={styles.slider_row} key={index}>
            <p className={styles.title}>{section.type}</p>
            <Slider {...settings}>
              {section.product_list?.map((item, itemIndex) => (
                <div className={styles.products_container} key={item.productID || itemIndex}>
                  <div className={styles.products_box}>
                    <div className={styles.products_img_box}>
                      <div className={styles.image_wrapper}>
                        <img
                          alt="product"
                          src={item.image}
                          className={styles.products_img}
                          onError={(e) => {
                            e.target.src = "/images/logo-small.png";
                          }}
                        />
                      </div>
                      <a href={`http://localhost:3000/productdetails/${item.productID}`} className={styles.leran_more}>
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
                </div>
              ))}
            </Slider>
          </div>
        ))}
    </div>
  );
};

export default ProductsSliderComp;
