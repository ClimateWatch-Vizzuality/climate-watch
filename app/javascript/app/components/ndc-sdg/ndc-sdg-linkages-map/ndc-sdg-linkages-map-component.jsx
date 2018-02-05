import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Map from 'components/map';
import ButtonGroup from 'components/button-group';
import LegendRange from './legend-range';
import LegendSteps from './legend-steps';

import styles from './ndc-sdg-linkages-map-styles.scss';

class NdcSdgLinkagesMap extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  getLegend() {
    const { goal } = this.props;
    const colour = goal ? goal.colour : '';

    if (!goal) return null;

    return this.props.targetHover ? (
      <LegendSteps className={styles.legend} colour={colour} />
    ) : (
      <LegendRange className={styles.legend} colour={colour} />
    );
  }
  render() {
    return (
      <div className={cx(styles.container, this.props.className)}>
        <h3 className={styles.title}>Global Linkage Overview</h3>
        <ButtonGroup
          className={styles.buttons}
          onInfoClick={this.props.handleInfoClick}
          shareUrl="/embed/ndcs-sdg"
          analyticsGraphName="Ndcs-Sdg"
        />
        <Map
          style={{ height: '100%', width: '100%' }}
          zoomEnable
          paths={this.props.paths}
          className={styles.map}
          onCountryClick={this.props.onCountryClick}
          controlPosition="bottom"
        />
        {this.getLegend()}
      </div>
    );
  }
}

NdcSdgLinkagesMap.propTypes = {
  goal: PropTypes.object,
  paths: PropTypes.array.isRequired,
  targetHover: PropTypes.string,
  onCountryClick: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default NdcSdgLinkagesMap;
