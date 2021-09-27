import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Map from 'components/map';
import Icon from 'components/icon';
import accordionArrow from 'assets/icons/accordion-arrow.svg';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import ButtonGroup from 'components/button-group';
import ShareButton from 'components/button/share-button';
import { TabletLandscape } from 'components/responsive';
import ModalShare from 'components/modal-share';
import ModalPngDownload from 'components/modal-png-download';
import tooltipTheme from 'styles/themes/map-tooltip/map-tooltip.scss';
import AutocompleteSearch from 'components/autocomplete-search';
import { isPageContained } from 'utils/navigation';

import LegendRange from './legend-range';
import LegendSteps from './legend-steps';

import styles from './ndc-sdg-linkages-map-styles.scss';

const FEATURE_ENHANCEMENT_CHANGES =
  process.env.FEATURE_ENHANCEMENT_CHANGES === 'true';

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

  getLegend({ isPng = false }) {
    const { goal } = this.props;
    const colour = goal ? goal.colour : '';

    if (!goal) return null;
    const LegendComponent = this.props.targetHover ? LegendSteps : LegendRange;

    return (
      <LegendComponent className={!isPng && styles.legend} colour={colour} />
    );
  }

  handleMapInteraction = country =>
    this.setState({ country: country.properties });

  renderMapHeader({ isTablet }) {
    const {
      downloadLink,
      handleInfoClick,
      handlePngDownloadModal
    } = this.props;
    const buttonGroup = (
      <React.Fragment>
        <ButtonGroup
          className={styles.buttons}
          buttonsConfig={[
            {
              type: 'info',
              onClick: handleInfoClick
            },
            FEATURE_ENHANCEMENT_CHANGES
              ? {
                type: 'downloadCombo',
                options: [
                  {
                    label: 'Save as image (PNG)',
                    action: handlePngDownloadModal
                  },
                  {
                    label: 'Go to data explorer',
                    link: downloadLink,
                    target: '_self'
                  }
                ]
              }
              : {
                type: 'download',
                section: 'ndc-sdg-linkages',
                link: downloadLink
              },

            {
              type: 'addToUser'
            }
          ]}
          dataTour="ndcs-sdg-04"
        />
        <ShareButton sharePath={'/ndcs-sdg'} />
      </React.Fragment>
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
    const {
      pngSelectionSubtitle,
      className,
      goalSelected,
      pngDownloadId
    } = this.props;

    const renderMap = ({ isPng, isTablet }) => (
      <Map
        zoomEnable={!isPng && isTablet}
        dragEnable={!isPng && isTablet}
        paths={this.props.paths}
        className={cx(styles.map, { [styles.png]: isPng })}
        onCountryEnter={this.handleMapInteraction}
        onCountryFocus={this.handleMapInteraction}
        onCountryClick={this.props.onCountryClick}
        customCenter={isTablet ? null : [10, 0]}
        controlPosition="bottom"
        tooltipId="sdg-linkages"
      />
    );
    return (
      <TabletLandscape>
        {isTablet => (
          <div
            className={cx(styles.container, className, {
              [styles.isOpen]: goalSelected !== ''
            })}
          >
            <div className={styles.row}>
              {this.renderMapHeader({ isTablet })}
            </div>
            <span data-tour="ndcs-sdg-02">
              {renderMap({ isPng: false, isTablet })}
            </span>
            {this.getLegend({ isPng: false })}
            <ReactTooltip
              className={styles.tooltipContainer}
              id="sdg-linkages"
              delayHide={isTablet ? 0 : 3000}
            >
              {this.getTooltip()}
            </ReactTooltip>
            <ModalShare analyticsName={'Ndcs-Sdgs'} />
            <ModalPngDownload
              id={pngDownloadId}
              title="NDC-SDG Linkages"
              selectionSubtitle={pngSelectionSubtitle}
            >
              {renderMap({ isPng: true })}
              {this.getLegend({ isPng: true })}
            </ModalPngDownload>
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
  downloadLink: PropTypes.string,
  pngDownloadId: PropTypes.string.isRequired,
  handlePngDownloadModal: PropTypes.func.isRequired,
  pngSelectionSubtitle: PropTypes.string
};

export default NdcSdgLinkagesMap;
