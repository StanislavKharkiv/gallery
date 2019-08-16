import React, { Component } from "react";
import Slider from "react-slick";
import SliderImgMain from './SliderImgMain';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MainSlider.css";

export default class MainSlider extends Component {
  render() {
    const settings = {
      // dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      fade: true,
      asNavFor: 'slider-bg'
    };
    const allImg = this.props.imgSrc.map((src, index) => {
      return <SliderImgMain src={src} key={index}/>
    });
    return (
      <div className="slider-main">
        <Slider {...settings}>
          {allImg}
        </Slider>
      </div>
    );
  }
}