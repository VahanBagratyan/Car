import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./slider.module.css";
import "./slider.css";
import imageLinks from "../../MasterJson/HomeSliderJson.json"

const SliderComp = () => {

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
    const { className,onClick } = props;
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
  return (
    <div className={styles.sliderRoot}>
      <Slider {...settings}>
      {imageLinks.images.map((link, index) => (
        <div key={index} className={styles.imgBox}>          
          <img src={link} alt={`image-${index}`} className={styles.img} />
        </div>
      ))}
      </Slider>
    </div>
  );
};

export default SliderComp;
