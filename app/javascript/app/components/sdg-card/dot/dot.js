import { createElement, PureComponent } from 'react';
import PropTypes from 'prop-types';
import DotComponent from './dot-component';

class DotContainer extends PureComponent {
  render() {
    const { target, targetData, activeSector, iso } = this.props;
    const hideDot =
      activeSector && targetData && targetData.targets[target.number]
        ? targetData.targets[target.number].sectors.indexOf(
          parseInt(activeSector.value, 10)
        ) === -1 || !target.sectors.includes(activeSector.value)
        : activeSector && !target.sectors.includes(activeSector.value);
    const hasSectors = !!(
      (targetData &&
        targetData.targets[target.number] &&
        targetData.targets[target.number].sectors) ||
      targetData?.targets[target?.number]?.actions?.length
    );
    let path = null;
    if (hasSectors) {
      const { document_type, language } = targetData.targets[target.number];
      path = `/ndcs/country/${iso}/full?query=${target.number}&searchBy=target&document=${document_type}-${language}`;
    }
    return createElement(DotComponent, {
      ...this.props,
      path,
      hideDot,
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
