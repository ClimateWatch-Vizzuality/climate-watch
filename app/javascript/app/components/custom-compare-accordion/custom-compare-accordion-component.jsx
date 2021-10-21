/* eslint-disable no-confusing-arrow */
import React from 'react';
import PropTypes from 'prop-types';
import Accordion from 'components/accordion';
import CompareDefinitionList from 'components/compare-definition-list';
import Loading from 'components/loading';
import NoContent from 'components/no-content';
import cx from 'classnames';

import accordionTheme from 'styles/themes/accordion/accordion-custom-compare.scss';
import subAccordionTheme from 'styles/themes/accordion/sub-accordion-custom-compare.scss';

import styles from './custom-compare-accordion-styles.scss';

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
          data={data}
          theme={accordionTheme}
          hasNestedCollapse={!!isSectoralInformation}
        >
          {data &&
            data.map(section =>
              isSectoralInformation ? (
                section.sectors && (
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
                )
              ) : (
                <CompareDefinitionList
                  {...section}
                  className={styles.compareDefinitionList}
                  comparisonWithPreviousNDC={
                    section.slug === 'overall_comparison_with_previous_ndc'
                  }
                />
              )
            )}
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
