import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

const EXCEPTIONS = [
  'table',
  'mitigation',
  'adaptation',
  'sectoral-information',
  'ndcs',
  'models',
  'scenarios',
  'indicators'
];

class ScrollToTop extends PureComponent {
  componentDidUpdate(prevProps) {
    const currentPath = this.props.location.pathname;
    const paths = currentPath.split('/');
    const lastPath = paths.slice(paths.length - 1)[0];
    if (
      currentPath !== prevProps.location.pathname &&
      EXCEPTIONS.indexOf(lastPath) === -1
    ) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

ScrollToTop.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.node
};

export default withRouter(ScrollToTop);
