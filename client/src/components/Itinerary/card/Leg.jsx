import React from 'react';

import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkText from 'bpk-component-text';
import BpkSmallLongArrowRigthIcon  from 'bpk-component-icon/sm/long-arrow-right';
import BpkSmallLongArrowLeftIcon  from 'bpk-component-icon/sm/long-arrow-left';
import AirlineIcon from '../card/Icon';

const datestringToDate = ( dateString ) =>{
    const d = new Date(dateString);
    return `${d.getHours()}:${d.getMinutes()}`
}


const Leg = ({legData, directionality, ...props}) => {
    const legTime = `${Math.floor(legData.Duration / 60)}h ${legData.Duration % 60}m `;
    const stops = legData.Stops.length === 0 ? "Direct" : `${legData.Stops.length} Stops`;
    const firstCarrier = legData.SegmentsDetail[0].CarrierName[0];
    const color = stops === 'Direct' ? 'rgb(0, 215, 117)' : 'rgb(255, 84, 82)';
    const backgroundColor = {
        "color": color
    };
    return (        
        <>
            <BpkGridColumn width={1}>
                <AirlineIcon iconData={firstCarrier.Code}></AirlineIcon>
            </BpkGridColumn>
            <BpkGridColumn width={2}>
                <BpkText tagName="p">{datestringToDate(legData.Departure)}</BpkText>
                <BpkText tagName="p">{legData.OriginStationPlace[0].Code}</BpkText>
            </BpkGridColumn>
            <BpkGridColumn width={1}>
                {directionality === "Outbound" ? <BpkSmallLongArrowRigthIcon /> :<BpkSmallLongArrowLeftIcon />}
            </BpkGridColumn>
            <BpkGridColumn width={2}>
                <BpkText tagName="p">{datestringToDate(legData.Arrival)}</BpkText>
                <BpkText tagName="p">{legData.DestinationStationPlace[0].Code}</BpkText>
            </BpkGridColumn>   
            <BpkGridColumn width={3} offset={3}>
                <BpkText tagName="p">{legTime}</BpkText>
                <BpkText tagName="p" style={backgroundColor}>{stops}</BpkText>
            </BpkGridColumn>
        </>
    )
}

export default Leg;