import React from 'react';
import PropTypes from 'prop-types';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkText from 'bpk-component-text/src/BpkText';
import AirlineIcon from './Icon';

const datestringToDate = (dateString) => {
  const d = new Date(dateString);
  const minutes = d.getMinutes();
  const minutesString = minutes > 10 ? minutes : `0${minutes}`;
  return `${d.getHours()}:${minutesString}`;
};

const SegmentList = ({ segments }) => {
  const segmentsData = segments.map((s) => {
    const legTime = `${Math.floor(s.Duration / 60)}h ${s.Duration % 60}m `;
    return (
      <BpkGridRow key={s.Id}>
        <BpkGridColumn width={2}>
          <AirlineIcon iconData={s.CarrierName[0].Code} />
        </BpkGridColumn>
        <BpkGridColumn width={2}>
          <BpkText textStyle="sm" tagName="p">Departure</BpkText>
          <BpkText textStyle="sm" tagName="p" bold>{datestringToDate(s.DepartureDateTime)}</BpkText>
        </BpkGridColumn>
        <BpkGridColumn width={2}>
          <BpkText textStyle="sm" tagName="p">From:</BpkText>
          <BpkText textStyle="sm" tagName="p" bold>{s.OriginStationPlace[0].Name}</BpkText>
        </BpkGridColumn>
        <BpkGridColumn width={2}>
          <BpkText textStyle="sm" tagName="p">Arrival</BpkText>
          <BpkText textStyle="sm" tagName="p" bold>{datestringToDate(s.ArrivalDateTime)}</BpkText>
        </BpkGridColumn>
        <BpkGridColumn width={2}>
          <BpkText textStyle="sm" tagName="p">To:</BpkText>
          <BpkText textStyle="sm" tagName="p" bold>{s.DestinationStationPlace[0].Name}</BpkText>
        </BpkGridColumn>
        <BpkGridColumn width={2}>
          <BpkText textStyle="sm" tagName="p">From:</BpkText>
          <BpkText textStyle="sm" tagName="p" bold>{legTime}</BpkText>
          {/* <BpkText></BpkText> */}
        </BpkGridColumn>
        {/* <AirlineIcon iconData={firstCarrier.Code}></AirlineIcon> */}
      </BpkGridRow>
    );
  });

  return (
    <BpkGridContainer >
      {segmentsData}
    </BpkGridContainer>
  );
};

SegmentList.propTypes = {
  segments: PropTypes.arrayOf(PropTypes.object),
};

SegmentList.defaultProps = {
  segments: [],
};

export default SegmentList;
