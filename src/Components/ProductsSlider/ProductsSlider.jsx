import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./productsSlider.module.css";
import productSliderData from "../../MasterJson/HomeProductSliderJson.json"

console.log(productSliderData);

const ProductsSliderComp = () => {

  function SampleNextArrow({ className, onClick }) {
    // const  = props;
    return (
      <div
        className={className}
        style={{ display: "block", right: "0", top: "130px" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{ display: "block", top: "130px" }}
        onClick={onClick}
      />
    );
  }
  var settings = {
    dots: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    infinite: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.root}>
      {console.log(productSliderData)}
      {productSliderData.items.map((section) => {
        return (
          <div className={styles.slider_row}>
            <p className={styles.title}>{section.title}</p>
            <Slider {...settings}>
              {section.products.map((item) => {
                return (
                  <div className={styles.products_container}>
                    <div className={styles.products_box}>
                      <div className={styles.products_img_box}>
                        <div className={styles.image_wrapper}>
                          <img alt="product"
                            src={item.image}
                            className={styles.products_img}
                            onError={(e) => {
                              e.target.src = "/images/logo-small.png";
                            }}
                          />
                        </div>
                        <a
                          href={
                            "http://localhost:3000/productdetails/" + item.id
                          }
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
                  </div>
                );
              })}
            </Slider>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsSliderComp;
