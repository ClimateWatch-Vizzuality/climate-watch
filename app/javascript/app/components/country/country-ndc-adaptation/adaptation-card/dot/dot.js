import { createElement, PureComponent } from 'react';
import PropTypes from 'prop-types';
import snakeCase from 'lodash/snakeCase';
import DotComponent from './dot-component';

class DotContainer extends PureComponent {
  render() {
    const { target, targetData, iso, activeCommitment } = this.props;
    const hasActions = !!(
      (targetData &&
        targetData.targets[target.number] &&
        targetData.targets[target.number].sectors) ||
      targetData?.targets[target?.number]?.actions?.length
    );
    const path =
      hasActions &&
      activeCommitment &&
      `/ndcs/country/${iso}/sectoral-information?document=${
        activeCommitment.slug
      }&section=adaptation_commitments&sector=${snakeCase(
        targetData.targets[target.number].title
      )}`;
    return createElement(DotComponent, {
      ...this.props,
      path,
      hasActions
    });
  }
}

DotContainer.propTypes = {
  target: PropTypes.object,
  targetData: PropTypes.object,
  iso: PropTypes.string,
  activeCommitment: PropTypes.object
};

export default DotContainer;
