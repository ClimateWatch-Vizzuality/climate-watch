import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Map from 'components/map';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import ButtonGroup from 'components/button-group';
import { TabletLandscape } from 'components/responsive';
import LegendRange from './legend-range';
import LegendSteps from './legend-steps';

import styles from './ndc-sdg-linkages-map-styles.scss';

class NdcSdgLinkagesMap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      country: ''
    };
  }

  getTooltip() {
    const { country } = this.state;
    const targets =
      this.props.goal &&
      this.props.goal.locations &&
      this.props.goal.locations[country.id];
    const locations = targets && targets.length;
    return (
      <div className={styles.tooltip}>
        <Link className={styles.link} to={`/countries/${country.id}`}>
          {country.name}
        </Link>
        <p className={styles.tooltipText}>{locations || '0'} targets linked</p>
      </div>
    );
  }

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

  handleMapInteraction = country =>
    this.setState({ country: country.properties });

  render() {
    return (
      <TabletLandscape>
        {matches => (
          <div
            className={cx(styles.container, this.props.className, {
              [styles.isOpen]: this.props.goalSelected !== ''
            })}
          >
            {matches ? (
              <h3 className={styles.title}>Global Linkage Overview</h3>
            ) : null}
            {matches ? (
              <ButtonGroup
                className={styles.buttons}
                onInfoClick={this.props.handleInfoClick}
                shareUrl="/embed/ndcs-sdg"
                analyticsGraphName="Ndcs-Sdg"
              />
            ) : null}
            <Map
              style={{ height: '100%', width: '100%' }}
              zoomEnable
              dragEnable
              paths={this.props.paths}
              className={styles.map}
              onCountryEnter={this.handleMapInteraction}
              onCountryFocus={this.handleMapInteraction}
              onCountryClick={this.props.onCountryClick}
              controlPosition="bottom"
              tooltipId="sdg-linkages"
            />
            {this.getLegend()}
            <ReactTooltip
              className={styles.tooltipContainer}
              id="sdg-linkages"
              delayHide={matches ? 0 : 3000}
            >
              {this.getTooltip()}
            </ReactTooltip>
          </div>
        )}
      </TabletLandscape>
    );
  }
}

NdcSdgLinkagesMap.propTypes = {
  goal: PropTypes.object,
  paths: PropTypes.array.isRequired,
  targetHover: PropTypes.string,
  onCountryClick: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  goalSelected: PropTypes.string
};

export default NdcSdgLinkagesMap;
