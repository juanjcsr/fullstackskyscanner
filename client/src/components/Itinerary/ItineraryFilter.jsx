import React from 'react';
import BpkButton from 'bpk-component-button';
import { lineHeightBase, iconSizeSm } from 'bpk-tokens/tokens/base.es6';

import { BpkGridColumn } from 'bpk-component-grid';
import BpkSmallPriceAlertsIcon from 'bpk-component-icon/sm/price-alerts';
import { withAlignment } from 'bpk-component-icon';


import STYLES from './Itinerary.scss';

const c = className => STYLES[className] || 'UNKNOWN';

const AlignedBell = withAlignment(BpkSmallPriceAlertsIcon, lineHeightBase, iconSizeSm);

const ItineraryFilter = () => (
  <div>
    <BpkGridColumn width={2} className={c('ItineraryFilter')}>
      <BpkButton link>Filter</BpkButton>
    </BpkGridColumn>
    <BpkGridColumn width={2} className={c('ItineraryFilter')}>
      <BpkButton link>Sort</BpkButton>
    </BpkGridColumn>
    <BpkGridColumn width={4} className={c('ItineraryFilter')}>
      <BpkButton link>&nbsp;</BpkButton>
    </BpkGridColumn>
    <BpkGridColumn width={4} className={c('ItineraryFilter')}>
      <BpkButton link> <AlignedBell />Price Alerts</BpkButton>
    </BpkGridColumn>
  </div>
);

export default ItineraryFilter;
