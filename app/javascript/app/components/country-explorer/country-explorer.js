import { Component, createElement } from 'react';
import { clickOutside } from 'utils/react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import CountryExplorer from './country-explorer-component';
import { default as actions } from './country-explorer-actions';

class CountryExplorerContainer extends Component {
  componentWillReceiveProps(nextProps) {
    const { clickedOutside, closeCountryExplorer, open } = nextProps;
    if (open && clickedOutside) closeCountryExplorer();
  }

  render() {
    const { toggleCountryExplorer, match } = this.props;
    const onLabelClick = () => toggleCountryExplorer();
    const selected = match ? match.params.iso : null;

    return createElement(CountryExplorer, {
      ...this.props,
      onLabelClick,
      label: 'Countries',
      selected
    });
  }
}

const mapStateToProps = (state, { match }) => ({
  ...state.countryExplorer,
  match
});

export { default as reducers } from './country-explorer-reducers';
export { default as actions } from './country-explorer-actions';

export default withRouter(
  connect(mapStateToProps, actions)(clickOutside(CountryExplorerContainer))
);
