import { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ScrollToHighlightIndex extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    setTimeout(this.handleScroll(), 1500);
  }

  handleScroll = () => {
    const { idx, targetElementsSelector } = this.props;
    const e = document.querySelectorAll(targetElementsSelector)[idx];
    window.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: e.offsetTop - 100
    });
  };

  render() {
    return null;
  }
}

ScrollToHighlightIndex.propTypes = {
  idx: PropTypes.string,
  targetElementsSelector: PropTypes.string
};

export default ScrollToHighlightIndex;
