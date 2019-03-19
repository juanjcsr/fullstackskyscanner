import React, { Component } from 'react';

import BpkSelect from 'bpk-component-select';
import BpkButton from 'bpk-component-button';
import BpkLabel from 'bpk-component-label';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: 'EDI',
      to: 'LHR',
      adults: '1',
      children: '0',
      infants: '0',
      fclass: 'economy',
      departure: '2019-03-25',
      returnd: '2019-03-26',
    };

    this.getFlights = this.getFlights.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  getFlights(event) {
    event.preventDefault();
    console.log('toSubmit', this.state);
    this.props.onSubmit(this.state);
  }

  changeHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }
  render() {
    const {
      adults,
      children,
      infants,
      fclass,
      departure,
      returnd,
    } = this.state;
    return (

      <form onSubmit={this.getFlights}>
        <BpkLabel>From: </BpkLabel>
        <BpkInput
          id="from_text"
          dockedFirst
          disabled
          type={INPUT_TYPES.text}
          name="from"
          value="Edimburg"
          placeholder="Country, city or airport"
        />
        <BpkLabel>To: </BpkLabel>
        <BpkInput
          id="to_text"
          disabled
          dockedLast
          type={INPUT_TYPES.text}
          name="to"
          value="London"
          placeholder="Country, city or airport"
        />

        <BpkLabel>Number of adults</BpkLabel>
        <BpkSelect
          id="adults"
          label="Number of adults"
          name="adults"
          value={adults}
          onChange={this.changeHandler}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="4">5</option>
          <option value="5">6</option>
          <option value="6">7</option>
          <option value="8">8</option>

        </BpkSelect>

        <BpkLabel>Number of children</BpkLabel>
        <BpkSelect
          id="children"
          label="Number of children"
          name="children"
          value={children}
          onChange={this.changeHandler}
        >
          <option value="8">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="4">5</option>
          <option value="5">6</option>
          <option value="6">7</option>
          <option value="8">8</option>

        </BpkSelect>

        <BpkLabel>Number of infants</BpkLabel>
        <BpkSelect
          label="Number of infants"
          id="infants"
          name="infants"
          value={infants}
          onChange={this.changeHandler}
        >
          <option value="8">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="4">5</option>
          <option value="5">6</option>
          <option value="6">7</option>
          <option value="8">8</option>

        </BpkSelect>

        <BpkLabel>Class</BpkLabel>
        <BpkSelect
          id="fclass"
          name="fclass"
          label="Flight Class"
          value={fclass}
          onChange={this.changeHandler}
        >
          <option value="economy">Economy</option>
          <option value="premiumeconomy">Premium Economy</option>
          <option value="business">Business</option>
          <option value="first">First</option>

        </BpkSelect>

        <BpkLabel>Departure date: </BpkLabel>
        <BpkInput
          id="departure_text"
          dockedFirst
          disabled
          type={INPUT_TYPES.text}
          name="departure"
          value={departure}
          placeholder="Country, city or airport"
        />
        <BpkLabel>Return Date: </BpkLabel>
        <BpkInput
          id="return_text"
          disabled
          dockedLast
          type={INPUT_TYPES.text}
          name="returnd"
          value={returnd}
          placeholder="Country, city or airport"
        />
        <BpkButton onClick={this.getFlights}>Search Flights</BpkButton>
      </form>


    );
  }
}

export default SearchForm;
