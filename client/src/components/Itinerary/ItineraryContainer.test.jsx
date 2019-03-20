import React from 'react';
import TestRenderer from 'react-test-renderer';

import ItineraryContainer from './ItineraryContainer';

describe('ItineraryContainer', () => {
  it('should render correctly without flight data', () => {
    const component = TestRenderer.create(<ItineraryContainer />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
