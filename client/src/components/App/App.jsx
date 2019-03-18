import React, { PureComponent } from 'react';
import BpkText from 'bpk-component-text';

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
          <BpkText tagName="p">Over to you...</BpkText>
          <ItineraryContainer></ItineraryContainer>
        </main>
      </div>
    )
  }
}

// const App = () => (
//   <div className={c('App')}>
//     <Header />
//     <main className={c('App__main')}>
//       <BpkText tagName="p">Over to you...</BpkText>
//       <Itinerary></Itinerary>
//     </main>
//   </div>
// );

export default App;
