import React from "react"

export default function GalleryInfo(props) {
    return (
        <div className="gallery-info">
            <span>№ {props.slideIndex} из </span>
            <span>{props.imgQuantity}</span>     
        </div>
    )
}