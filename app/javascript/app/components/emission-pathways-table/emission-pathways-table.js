import { PureComponent, createElement } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import { getRouteLinks } from './emission-pathways-table-selectors';
import EmissionPathwaysTableComponent from './emission-pathways-table-component';

class EmissionPathwaysTableContainer extends PureComponent {
  render() {
    const routeData = {
      routes: this.props.routes,
      hash: location && location.hash
    };

    return createElement(
      EmissionPathwaysTableComponent,
      Object.assign(
        {
          ...this.props
        },
        { anchorLinks: getRouteLinks(routeData) }
      )
    );
  }
}

EmissionPathwaysTableContainer.propTypes = {
  routes: PropTypes.array
};

export default withRouter(EmissionPathwaysTableContainer);
