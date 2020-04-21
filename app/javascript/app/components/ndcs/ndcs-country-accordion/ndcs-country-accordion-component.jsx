import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'components/accordion';
import NoContent from 'components/no-content';
import Loading from 'components/loading';
import DefinitionList from 'components/definition-list';
import NdcsDocumentsProvider from 'providers/documents-provider';

import layout from 'styles/layout.scss';
import styles from './ndcs-country-accordion-styles.scss';

class NdcsCountryAccordion extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      ndcsData,
      loading,
      compare,
      locations,
      category,
      search
    } = this.props;
    let message = 'No content for this category';
    if (compare && !locations) {
      message = 'Select a country to start';
    }
    if (search.search) {
      message = 'No content for that search or category';
    }
    const showNoContent = !loading && (!ndcsData || !ndcsData.length);
    const showData = !loading && ndcsData && ndcsData.length > 0;
    return (
      <div className={styles.wrapper}>
        <NdcsDocumentsProvider />
        {loading && <Loading light className={styles.loader} />}
        {showNoContent && (
          <NoContent message={message} className={styles.noContent} />
        )}
        {showData && (
          <div>
            {category === 'sectoral_information' ? (
              <Accordion
                className={styles.accordion}
                param="section"
                data={ndcsData}
                hasNestedCollapse
              >
                {ndcsData &&
                  ndcsData.length > 0 &&
                  ndcsData.map(section =>
                    (section.sectors && section.sectors.length > 0 ? (
                      <Accordion
                        key={section.slug}
                        isChild
                        className={styles.subAccordion}
                        param="sector"
                        data={section.sectors}
                      >
                        {section.sectors.map(desc => (
                          <div
                            key={desc.title}
                            className={styles.definitionList}
                          >
                            <DefinitionList
                              className={layout.content}
                              definitions={desc.definitions}
                              compare={compare}
                            />
                          </div>
                        ))}
                      </Accordion>
                    ) : null)
                  )}
              </Accordion>
            ) : (
              <Accordion
                className={styles.accordion}
                param="section"
                data={ndcsData}
                loading={loading}
              >
                {ndcsData &&
                  ndcsData.map(section => (
                    <div key={section.title} className={styles.definitionList}>
                      <DefinitionList
                        className={layout.content}
                        definitions={section.definitions}
                        compare={compare}
                      />
                    </div>
                  ))}
              </Accordion>
            )}
          </div>
        )}
      </div>
    );
  }
}

NdcsCountryAccordion.propTypes = {
  ndcsData: PropTypes.array,
  loading: PropTypes.bool,
  compare: PropTypes.bool,
  locations: PropTypes.array,
  category: PropTypes.string,
  search: PropTypes.object
};

export default NdcsCountryAccordion;
