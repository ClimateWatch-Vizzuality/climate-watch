/* eslint-disable no-confusing-arrow */
import React from 'react';
import PropTypes from 'prop-types';
import Accordion from 'components/accordion';
import CompareDefinitionList from 'components/compare-definition-list';
import Loading from 'components/loading';
import NoContent from 'components/no-content';
import cx from 'classnames';
import { CATEGORY_SLUGS } from 'data/constants';

import accordionTheme from 'styles/themes/accordion/accordion-custom-compare.scss';
import subAccordionTheme from 'styles/themes/accordion/sub-accordion-custom-compare.scss';

import styles from './custom-compare-accordion-styles.scss';

const FEATURE_ENHANCEMENT_CHANGES =
  process.env.FEATURE_ENHANCEMENT_CHANGES === 'true';

const getNoContentMessage = locationsDocuments => {
  if (!locationsDocuments) {
    return 'Select a country and a document to start';
  }
  return 'No comparable data available, select another category or document to compare';
};

const CustomCompareAccordionComponent = ({
  data,
  isSectoralInformation,
  locationsDocuments,
  loading
}) => {
  const message = getNoContentMessage(locationsDocuments);
  const hasContent = !loading && !!data && !!data.length;
  const noContent = !loading && (!data || !data.length);
  const isOverviewCategory =
    data && data.some(d => d.slug === 'overall_comparison_with_previous_ndc');
  const renderDefinitionList = section => {
    if (isSectoralInformation && section.sectors) {
      return (
        <Accordion
          key={section.slug}
          isChild
          param="sector"
          data={section.sectors}
          theme={subAccordionTheme}
        >
          {section.sectors.map(desc => (
            <CompareDefinitionList
              {...desc}
              className={styles.compareDefinitionList}
            />
          ))}
        </Accordion>
      );
    }

    if (
      FEATURE_ENHANCEMENT_CHANGES &&
      section.slug === CATEGORY_SLUGS.commitmentSummary
    ) {
      const comparisonSection = data.find(
        s => s.slug === 'overall_comparison_with_previous_ndc'
      );
      return (
        <div key={section.title} className={styles.definitionList}>
          <CompareDefinitionList
            {...section}
            className={styles.compareDefinitionList}
          />
          <div className={styles.comparisonTitleContainer}>
            <div className={styles.comparisonTitle}>
              Overall comparison with previous NDC
            </div>
          </div>
          <CompareDefinitionList
            {...comparisonSection}
            className={styles.compareDefinitionList}
            comparisonWithPreviousNDC
          />
        </div>
      );
    }

    return (
      <CompareDefinitionList
        {...section}
        className={styles.compareDefinitionList}
      />
    );
  };

  const dataWithoutComparison =
    data && FEATURE_ENHANCEMENT_CHANGES && isOverviewCategory
      ? data.filter(
        d => d.slug !== 'overall_comparison_with_previous_ndc' // Overall comparison will be included on the overview section so we won't render it again
      )
      : data;

  return (
    <div
      className={cx(styles.container, {
        [styles.containerNoData]: loading || noContent
      })}
      data-tour="custom-compare-04"
    >
      {loading && <Loading light className={styles.loader} />}
      {noContent && (
        <NoContent message={message} className={styles.noContent} />
      )}
      {hasContent && (
        <Accordion
          className={styles.accordion}
          param="section"
          data={dataWithoutComparison}
          theme={accordionTheme}
          hasNestedCollapse={!!isSectoralInformation}
          openSlug={
            FEATURE_ENHANCEMENT_CHANGES &&
            isOverviewCategory &&
            'overall_comparison_with_previous_ndc'
          }
        >
          {dataWithoutComparison &&
            dataWithoutComparison.map(section => renderDefinitionList(section))}
        </Accordion>
      )}
    </div>
  );
};

CustomCompareAccordionComponent.propTypes = {
  data: PropTypes.array,
  isSectoralInformation: PropTypes.bool,
  loading: PropTypes.bool,
  locationsDocuments: PropTypes.string
};

export default CustomCompareAccordionComponent;
