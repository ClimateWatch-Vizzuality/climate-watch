import { withRouter } from 'react-router';
import { PureComponent, createElement } from 'react';
import { getLocationParamUpdated } from 'utils/navigation';
import PropTypes from 'prop-types';
import Component from './emission-pathways-table-menu-component';

class EmissionPathwaysTableMenuContainer extends PureComponent {
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.updateUrlParam({ name: 'search', value: '' });
    }
  }

  updateUrlParam(param) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, param));
  }

  render() {
    return createElement(Component, { ...this.props });
  }
}

EmissionPathwaysTableMenuContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(EmissionPathwaysTableMenuContainer);
