import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import layout from 'styles/layout';
import Button from 'components/button';
import Icon from 'components/icon';
import Loading from 'components/loading';
import cx from 'classnames';
import NdcContentOverviewProvider from 'providers/ndc-content-overview-provider';
import iconDocument from 'assets/icons/document.svg';
import { TabletPortraitOnly, TabletLandscape } from 'components/responsive';
import { CHART_COLORS } from 'data/constants';
import styles from './compare-ndc-content-overview-styles.scss';

class CompareNDCContentOverview extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  renderCountryOverview = (summary, i) => {
    const summaryText = summary && summary.text;
    return (
      <div className={styles.countryOverview} key={i}>
        {summaryText && (
          <React.Fragment>
            <TabletPortraitOnly>
              <div className={cx(styles.countryHeader)}>
                <div
                  className={styles.dot}
                  style={{ backgroundColor: CHART_COLORS[i] }}
                />
                <div className={styles.countryName}>{summary.name}</div>
              </div>
            </TabletPortraitOnly>
            <div
              className={styles.overviewText}
              dangerouslySetInnerHTML={{ __html: summary.text }} // eslint-disable-line
            />
            <Button
              className={cx(styles.button, styles.buttonOutlined)}
              link={`/ndcs/country/${summary.iso_code3}`}
              square
            >
              <Icon className={styles.blueIcon} icon={iconDocument} />
            </Button>
          </React.Fragment>
        )}
      </div>
    );
  };

  render() {
    const {
      selectedLocationsFilter,
      handleAnalyticsClick,
      summaries,
      loading
    } = this.props;
    const compareButton = (
      <Button
        variant="primary"
        link={`/ndcs/compare/mitigation?locations=${selectedLocationsFilter}`}
        onClick={handleAnalyticsClick}
      >
        Compare the NDCs
      </Button>
    );

    return (
      <div className={cx(layout.content, styles.ndcContentOverview)}>
        <NdcContentOverviewProvider locations={selectedLocationsFilter} />
        <div className="grid-column-item">
          <div className={styles.col6}>
            <h2 className={styles.title}>NDC Content Overview</h2>
            <TabletLandscape>{compareButton}</TabletLandscape>
          </div>
        </div>
        {loading || !summaries ? (
          <Loading light className={styles.loader} />
        ) : (
          <div className="grid-column-item">
            <div className={styles.col3}>
              {[0, 1, 2].map(i =>
                this.renderCountryOverview(
                  summaries.find(s => s.index === i),
                  i
                )
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

CompareNDCContentOverview.propTypes = {
  selectedLocationsFilter: PropTypes.array,
  summaries: PropTypes.array,
  handleAnalyticsClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default CompareNDCContentOverview;
