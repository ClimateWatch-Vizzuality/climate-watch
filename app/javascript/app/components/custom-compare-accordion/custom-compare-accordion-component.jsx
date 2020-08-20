import React from 'react';
import PropTypes from 'prop-types';
import Accordion from 'components/accordion';
import DefinitionList from 'components/definition-list';
import Loading from 'components/loading';
import NoContent from 'components/no-content';
import cx from 'classnames';

import accordionTheme from 'styles/themes/accordion/accordion-custom-compare.scss';
import subAccordionTheme from 'styles/themes/accordion/sub-accordion-custom-compare.scss';

import styles from './custom-compare-accordion-styles.scss';

const getNoContentMessage = (compare, targets) => {
  if (compare && !targets) return 'Select a country and a document to start';
  if (targets) return 'No content for that search or category';
  return 'No content for this category';
};

const CustomCompareAccordionComponent = ({
  data,
  compare,
  isSectoralInformation,
  locationsAndDocuments,
  loading
}) => {
  const message = getNoContentMessage(compare, locationsAndDocuments);
  const hasContent = !loading && !!data && !!data.length;
  const noContent = !loading && (!data || !data.length);

  return (
    <div
      className={cx(styles.container, {
        [styles.containerNoData]: loading || noContent
      })}
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
              (isSectoralInformation ? (
                section.sectors && (
                  <Accordion
                    key={section.slug}
                    isChild
                    param="sector"
                    data={section.sectors}
                    theme={subAccordionTheme}
                  >
                    {section.sectors.map(desc => (
                      <DefinitionList
                        {...desc}
                        compare={compare}
                        className={styles.compareDefinitionList}
                      />
                    ))}
                  </Accordion>
                )
              ) : (
                <DefinitionList
                  {...section}
                  compare={compare}
                  className={styles.compareDefinitionList}
                />
              ))
            )}
        </Accordion>
      )}
    </div>
  );
};

CustomCompareAccordionComponent.propTypes = {
  data: PropTypes.array,
  compare: PropTypes.bool,
  isSectoralInformation: PropTypes.bool,
  loading: PropTypes.bool,
  locationsAndDocuments: PropTypes.string
};

export default CustomCompareAccordionComponent;
