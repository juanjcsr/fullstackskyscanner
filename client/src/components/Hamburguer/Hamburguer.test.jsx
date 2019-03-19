import React from 'react';
import TestRenderer from 'react-test-renderer';

import Hamburger from './Hamburguer';

describe('Hamburguer', () => {
  it('should render correctly', () => {
    const tree = TestRenderer.create(<Hamburger />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
