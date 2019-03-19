import React from 'react';
import ReactDOM from 'react-dom';

import TestRenderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import ItineraryContainer from './ItineraryContainer'

Enzyme.configure({ adapter: new Adapter() });

describe('ItineraryContainer', () => {
  it('should render correctly without flight data', () => {
    const component = TestRenderer.create(<ItineraryContainer />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
