import React, { Component } from 'react';

import ApiUtils from './../../utils/api';
import Itinerary from './Itinerary';

import BpkButton from 'bpk-component-button';


class ItineraryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            itineraries: [], 
            currency: {}, 
            session: "",
            currentPage: 0,
            pending: true,
        };

        const api = new ApiUtils();
        console.log(api)
        this.getItineraries = this.getItineraries.bind(this, api);
        this.onSeeMoreClick = this.onSeeMoreClick.bind(this)
    }


    getItineraries(api) {
        return api.getSearch().then( d => {
            this.setState({itineraries: d.itineraries, currency: d.currencies})
        });
    }

    // getItineraries(api, page) {
    //     const {session, pending} = this.state;
    //     console.log("currentState", this.state)
    //     if (session && session != ""){
            
    //         let next = pending ? 0 : page;
    //         console.log("PAGEPAGE", page, pending, next)
    //         api.getSearch({session, page: next}).then( d => {
    //             console.log("DATAAA with session", d);
    //             // d.itineraries.
    //             if (!d.pending ) {
    //                 this.setState({pending: d.pending})
    //                 if (next != 0 ) {
    //                     const currentItineraries = [...this.state.itineraries];
    //                     console.log("current", currentItineraries)
    //                     currentItineraries.push(...d.itineraries)
    //                     console.log(currentItineraries.length, currentItineraries);
    //                     this.setState({
    //                         itineraries: currentItineraries, 
    //                         currency: d.currencies,
    //                         session: d.session,
    //                         currentPage: d.page,
    //                         pending: d.pending
    //                     })
    //                 }
                    
    //             }
    //             // const page = d.pending ? 0 : d.page
                
                
    //             // this.setState({
    //             //     itineraries: currentItineraries, 
    //             //     currency: d.currencies,
    //             //     session: d.session,
    //             //     currentPage: page
    //             // })
    //         })
    //     } else {
    //         return api.getSearch().then( d => {
    //             console.log("DATAAA no session", d);
    //             // d.itineraries.
    //             const page = d.pending ? 0 : d.page
    //             let currentItineraries = [...this.state.itineraries];

    //             console.log("current", currentItineraries, d.itineraries)
    //             currentItineraries.push(...d.itineraries)
    //             console.log(currentItineraries.length, currentItineraries);
    //             this.setState({
    //                 itineraries: currentItineraries, 
    //                 currency: d.currencies,
    //                 session: d.session,
    //                 currentPage: page,
    //                 pending: d.pending
    //             })
    //         });
    //     }
        
    // }

    componentDidMount(){
        console.log("mounted");
        this.getItineraries()
    }

    onSeeMoreClick(e) {
        let nextPage = this.state.currentPage + 1
        this.getItineraries(nextPage)
    }

    render() {
        const { itineraries, currency } = this.state
        const CustomSeeMore = () => (
            <div>
              <BpkButton onClick={this.onSeeMoreClick}>See More</BpkButton>
            </div>
          );
        console.log("RERENDERRR", itineraries, currency)
        return(
            <div>
                <Itinerary itineraries={itineraries} currency={currency}></Itinerary>
                
                <CustomSeeMore></CustomSeeMore>
            </div>
            
        )


    }
}

export default ItineraryContainer;