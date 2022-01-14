/* eslint-disable no-confusing-arrow */
import React from 'react';
import Proptypes from 'prop-types';

import ReactTooltip from 'react-tooltip';
import ModalMetadata from 'components/modal-metadata';

import layout from 'styles/layout.scss';

import styles from './country-employment-and-costs-styles.scss';

function CountryEmploymentAndCosts(props) {
  const { sectionData } = props;
  console.info('section', sectionData);
  const renderContent = () => (
    <div>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>
            How does climate action increase jobs and save money?
          </h3>
        </div>
        <ReactTooltip className={styles.tooltip} />
      </div>
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <ModalMetadata />
      <div className={layout.content}>{renderContent()}</div>
    </div>
  );
}

CountryEmploymentAndCosts.propTypes = {
  sectionData: Proptypes.array
};

export default CountryEmploymentAndCosts;
