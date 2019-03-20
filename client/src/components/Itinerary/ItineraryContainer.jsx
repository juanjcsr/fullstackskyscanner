import React, { Component } from 'react';
import BpkButton from 'bpk-component-button';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import { BpkSpinner } from 'bpk-component-spinner';

import { getSearch, getSearchByPage } from '../../utils/api';
import Itinerary from './Itinerary';
import SearchForm from '../SearchForm/SearchForm';
import ItineraryHeader from './ItineraryHeader';
import ItineraryFilter from './ItineraryFilter';
import STYLES from './Itinerary.scss';

const c = className => STYLES[className] || 'UNKNOWN';

/**
 * ItineraryContainer holds the initial search form for the flights
 * and the list of flights (Cards). This component handles the logic
 * of requesting data to the server.
 */
class ItineraryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itineraries: [],
      query: null,
      currency: {},
      session: '',
      currentPage: 0,
      pending: true,
      loading: false,
      hasError: false,
    };

    this.myRef = React.createRef(); // Will hold the reference to scroll to the top.
    this.getItineraries = this.getItineraries.bind(this);
    this.onSeeMoreClick = this.onSeeMoreClick.bind(this);
    this.getFligthData = this.getFligthData.bind(this);
    this.onSearchAgainClick = this.onSearchAgainClick.bind(this);
  }

  onSeeMoreClick() {
    let nextPage = parseInt(this.state.currentPage, 10) + 1;

    if (this.state.currentPage === 0 && this.state.pending) {
      nextPage = 0;
    }

    this.getFligthData({ session: this.state.session, page: nextPage, searchType: 'paginated' });
  }

  onSearchAgainClick() {
    this.setState({
      itineraries: [],
      query: null,
    });
  }

  getFligthData(values) {
    this.getItineraries({ ...values });
  }

  getItineraries(params) {
    this.setState({ loading: true }); // Put the spinner to run
    if (params.searchType === 'all') { // 'all' means unpaginated results.
      return getSearch(params).then((d) => {
        this.myRef.current.scrollIntoView({ behavior: 'smooth' });
        this.setState({
          itineraries: d.itineraries,
          currency: d.currencies,
          agents: d.agents,
          query: d.query,
          loading: false,
          hasError: false,
        });
      }).catch(() => {
        this.setState({
          loading: false,
          hasError: true,
        });
      });
    }
    // Otherwise, search by page.
    // It will return page 0 until server results are completely updated.
    return getSearchByPage(params).then((d) => {
      let itineraries = [...this.state.itineraries];
      if (this.state.itineraries.length === 0) {
        itineraries = [...d.itineraries];
        this.myRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      if (parseInt(d.page, 10) > parseInt(this.state.currentPage, 10)) {
        itineraries = this.state.itineraries.concat(d.itineraries);
      }
      this.setState({
        itineraries,
        currency: d.currencies,
        agents: d.agents,
        query: d.query,
        pending: d.pending,
        loading: false,
        currentPage: d.page,
        session: d.session,
        hasError: false,
      });
    }).catch(() => {
      this.setState({
        loading: false,
        hasError: true,
      });
    });
  }

  render() {
    const {
      itineraries,
      currency,
      query,
      agents,
    } = this.state;
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
    return (
      <div ref={this.myRef}>
        <BpkGridContainer>
          {
            query == null &&
            <BpkGridRow>
              <SearchForm onSubmit={this.getFligthData} />
            </BpkGridRow>
          }
          {
            query != null &&
            <BpkGridRow>
              <BpkGridColumn width={12}>
                <ItineraryHeader header={query} />
                <ItineraryFilter className={c('ItineraryFilter')} />
              </BpkGridColumn>
            </BpkGridRow>
          }
          {
            itineraries.length > 0 &&
            <BpkGridRow>
              <BpkGridColumn width={12}>
                <Itinerary itineraries={itineraries} currency={currency} agents={agents} />
                <CustomSeeMore />
              </BpkGridColumn>
            </BpkGridRow>
          }
          {
            query != null &&
            <BpkGridRow>
              <BpkGridColumn width={12}>
                <CustomSearchAgain />
              </BpkGridColumn>
            </BpkGridRow>
          }
          {
            this.state.loading &&
            <BpkSpinner />
          }
          {
            this.state.hasError &&
            <h2>API ERROR, TRY AGAIN</h2>
          }
        </BpkGridContainer>
      </div>
    );
  }
}

export default ItineraryContainer;
