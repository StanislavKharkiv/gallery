import React, { Component } from "react";
import Slider from "react-slick";
import SliderImgMain from './SliderImgMain';
import SliderImgBg from './SliderImgBg';
import SliderNavSettings from './SliderNavSettings';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css";

export default class AsNavFor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null,
            nav3: null,
            navSlider: true,
            sliderNavSet: {
                open: true
            }
        };
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }
    toggleSliderNav = () => {
        this.setState({ sliderNavSet: { open: !this.state.sliderNavSet.open } })
    }
    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2,
            nav3: this.slider3
        });
    }
    componentDidUpdate(prevProps) {
        if (this.props.sliderNav.autoPlay !== prevProps.sliderNav.autoPlay) {
            this.props.sliderNav.autoPlay ? this.play() : this.pause();
        }
    }
    play() {
        this.slider2.slickPlay();
    }
    pause() {
        this.slider2.slickPause();
    }
    next() {
        this.slider2.slickNext();
    }
    previous() {
        this.slider2.slickPrev();
    }
    render() {
        const allImgBg = this.props.imgSrc.map((src, index) => {
            return <SliderImgBg src={src} key={index} />
        });
        const allImg = this.props.imgSrc.map((src, index) => {
            return <SliderImgMain src={src} key={index} />
        });
        return (
            <React.Fragment>
                {/* background slider */}
                <Slider
                    asNavFor={this.state.nav2}
                    ref={slider => (this.slider1 = slider)}
                    className={'slider-bg'}
                    fade={true}
                >
                    {allImgBg}
                </Slider>
                {/* NAV SLIDER */}
                <div className={this.state.sliderNavSet.open ? "slider-nav" : "slider-nav hide"} >
                    <SliderNavSettings>
                        <button className="slider-nav-control" style={this.state.sliderNavSet.open ? { marginRight: "1000px", opacity: 0 } : { marginRight: "10px", opacity: 1 }} onClick={this.previous}>&larr;</button>
                        <button onClick={this.toggleSliderNav} className="btn">{this.state.sliderNavSet.open ? "закрыть" : "открыть"}</button>
                        <button className="slider-nav-control" style={this.state.sliderNavSet.open ? { marginLeft: "1000px", opacity: 0 } : { marginLeft: "10px", opacity: 1 }} onClick={this.next}>&rarr;</button>
                    </SliderNavSettings>
                    <Slider
                        asNavFor={this.state.nav3}
                        ref={slider => (this.slider2 = slider)}
                        slidesToShow={this.props.sliderNav.quantitySlides}
                        swipeToSlide={true}
                        focusOnSelect={true}
                        centerMode={true}
                        centerPadding={'0px'}
                        autoplay={true}
                        pauseOnHover={true}
                        speed={900}
                        // lazyLoad={'progressively'}
                        autoplaySpeed={this.props.sliderNav.playSpeed}
                        className={this.state.sliderNavSet.open ? "" : "hide"}
                    >
                        {allImgBg}
                    </Slider>
                </div>
                {/* MAIN SLIDER */}
                <div className="slider-main-wrap" style={{ background: this.props.sliderNav.siteBg }} onClick={this.props.onClick}>
                    <Slider
                        asNavFor={this.state.nav1}
                        ref={slider => (this.slider3 = slider)}
                        className={'slider-main'}
                        adaptiveHeight={true}
                        fade={true}
                    >
                        {allImg}
                    </Slider>
                </div>
            </React.Fragment>
        );
    }
}