import { createElement, PureComponent } from 'react';
import PropTypes from 'prop-types';
import DotComponent from './dot-component';

class DotContainer extends PureComponent {
  render() {
    const { target, targetData, activeSector, iso } = this.props;
    const isSmall =
      target.sectors &&
      activeSector &&
      target.sectors.indexOf(parseInt(activeSector.value, 10)) === -1;
    const hasSectors = !!(
      targetData &&
      targetData.targets[target.number] &&
      targetData.targets[target.number].sectors
    );
    let path = null;
    if (hasSectors) {
      const { document_type, language } = targetData.targets[target.number];
      path = `/ndcs/country/${iso}/full?query=${target.number}&searchBy=target&document=${document_type}-${language}`;
    }
    return createElement(DotComponent, {
      ...this.props,
      path,
      isSmall,
      hasSectors
    });
  }
}

DotContainer.propTypes = {
  target: PropTypes.object,
  targetData: PropTypes.object,
  activeSector: PropTypes.object,
  iso: PropTypes.string
};

export default DotContainer;
