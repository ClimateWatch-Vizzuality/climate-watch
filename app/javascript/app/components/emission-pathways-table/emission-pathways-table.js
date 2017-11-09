import { PureComponent, createElement } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import { getRouteLinks } from './emission-pathways-table-selectors';
import EmissionPathwaysTableComponent from './emission-pathways-table-component';

class EmissionPathwaysTableContainer extends PureComponent {
  render() {
    return createElement(
      EmissionPathwaysTableComponent,
      Object.assign(
        {
          ...this.props
        },
        { anchorLinks: getRouteLinks(this.props.routes) }
      )
    );
  }
}

EmissionPathwaysTableContainer.propTypes = {
  routes: PropTypes.array
};

export default withRouter(EmissionPathwaysTableContainer);
