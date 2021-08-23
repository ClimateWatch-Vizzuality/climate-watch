/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { TabletLandscape } from 'components/responsive';
import Map from 'components/map';
import MapLegend from 'components/map-legend';
import ButtonGroup from 'components/button-group';
import AbbrReplace, { replaceStringAbbr } from 'components/abbr-replace';
import { CheckInput } from 'cw-components';
import Loading from 'components/loading';
import Icon from 'components/icon';
import infoIcon from 'assets/icons/info.svg';
import ModalMetadata from 'components/modal-metadata';
import NDCSEnhancementsTooltip from 'components/ndcs/ndcs-enhancements-viz/ndcs-enhancements-tooltip';
import ReactTooltip from 'react-tooltip';
import blueCheckboxTheme from 'styles/themes/checkbox/blue-checkbox.scss';
import { Link } from 'react-router-dom';
import { LABEL_SLUGS } from './ndcs-enhancements-viz-selectors';
import styles from './ndcs-enhancements-viz-styles.scss';

const renderButtonGroup = (clickHandler, downloadLink) => (
  <div className={styles.containerControls}>
    <div>
      <p>
        <em>
          <AbbrReplace>
            Track which countries are submitting their national climate
            commitments in the lead up to COP26. You can compare countries’
            submissions side by side{' '}
            <Link to="custom-compare/overview" title="Compare submissions">
              here
            </Link>{' '}
            or by referring to the table below. To request changes or additions,
            please contact &nbsp;
            <a
              href="mailto:Rhys.Gerholdt@wri.org?subject=NDC Enhancement Tracker Update"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rhys Gerholdt
            </a>
            .
          </AbbrReplace>
        </em>
      </p>
    </div>
    <div>
      <ButtonGroup
        className={styles.buttonGroup}
        dataTour="ndc-enhancement-tracker-04"
        buttonsConfig={[
          {
            type: 'info',
            onClick: clickHandler
          },
          {
            type: 'share',
            shareUrl: '/embed/2020-ndc-tracker',
            analyticsGraphName: 'Ndcs',
            positionRight: true
          },
          {
            type: 'download',
            section: 'ndcs-content',
            link: downloadLink
          },
          {
            type: 'addToUser'
          }
        ]}
      />
    </div>
  </div>
);

const renderSummaryItem = datum => (
  <div className={styles.summaryItemContainer}>
    <div className={styles.summaryItemValuesContainer}>
      <div className={styles.summaryItemValues}>
        <div
          style={{
            color: datum.opts.color
          }}
        >
          {datum.opts.prefix}
          {datum.value}
        </div>
      </div>
    </div>
    <div className={styles.summaryItemLabels}>
      <div
        dangerouslySetInnerHTML={{
          __html: replaceStringAbbr(datum.opts.label)
        }}
      />
    </div>
  </div>
);

const TOOLTIP_ID = 'ndcs-map-tooltip';

const NDCSEnhancementsViz = ({
  loading,
  indicator,
  paths,
  tooltipValues,
  downloadLink,
  summaryData,
  handleInfoClick,
  handleCountryEnter,
  mapColors,
  handleOnChangeChecked,
  checked
}) => (
  <div className={styles.ndcTracker}>
    <TabletLandscape>
      {isTablet => (
        <div className={styles.wrapper}>
          <div className={styles.filtersLayout}>
            {isTablet && renderButtonGroup(handleInfoClick, downloadLink)}
          </div>

          <div className={styles.containerUpper}>
            <div className={styles.containerCharts}>
              {!loading && summaryData && (
                <div className={styles.summary}>
                  <div
                    data-tip
                    data-for="covid-update-tooltip"
                    className={styles.summaryTitle}
                  >
                    COVID-19 Update
                    <Icon icon={infoIcon} className={styles.infoIcon} />
                  </div>
                  <ReactTooltip
                    id="covid-update-tooltip"
                    className={styles.covidTooltip}
                  >
                    Some nations have signaled that the impacts of the
                    coronavirus pandemic may delay their submission of updated
                    or enhanced NDCs. While many will submit in 2020 as
                    scheduled, some have indicated they may do so in 2021 ahead
                    of COP26. The information below does not reflect these
                    possible delays.
                  </ReactTooltip>
                  <div className={styles.summaryItemsContainer}>
                    {renderSummaryItem(
                      summaryData[LABEL_SLUGS.SUBMITTED_2020].countries
                    )}
                    {renderSummaryItem(
                      summaryData[LABEL_SLUGS.ENHANCED_MITIGATION].countries
                    )}
                    <span className={styles.separator} />
                    {renderSummaryItem(
                      summaryData[LABEL_SLUGS.INTENDS_TO_ENHANCE].countries
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className={styles.containerMap}>
              {loading && <Loading light className={styles.loader} />}
              {!isTablet && renderButtonGroup(handleInfoClick, downloadLink)}
              <span data-tour="ndc-enhancement-tracker-02">
                <Map
                  paths={paths}
                  tooltipId={TOOLTIP_ID}
                  onCountryEnter={handleCountryEnter}
                  onCountryFocus={handleCountryEnter}
                  zoomEnable
                  customCenter={!isTablet ? [10, -10] : null}
                />
              </span>
              {!loading && (
                <div className={styles.checkboxContainer}>
                  <CheckInput
                    theme={blueCheckboxTheme}
                    label="Show which new NDCs reduce total emissions"
                    checked={checked}
                    onChange={() => handleOnChangeChecked(!checked)}
                  />
                </div>
              )}
              {!loading && tooltipValues && (
                <NDCSEnhancementsTooltip
                  id={TOOLTIP_ID}
                  tooltipValues={tooltipValues}
                />
              )}
              {indicator && (
                <MapLegend
                  className={styles.legend}
                  title={indicator.legend}
                  buckets={indicator.legendBuckets}
                  mapColors={mapColors}
                />
              )}
            </div>
          </div>
          <ModalMetadata />
        </div>
      )}
    </TabletLandscape>
  </div>
);

NDCSEnhancementsViz.propTypes = {
  loading: PropTypes.bool,
  indicator: PropTypes.object,
  paths: PropTypes.array.isRequired,
  tooltipValues: PropTypes.object,
  downloadLink: PropTypes.string,
  summaryData: PropTypes.object,
  handleCountryEnter: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  handleOnChangeChecked: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  mapColors: PropTypes.array
};

export default NDCSEnhancementsViz;
