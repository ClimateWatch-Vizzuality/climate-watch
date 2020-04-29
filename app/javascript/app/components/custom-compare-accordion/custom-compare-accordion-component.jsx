import React from 'react';
import PropTypes from 'prop-types';
import Accordion from 'components/accordion';
import DefinitionList from 'components/definition-list';
import Loading from 'components/loading';

import accordionTheme from 'styles/themes/accordion/accordion-custom-compare.scss';
import subAccordionTheme from 'styles/themes/accordion/sub-accordion-custom-compare.scss';

import styles from './custom-compare-accordion-styles.scss';

const CustomCompareAccordionComponent = ({
  data,
  compare,
  isSectoralInformation,
  loading
}) => (
  <div
    className={styles.container}
    style={{ borderBottom: loading ? '1px solid #757584' : 'unset' }}
  >
    {loading && <Loading light className={styles.loader} />}
    {!loading && (
      <Accordion
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
                    <DefinitionList {...desc} compare={compare} />
                  ))}
                </Accordion>
              )
            ) : (
              <DefinitionList {...section} compare={compare} />
            ))
          )}
      </Accordion>
    )}
  </div>
);

CustomCompareAccordionComponent.propTypes = {
  data: PropTypes.array,
  compare: PropTypes.bool,
  isSectoralInformation: PropTypes.bool,
  loading: PropTypes.bool
};

export default CustomCompareAccordionComponent;
