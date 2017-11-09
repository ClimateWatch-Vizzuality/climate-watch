import { PureComponent, createElement } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import QueryMenuComponent from './query-menu-component';

class QueryMenuContainer extends PureComponent {
  render() {
    const { location, options } = this.props;

    const links = options.map(option => {
      const optionWithHash = option;
      optionWithHash.hash = location && location.hash;
      return optionWithHash;
    });

    return createElement(QueryMenuComponent, {
      links
    });
  }
}

QueryMenuContainer.propTypes = {
  location: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired
};

export default withRouter(QueryMenuContainer);
