import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import layout from 'styles/layout';
import Button from 'components/button';
import Icon from 'components/icon';
import Loading from 'components/loading';
import cx from 'classnames';
import NdcContentOverviewProvider from 'providers/ndc-content-overview-provider';
import iconDocument from 'assets/icons/document.svg';

import styles from './compare-ndc-content-overview-styles.scss';

class CompareNDCContentOverview extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  renderCountryOverview = (summary, i) => (
    <div className={styles.countryOverview} key={i}>
      {summary &&
      summary.text && (
      <React.Fragment>
            <div
          className={styles.overviewText}
          dangerouslySetInnerHTML={{ __html: summary.text }}
        />
            <Button
          className={styles.button}
          link={`/ndcs/country/${summary.location}`}
          square
        >
          <Icon icon={iconDocument} />
        </Button>
          </React.Fragment>
        )}
    </div>
  );

  render() {
    const {
      selectedLocationsFilter,
      handleAnalyticsClick,
      summaries,
      loading
    } = this.props;
    return (
      <div className={cx(layout.content, styles.ndcContentOverview)}>
        <NdcContentOverviewProvider locations={selectedLocationsFilter} />
        <div className={styles.col6}>
          <h2 className={styles.title}>NDC Content Overview</h2>
          <Button
            noSpace
            className={styles.colEnd}
            color="yellow"
            link={`/ndcs/compare/mitigation?locations=${selectedLocationsFilter}`}
            onClick={handleAnalyticsClick}
          >
            Compare the NDCs
          </Button>
        </div>
        {loading || !summaries ? (
          <Loading light className={styles.loader} />
        ) : (
          <div className={styles.col3}>
            {[0, 1, 2].map(i =>
              this.renderCountryOverview(summaries.find(s => s.index === i), i)
            )}
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
