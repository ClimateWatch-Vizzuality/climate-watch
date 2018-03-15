import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { scrollIt } from 'utils/scroll';

class ScrollToHighlightIndex extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    setTimeout(this.handleScroll, 150);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.content.html !== this.props.content.html) {
      setTimeout(this.handleScroll, 150);
    }
  }

  handleScroll = () => {
    const { idx, targetElementsSelector } = this.props;
    const target = idx
      ? document.querySelectorAll(targetElementsSelector)[idx]
      : document.querySelectorAll(targetElementsSelector)[0];
    if (target) {
      scrollIt(target, 300, 'smooth');
    }
  };

  render() {
    return null;
  }
}

ScrollToHighlightIndex.propTypes = {
  idx: PropTypes.string,
  targetElementsSelector: PropTypes.string,
  content: PropTypes.object
};

export default ScrollToHighlightIndex;
