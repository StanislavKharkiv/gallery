import React from "react";
import {SettingsMenuOpenContext} from '../SettingsMenuContext';
function SliderNavSettings(props) {
    return (
        <div className="slider-settings">
            {props.children[0]}
            {props.children[1]}
            <SettingsMenuOpenContext.Consumer>
            { value => <button className="btn" onClick={value} data-close="true">настройки</button> }
            </SettingsMenuOpenContext.Consumer>
            {props.children[2]}
        </div>
    )
}
export default SliderNavSettings;