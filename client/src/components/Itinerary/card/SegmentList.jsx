import React from 'react';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import AirlineIcon from './Icon';
import BpkText from 'bpk-component-text/src/BpkText';


const datestringToDate = ( dateString ) =>{
    const d = new Date(dateString);
    const minutes = d.getMinutes();
    const minutesString = minutes > 10 ? minutes : `0${minutes}`
    return `${d.getHours()}:${minutesString}`
}

const SegmentList = ( {segments, ...props} ) => {

    console.log(segments)
    const segmentsData = segments.map( (s,i) => {
        const legTime = `${Math.floor(s.Duration / 60)}h ${s.Duration % 60}m `;
        return (
            <BpkGridRow key={i}>
                <BpkGridColumn width={2}>
                    <AirlineIcon iconData={s.CarrierName[0].Code}></AirlineIcon>
                </BpkGridColumn>
                <BpkGridColumn width={2}>
                    <BpkText tagName="p">Departure</BpkText>
                    <BpkText tagName="p">{datestringToDate(s.DepartureDateTime)}</BpkText>
                </BpkGridColumn>
                <BpkGridColumn width={2}>
                    <BpkText tagName="p">{s.OriginStationPlace[0].Name}</BpkText>
                </BpkGridColumn>
                <BpkGridColumn width={2}>
                    <BpkText tagName="p">Arrival</BpkText>
                    <BpkText tagName="p">{datestringToDate(s.ArrivalDateTime)}</BpkText>
                </BpkGridColumn>
                <BpkGridColumn width={2}>
                    <BpkText tagName="p">{s.DestinationStationPlace[0].Name}</BpkText>
                </BpkGridColumn>
                <BpkGridColumn width={2}>
                    <BpkText tagName="p">{legTime}</BpkText>
                    {/* <BpkText></BpkText> */}
                </BpkGridColumn>
                    {/* <AirlineIcon iconData={firstCarrier.Code}></AirlineIcon> */}
            </BpkGridRow>
        )
    })

    return(
        <BpkGridContainer >
            {segmentsData}
        </BpkGridContainer>
    )
}

export default SegmentList;