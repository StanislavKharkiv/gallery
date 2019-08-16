import React from 'react';
function SettingsMenu(props) {
    return (
        <div className="settings-menu" style={{width: props.width}}>
            <h2 className="settings-menu__header">настройки</h2>
            {props.children}
        </div>
    )
}
export default SettingsMenu;