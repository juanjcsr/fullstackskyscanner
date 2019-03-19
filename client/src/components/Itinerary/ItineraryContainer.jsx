import React, { Component } from 'react';
import BpkButton from 'bpk-component-button';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import { BpkSpinner } from 'bpk-component-spinner';

import { getSearch, getSearchByPage } from './../../utils/api';
import Itinerary from './Itinerary';
import SearchForm from './../SearchForm/SearchForm';
import ItineraryHeader from './ItineraryHeader';
import ItineraryFilter from './ItineraryFilter';
import STYLES from './Itinerary.scss';

const c = className => STYLES[className] || 'UNKNOWN';


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
    };

    // const api = new ApiUtils();
    this.getItineraries = this.getItineraries.bind(this);
    this.onSeeMoreClick = this.onSeeMoreClick.bind(this);
    this.getFligthData = this.getFligthData.bind(this);
    this.onSearchAgainClick = this.onSearchAgainClick.bind(this);
  }

  componentDidMount() {
    console.log('mounted');
    // this.getItineraries()
  }

  onSeeMoreClick() {
    const nextPage = this.state.currentPage + 1;
    this.getItineraries(nextPage);
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
    this.setState({ loading: true });
    return getSearchByPage(params).then((d) => {
      this.setState({
        itineraries: d.itineraries,
        currency: d.currencies,
        agents: d.agents,
        query: d.query,
        loading: false,
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
      <div>
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
        </BpkGridContainer>
      </div>
    );
  }
}

export default ItineraryContainer;
