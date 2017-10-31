import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'components/accordion';
import NoContent from 'components/no-content';
import Loading from 'components/loading';

import styles from './ndcs-country-accordion-styles.scss';

class NdcsCountryAccordion extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { ndcsData, loading, compare, locations } = this.props;
    return (
      <div className={styles.wrapper}>
        {loading && <Loading light className={styles.loader} />}
        {!ndcsData.length && !loading && (
          <NoContent
            message={locations ? 'No content for this category' : 'Select a country to start'}
            className={styles.noContent}
          />
        )}
        {ndcsData && ndcsData.length > 0 && (
          <Accordion
            className={styles.accordion}
            data={ndcsData}
            loading={loading}
            compare={compare}
          />
        )}
      </div>
    );
  }
}

NdcsCountryAccordion.propTypes = {
  ndcsData: PropTypes.array,
  loading: PropTypes.bool,
  compare: PropTypes.bool,
  locations: PropTypes.array
};

export default NdcsCountryAccordion;
