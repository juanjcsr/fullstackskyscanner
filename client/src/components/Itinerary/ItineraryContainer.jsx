import React, { Component } from 'react';

import ApiUtils from './../../utils/api';
import Itinerary from './Itinerary';
import SearchForm from './../SearchForm/SearchForm'
import BpkButton from 'bpk-component-button';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import { BpkSpinner  } from 'bpk-component-spinner';

class ItineraryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            itineraries: [], 
            query: null,
            currency: {}, 
            session: "",
            currentPage: 0,
            pending: true,
            loading: false,
        };

        const api = new ApiUtils();
        console.log(api)
        this.getItineraries = this.getItineraries.bind(this, api);
        this.onSeeMoreClick = this.onSeeMoreClick.bind(this)
        this.getFligthData = this.getFligthData.bind(this)
        this.onSearchAgainClick = this.onSearchAgainClick.bind(this);
    }


    getItineraries(api, params) {
        this.setState({loading: true})
        return api.getSearchByPage(params).then( d => {
            this.setState({
                itineraries: d.itineraries, 
                currency: d.currencies, 
                query: d.query,
                loading: false
            })
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
        // this.getItineraries()
    }

    getFligthData(values){
        console.log("SUBMITED", values);
        this.getItineraries({...values})
        
    }

    onSeeMoreClick(e) {
        let nextPage = this.state.currentPage + 1
        this.getItineraries(nextPage)
    }

    onSearchAgainClick(e) {
        this.setState({
            itineraries: [],
            query: null
        })
    }

    render() {
        const { itineraries, currency, query } = this.state
        const CustomSeeMore = () => (
            <div>
                <BpkButton onClick={this.onSeeMoreClick}>See More</BpkButton>
            </div>
        );

        const CustomSearchAgain = () => (
            <div>
                <BpkButton onClick={this.onSearchAgainClick}>Search Again</BpkButton>
            </div>
        );
        console.log("RERENDERRR", itineraries, currency)
        return(
            <div>
                <BpkGridContainer>
                    {
                        query == null &&
                        <BpkGridRow>
                            <SearchForm onSubmit={this.getFligthData}></SearchForm>
                        </BpkGridRow>
                    }
                    {
                        itineraries.length > 0 && 
                        <BpkGridRow>
                            <BpkGridColumn width={12}>
                                <Itinerary itineraries={itineraries} currency={currency}></Itinerary>
                                <CustomSeeMore></CustomSeeMore>
                            </BpkGridColumn>
                        </BpkGridRow>
                    }
                    {
                        query != null &&
                        <BpkGridRow>
                            <BpkGridColumn width={12}>
                                <CustomSearchAgain></CustomSearchAgain>
                            </BpkGridColumn>
                        </BpkGridRow>
                    }
                    {
                        this.state.loading &&
                        <BpkSpinner></BpkSpinner>
                    }
                </BpkGridContainer>
                
            </div>
            
        )


    }
}

export default ItineraryContainer;