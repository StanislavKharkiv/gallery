import React from "react";
import Preloader from "../functionComponents/Preloader";
import axios from "axios";
let allImgSrc;
export default class AllImage extends React.Component {
    state = {
        loadSite: false
    }
    getImgFromServer = (path) => {
        let allImgSrc2 = [];
        axios.get(path)
            // .then(response => response.json())
            .then(response => {
                for (let value of response.data) {
                    allImgSrc2.push(`${path}/img/${value}`);
                }
                allImgSrc = allImgSrc2;
            })
            .then((e) => {
                this.setState({ loadSite: true });
            })
            .catch((error) => {
                console.log(error);
                allImgSrc = ["/img/car1.jpg", "/img/car2.jpg", "/img/car3.jpg", "/img/car4.jpg", "/img/car5.jpg"];
                this.setState({ loadSite: true });
            })
    }
    // componentDidMount() {
    //     this.getImgFromServer("http://slider");
    // }
    render() {
        return (
            <section className="all-images" style={this.props.width} onTransitionEnd={()=> this.getImgFromServer("http://slider")}>
                <div className="all-images-wrapper">
                    {this.state.loadSite ? allImgSrc.map((value, index) => <img className="all-images__image" src={value} key={index} alt={"image - " + value} />) : <Preloader />}
                </div>
                <span className="all-images__close" onClick={this.props.open}>
                    {this.props.openState ? <span>&times;</span> : <span>&#9776;</span>}
                </span>
            </section>
        )
    }
} 