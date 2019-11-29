import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Map from 'components/map';
import Icon from 'components/icon';
import accordionArrow from 'assets/icons/accordion-arrow.svg';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import ButtonGroup from 'components/button-group';
import { TabletLandscape } from 'components/responsive';
import tooltipTheme from 'styles/themes/map-tooltip/map-tooltip.scss';
import AutocompleteSearch from 'components/autocomplete-search';
import { isPageContained } from 'utils/navigation';

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
    const locations = targets && targets.numbers && targets.numbers.length;
    return (
      <Link className={tooltipTheme.container} to={`/countries/${country.id}`}>
        <div className={tooltipTheme.info}>
          <div className={tooltipTheme.countryName}>{country.name}</div>
          <p className={tooltipTheme.text}>{locations || '0'} targets linked</p>
        </div>
        <Icon icon={accordionArrow} className={tooltipTheme.icon} />
      </Link>
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

  renderMapHeader({ isTablet }) {
    const { downloadLink } = this.props;
    const buttonGroup = (
      <ButtonGroup
        className={styles.buttons}
        buttonsConfig={[
          {
            type: 'info',
            onClick: this.props.handleInfoClick
          },
          {
            type: 'share',
            shareUrl: '/embed/ndcs-sdg',
            analyticsGraphName: 'Ndcs-Sdg',
            positionRight: true
          },
          {
            type: 'download',
            section: 'ndcs-sdg',
            link: downloadLink
          },
          {
            type: 'addToUser'
          }
        ]}
      />
    );

    if (isPageContained) {
      return (
        <React.Fragment>
          <AutocompleteSearch variant="dark" className={styles.autoComplete} />
          {buttonGroup}
        </React.Fragment>
      );
    }

    return isTablet ? (
      <React.Fragment>
        <h3 className={styles.title}>Global Linkage Overview</h3>
        {buttonGroup}
      </React.Fragment>
    ) : null;
  }

  render() {
    return (
      <TabletLandscape>
        {isTablet => (
          <div
            className={cx(styles.container, this.props.className, {
              [styles.isOpen]: this.props.goalSelected !== ''
            })}
          >
            <div className={styles.row}>
              {this.renderMapHeader({ isTablet })}
            </div>
            <Map
              style={{ height: '100%', width: '100%' }}
              zoomEnable={isTablet}
              dragEnable={isTablet}
              paths={this.props.paths}
              className={styles.map}
              onCountryEnter={this.handleMapInteraction}
              onCountryFocus={this.handleMapInteraction}
              onCountryClick={this.props.onCountryClick}
              customCenter={isTablet ? null : [10, 0]}
              controlPosition="bottom"
              tooltipId="sdg-linkages"
            />
            {this.getLegend()}
            <ReactTooltip
              className={styles.tooltipContainer}
              id="sdg-linkages"
              delayHide={isTablet ? 0 : 3000}
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
  goalSelected: PropTypes.string,
  downloadLink: PropTypes.string
};

export default NdcSdgLinkagesMap;
