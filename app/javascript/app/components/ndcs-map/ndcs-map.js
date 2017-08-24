import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import paths from 'app/data/world-50m-paths';
import Component from './ndcs-map-component';

const mapStateToProps = state => ({
  ndcs: state.ndcs.data
});

class NDCMapContainer extends PureComponent {
  handleCountryClick = (geography) => {
    this.props.history.push(`ndcs/country/${geography.id}`);
  };

  render() {
    return createElement(Component, {
      ...this.props,
      paths,
      handleCountryClick: this.handleCountryClick
    });
  }
}

NDCMapContainer.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps)(NDCMapContainer));
