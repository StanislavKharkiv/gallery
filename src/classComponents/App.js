import React from 'react';
import { SettingsMenuOpenContext } from './SettingsMenuContext';
import AllSliders from './slick/AllSliders';
import './main.css';
import SettingsMenu from '../functionComponents/SettingsMenu';
// static path from site
let allImgSrc = ["/img/car1.jpg", "/img/car2.jpg", "/img/car3.jpg", "/img/car4.jpg", "/img/car5.jpg", "/img/car6.jpg", "/img/car7.jpg", "/img/car8.jpg", "/img/car9.jpg", "/img/car10.jpg", "https://cdn.pixabay.com/photo/2012/11/02/13/02/ford-63930_1280.jpg"];

class App extends React.Component {
    state = {
        quantitySlides: 5,
        siteBg: "rgba(0, 0, 0, .7)",
        SettingsMenuOpen: false,
        autoPlay: true,
        playSpeed: 5000,
        loadSite: true
    }
    // get path from server in JSON format and parse it ***
    getImgFromServer = (path) => {
        let allImgSrc2 = [];
        fetch(path)
            .then(response => response.json())
            .then(commits => {
                console.log("JSON: ", commits);
                for (let value of commits) {
                    allImgSrc2.push(`${path}/img/${value}`);
                }
                //allImgSrc = allImgSrc2;
            })
            .then(() => {
                console.log('callback')
                this.setState({loadSite: true})
            })
    }

    // ***
    handlerQuantitySlides = (e) => {
        if (e.target.getAttribute('name') === 'quantity-slides')
            this.setState({ quantitySlides: parseInt(e.target.getAttribute('value'), 10) })
    }
    handlerSiteBg = (e) => {
        if (e.target.getAttribute('name') === 'site-bg') {
            this.setState({ siteBg: e.target.getAttribute('value') });
        }
    }
    handlerAutoPlay = () => {
        this.setState({ autoPlay: !this.state.autoPlay });
    }
    handlerSettingsMenuOpen = (e) => {
        let targetAttr = e.target.getAttribute("data-close");
        if (targetAttr === null) {
            this.setState({ SettingsMenuOpen: false });
        } else {
            this.setState({ SettingsMenuOpen: !this.state.SettingsMenuOpen });
        }
    }
    handlerSliderSpeed = (e) => {
        let timeInMiliseconds = (+e.target.value) * 1000;
        this.setState({ playSpeed: timeInMiliseconds });
    }
    componentDidMount() {
        this.getImgFromServer("http://slider");
        console.log('App mount')
    }
    render() {
        return (
            <div className="wrapper">
                <SettingsMenuOpenContext.Provider value={this.handlerSettingsMenuOpen} >
                    <SettingsMenu width={this.state.SettingsMenuOpen ? "35%" : "0%"} closeClick={this.handlerSettingsMenuOpen}>
                        <div className="settings-menu__quantity-slides" onClick={this.handlerQuantitySlides}>
                            <label><input type="radio" name="quantity-slides" value="3" /> 3 изображения</label>
                            <label><input type="radio" name="quantity-slides" value="5" defaultChecked /> 5 изображений</label>
                            <label><input type="radio" name="quantity-slides" value="7" /> 7 изображений</label>
                        </div>
                        <div className="settings-menu__site-bg" onClick={this.handlerSiteBg}>
                            <label><input type="radio" name="site-bg" value="rgba(0, 0, 0, .7)" defaultChecked /> Изображение</label>
                            <label><input type="radio" name="site-bg" value="black" /> Черный</label>
                            <label><input type="radio" name="site-bg" value="white" /> Белый</label>
                        </div>
                        <div className="settings-menu__auto-play">
                            <h4>Автоматическая смена изображений</h4>
                            <label><input type="checkbox" name="auto-play" onClick={this.handlerAutoPlay} defaultChecked />{this.state.autoPlay ? 'включено' : 'выключено'}</label>
                            <label>Cкорость воспроизведения в секундах <br /><input type="number" name="auto-play-speed" onInput={this.handlerSliderSpeed} defaultValue={this.state.playSpeed / 1000} min="1" max="100" /></label>
                        </div>
                        <span className="settings-menu__close" onClick={this.handlerSettingsMenuOpen} data-close="true">{this.state.SettingsMenuOpen ? <span data-close="true">&times;</span> : <span data-close="true">&#9776; </span>}</span>
                    </SettingsMenu>
                    {this.state.loadSite ? <AllSliders imgSrc={allImgSrc} sliderNav={this.state} onClick={this.handlerSettingsMenuOpen} /> : <h1>Loading...</h1>}
                </SettingsMenuOpenContext.Provider>
            </div>
        )
    }
}

export default App;