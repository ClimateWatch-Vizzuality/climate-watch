import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import layout from 'styles/layout';
import Button from 'components/button';
import styles from './compare-ndc-content-overview-styles.scss';

class CompareNDCContentOverview extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { selectedLocationsFilter, handleAnalyticsClick } = this.props;
    return (
      <div className={layout.content}>
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
      </div>
    );
  }
}

CompareNDCContentOverview.propTypes = {
  selectedLocationsFilter: PropTypes.array,
  handleAnalyticsClick: PropTypes.func.isRequired
};

export default CompareNDCContentOverview;
