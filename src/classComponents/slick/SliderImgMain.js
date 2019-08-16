import React from 'react'
const SliderImgMain = props => {
    return(
        <div className="slider-main__img-wrapper">
            <img style={{width: "100%"}} src={props.src} alt="car..." />
        </div>
    )
}
export default SliderImgMain;