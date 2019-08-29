import React from "react"

export default function GalleryInfo(props) {
    return (
        <div className="gallery-info">
            <span>{props.imgQuantity} изображений</span>
        </div>
    )
}