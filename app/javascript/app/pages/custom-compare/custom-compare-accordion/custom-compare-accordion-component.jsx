import React from 'react';
import PropTypes from 'prop-types';
import Accordion from 'components/accordion';
import DefinitionList from 'components/definition-list';

import theme from 'styles/themes/accordion/accordion-custom-compare.scss';
import styles from './custom-compare-accordion-styles.scss';

const CustomCompareAccordionComponent = ({
  data,
  category = '',
  compare = true
}) => {
  const isSectoralInformation = category === 'sectoral_information';

  return (
    <div>
      <Accordion
        className={styles.accordion}
        param="section"
        data={data}
        theme={theme}
        hasNestedCollapse={!!isSectoralInformation}
      >
        {data &&
          data.map(section =>
            (isSectoralInformation ? (
              section.sectors &&
              section.sectors.length > 0 && (
                <Accordion
                  key={section.slug}
                  isChild
                  className={styles.subAccordion}
                  param="sector"
                  data={section.sectors}
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
    </div>
  );
};

CustomCompareAccordionComponent.propTypes = {
  data: PropTypes.array,
  compare: PropTypes.bool,
  category: PropTypes.string
};

export default CustomCompareAccordionComponent;
