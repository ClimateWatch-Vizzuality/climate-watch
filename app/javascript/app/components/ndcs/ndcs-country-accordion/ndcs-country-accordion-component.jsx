/* eslint-disable no-confusing-arrow */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'components/accordion';
import NoContent from 'components/no-content';
import Loading from 'components/loading';
import DefinitionList from 'components/definition-list';
import CustomDefinitionList from 'components/custom-definition-list';
import NdcsDocumentsProvider from 'providers/documents-provider';

import layout from 'styles/layout.scss';
import styles from './ndcs-country-accordion-styles.scss';

const FEATURE_ENHANCEMENT_CHANGES =
  process.env.FEATURE_ENHANCEMENT_CHANGES === 'true';

class NdcsCountryAccordion extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      ndcsData,
      loading,
      compare, // legacy: only for outdated '/compare' routes
      locations,
      category,
      defaultSection,
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
    const renderSectoralInformationAccordion = () => (
      <Accordion
        className={styles.accordion}
        param="section"
        data={ndcsData}
        hasNestedCollapse
      >
        {ndcsData &&
          ndcsData.length > 0 &&
          ndcsData.map(section =>
            section.sectors && section.sectors.length > 0 ? (
              <Accordion
                key={section.slug}
                isChild
                className={styles.subAccordion}
                param="sector"
                data={section.sectors}
              >
                {section.sectors.map(desc => (
                  <div key={desc.title} className={styles.definitionList}>
                    <DefinitionList
                      className={layout.content}
                      definitions={desc.definitions}
                      compare={compare}
                    />
                  </div>
                ))}
              </Accordion>
            ) : null
          )}
      </Accordion>
    );

    const renderDefinitionList = section => {
      if (
        FEATURE_ENHANCEMENT_CHANGES &&
        category === 'overview' &&
        section.slug === 'overview_of_commitment'
      ) {
        const comparisonData = ndcsData.find(
          s => s.slug === 'overall_comparison_with_previous_ndc'
        );
        return (
          <div key={section.title} className={styles.definitionList}>
            <DefinitionList
              className={layout.content}
              definitions={section.definitions}
              compare={compare}
            />
            <CustomDefinitionList
              className={layout.content}
              definitions={comparisonData && comparisonData.definitions}
              compare={compare}
            />
          </div>
        );
      }

      return (
        <div key={section.title} className={styles.definitionList}>
          <DefinitionList
            className={layout.content}
            definitions={section.definitions}
            compare={compare}
          />
        </div>
      );
    };

    const ndcsDataWithoutComparison =
      ndcsData && FEATURE_ENHANCEMENT_CHANGES && category === 'overview'
        ? ndcsData.filter(
          d => d.slug !== 'overall_comparison_with_previous_ndc' // Overall comparison will be included on the overview section so we won't render it again
        )
        : ndcsData;

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
              renderSectoralInformationAccordion()
            ) : (
              <Accordion
                className={styles.accordion}
                param="section"
                openSlug={defaultSection}
                data={ndcsDataWithoutComparison}
                loading={loading}
              >
                {ndcsDataWithoutComparison &&
                  ndcsDataWithoutComparison.map(renderDefinitionList)}
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
  compare: PropTypes.bool, // legacy: only for outdated '/compare' routes
  locations: PropTypes.array,
  category: PropTypes.string,
  defaultSection: PropTypes.string,
  search: PropTypes.object
};

export default NdcsCountryAccordion;
