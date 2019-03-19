import React from 'react';
import PropTypes from 'prop-types';
import Card from './card/Card';

const createCards = (itineraries, currency, agents) => {
  const cards = [];
  if (itineraries.length) {
    // const { itineraries, currency } = this.state;
    itineraries.forEach((c) => {
      cards.push(
        <Card
          key={`${c.OutboundLegId}-${c.InboundLegId}`}
          itinerary={c}
          currency={currency}
          agent={agents[c.PricingOptions[0].Agents[0]]}
        />);
    });
  }
  return cards;
};

const Itinerary = ({ itineraries, currency, agents }) =>
  // const { itineraries, currency, agents } = props;
  (
    <div id="modal-container">
      <div id="pagewrap">
        {createCards(itineraries, currency, agents)}
      </div>
    </div>
  );

Itinerary.propTypes = {
  itineraries: PropTypes.arrayOf(PropTypes.any),
  currency: PropTypes.objectOf(PropTypes.any),
  agents: PropTypes.objectOf(PropTypes.any),
};

Itinerary.defaultProps = {
  itineraries: [],
  currency: {},
  agents: [],
};

export default Itinerary;
