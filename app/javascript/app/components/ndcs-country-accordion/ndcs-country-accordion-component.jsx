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
    const { ndcsData, loading, compare, locations, category } = this.props;
    return (
      <div className={styles.wrapper}>
        {loading && <Loading light className={styles.loader} />}
        {!loading && (!ndcsData || !ndcsData.length) && (
          <NoContent
            message={
              compare && !locations ? (
                'Select a country to start'
              ) : (
                'No content for this category'
              )
            }
            className={styles.noContent}
          />
        )}
        {!loading && ndcsData && ndcsData.length > 0 && (
          <div>
            {ndcsData && ndcsData.length &&
              category === 'sectoral_information' ? (
                <Accordion
                  className={styles.accordion}
                  param="section"
                  data={ndcsData}
                >
                  {ndcsData && ndcsData.length > 0 &&
                    ndcsData.map(
                      section =>
                        (section.indicators.length > 0 ? (
                          <Accordion
                            key={section.slug}
                            isChild
                            className={styles.subAccordion}
                            param="subSection"
                            data={section.indicators}
                          >
                            {section.indicators.map(desc => (
                              <div
                                key={desc.title}
                                className={styles.definitionList}
                              >
                                <DefinitionList
                                  className={layout.content}
                                  definitions={desc.descriptions}
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
  category: PropTypes.string
};

export default NdcsCountryAccordion;
