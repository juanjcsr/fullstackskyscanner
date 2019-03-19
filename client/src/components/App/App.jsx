import React, { PureComponent } from 'react';
import STYLES from './App.scss';
import Header from './../Header';

import ItineraryContainer from  './../Itinerary/ItineraryContainer';

const c = className => STYLES[className] || 'UNKNOWN';

class App extends PureComponent{

  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }

  render() {
    return(
      <div className={c('App')}>
        <Header />
        <main className={c('App__main')}>
          <ItineraryContainer></ItineraryContainer>
        </main>
      </div>
    )
  }
}
export default App;
