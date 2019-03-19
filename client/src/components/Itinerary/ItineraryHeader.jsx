import React from 'react';
import BpkText from  'bpk-component-text';
import STYLES from './Itinerary.scss';

const c = className => STYLES[className] || 'UNKNOWN';


const ItineraryHeader = ({header, ...props}) => {

    const direction = `EDI -> LON`;
    console.log("HEADER", header);
    const travellers = `${header.Adults + header.Children + header.Infants} travelers`;
    return (
        <div className={c('ItineraryHeader')}>
            <BpkText tagName="h1" textStyle="xl">{direction}</BpkText>
            <BpkText tagName="p">{travellers}, {header.CabinClass}</BpkText>
        </div>
    )
}

export default ItineraryHeader;