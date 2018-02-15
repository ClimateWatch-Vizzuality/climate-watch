import { withProps } from 'recompose';
import qs from 'query-string';

import Component from './ndc-sdg-component';

const withGoalSelected = withProps(({ location }) => ({
  isOpen: !!qs.parse(location.search).goal
}));

export default withGoalSelected(Component);
