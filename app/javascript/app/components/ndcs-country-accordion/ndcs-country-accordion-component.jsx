import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'components/accordion';

import styles from './ndcs-country-accordion-styles.scss';

class NdcsCountryAccordion extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { ndcsData, loading } = this.props;
    return (
      <Accordion
        className={styles.accordion}
        data={ndcsData}
        loading={loading}
      />
    );
  }
}

NdcsCountryAccordion.propTypes = {
  ndcsData: PropTypes.array,
  loading: PropTypes.bool
};

export default NdcsCountryAccordion;
