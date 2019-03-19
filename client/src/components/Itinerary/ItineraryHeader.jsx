import React from 'react';
import PropTypes from 'prop-types';
import BpkText from 'bpk-component-text';
import STYLES from './Itinerary.scss';

const c = className => STYLES[className] || 'UNKNOWN';

const ItineraryHeader = ({ header }) => {
  const direction = 'EDI -> LON';
  const travellers = `${header.Adults + header.Children + header.Infants} travelers`;
  return (
    <div className={c('ItineraryHeader')}>
      <BpkText tagName="h1" textStyle="xl">{direction}</BpkText>
      <BpkText tagName="p">{travellers}, {header.CabinClass}</BpkText>
    </div>
  );
};

ItineraryHeader.propTypes = {
  header: PropTypes.shape({
    Adults: PropTypes.number,
    Children: PropTypes.number,
    Infants: PropTypes.number,
    CabinClass: PropTypes.string,
  }),
};

ItineraryHeader.defaultProps = {
  header: {},
};

export default ItineraryHeader;
