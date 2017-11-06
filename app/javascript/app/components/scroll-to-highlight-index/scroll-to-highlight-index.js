import { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
    const e = idx
      ? document.querySelectorAll(targetElementsSelector)[idx]
      : document.querySelectorAll(targetElementsSelector)[0];

    const topPosition = element => {
      const PADDING = -200;
      let firstLevelElement = element;
      let elementPosition = firstLevelElement.offsetTop;
      while (firstLevelElement.tagName !== 'TABLE') {
        elementPosition += firstLevelElement.offsetParent.offsetTop;
        firstLevelElement = firstLevelElement.offsetParent;
      }
      return elementPosition + PADDING;
    };

    if (e) {
      window.scrollTo({
        behavior: 'smooth',
        left: 0,
        top: topPosition(e)
      });
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
