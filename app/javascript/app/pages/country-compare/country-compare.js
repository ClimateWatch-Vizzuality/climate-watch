import { withProps } from 'recompose';

import { getAnchorLinks } from './country-compare-selectors';

import Component from './country-compare-component';

const withSections = withProps(state => ({
  anchorLinks: getAnchorLinks(state)
}));

export default withSections(Component);
