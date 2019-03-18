import React from 'react';

import STYLES from './Card.scss'


const style = {
    position: 'relative',

    width: "30px",
    // height: "100%",
}

const AirlineIcon = ({iconData, ...props}) => {
    // const imgUrl = 
    const imgUrl = `https://logos.skyscnr.com/images/airlines/favicon/${iconData}.png`
    return (
        <div>
            <img src={imgUrl} style={style}></img>
        </div>
        
    )
}

export default AirlineIcon;