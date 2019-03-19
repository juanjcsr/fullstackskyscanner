import React from 'react';
import STYLES from './App.scss';
import Header from './../Header';

import ItineraryContainer from './../Itinerary/ItineraryContainer';

const c = className => STYLES[className] || 'UNKNOWN';

const App = () => (
  <div className={c('App')}>
    <Header />
    <main className={c('App__main')}>
      <ItineraryContainer />
    </main>
  </div>
);

export default App;
