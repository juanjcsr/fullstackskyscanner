import React, { Component } from 'react';

import ApiUtils from './../../utils/api';
import Itinerary from './Itinerary';


class ItineraryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            itineraries: {}, 
            currency: {} 
        };

        const api = new ApiUtils();
        console.log(api)
        this.getItineraries = this.getItineraries.bind(this, api);
        
    }

    getItineraries(api) {
        return api.getSearch();
    }

    componentDidMount(){
        console.log("mounted");
        this.getItineraries().then( d => {
            console.log("DATAAA", d);
            this.setState({itineraries: d.itineraries, currency: d.currencies})
        })
    }

    render() {
        const { itineraries, currency } = this.state
        console.log("RERENDER", itineraries)
        return(
            <Itinerary itineraries={itineraries} currency={currency}></Itinerary>
        )
    }
}

export default ItineraryContainer;