import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'components/accordion';
import NoContent from 'components/no-content';
import Loading from 'components/loading';
import DefinitionList from 'components/definition-list';

import layout from 'styles/layout.scss';
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
            icon
            className={styles.noContent}
          />
        )}
        {ndcsData && ndcsData.length > 0 && (
          <Accordion
            className={styles.accordion}
            param="section"
            data={ndcsData}
            loading={loading}
          >
            {ndcsData &&
              ndcsData.map(section => (
                <div
                  key={section.title}
                  className={styles.definitionList}
                >
                  <DefinitionList
                    className={layout.content}
                    definitions={section.definitions}
                    compare={compare}
                  />
                </div>
              ))
            }
          </Accordion>
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
