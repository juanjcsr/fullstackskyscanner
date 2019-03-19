import React from 'react';
import PropTypes from 'prop-types';

import BpkCard from 'bpk-component-card';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkButton from 'bpk-component-button';
import BpkText from 'bpk-component-text';
import { BpkAccordion, BpkAccordionItem, withAccordionItemState } from 'bpk-component-accordion';

import Leg from './../Leg/Leg';
import SegmentList from './../SegmentList/SegmentList';

import STYLES from './Card.scss';


const c = className => STYLES[className] || 'UNKNOWN';

const StatefulAccordionItem = withAccordionItemState(BpkAccordionItem);

const Card = ({
  itinerary, currency, agent, onClick,
}) => {
  const lowestPrice = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency.Code,
  }).format(itinerary.PricingOptions[0].Price);
  return (
    <BpkCard onClick={onClick} className={c('Card')}>
      <BpkGridContainer>
        {/* <span id="favicon">{itinerary.icon}</span> */}
        <BpkGridRow>
          <Leg
            legData={itinerary.OutboundLeg}
            directionality={itinerary.OutboundLeg.Directionality}
          />
        </BpkGridRow>
        <BpkGridRow>
          <Leg
            legData={itinerary.InboundLeg}
            directionality={itinerary.InboundLeg.Directionality}
          />
        </BpkGridRow>
        <BpkGridRow>
          <BpkGridColumn width={8}>
            <BpkText tagName="p" bold textStyle="lg">{lowestPrice} </BpkText>
            <BpkText tagName="p">{agent[0].Name}</BpkText>
          </BpkGridColumn>
          <BpkGridColumn width={4}>
            <BpkButton>Select</BpkButton>
          </BpkGridColumn>
        </BpkGridRow>
      </BpkGridContainer>
      {(itinerary.OutboundLeg.Stops.length > 0 || itinerary.InboundLeg.Stops.length > 0) &&
        <BpkAccordion>
          <StatefulAccordionItem id="stops" title="Stops">
            <SegmentList segments={itinerary.OutboundLeg.SegmentsDetail} />
            ----------
            <SegmentList segments={itinerary.InboundLeg.SegmentsDetail} />
          </StatefulAccordionItem>
        </BpkAccordion>
      }

    </BpkCard>
  );
};

Card.propTypes = {
  itinerary: PropTypes.objectOf(PropTypes.any),
  currency: PropTypes.objectOf(PropTypes.any),
  agent: PropTypes.arrayOf(PropTypes.any),
  onClick: PropTypes.func,
};

Card.defaultProps = {
  itinerary: {},
  currency: {},
  agent: [],
  onClick: () => {},
};

export default Card;
