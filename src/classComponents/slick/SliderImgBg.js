import React from 'react'
const SliderImgBg = props => {
    return(
        <div className="slider-bg__img-wrapper">
            <div className="slider-bg__img" style={{background: `url(${props.src}) center no-repeat`, backgroundSize: "cover"}}></div>
        </div>
    )
}
export default SliderImgBg;