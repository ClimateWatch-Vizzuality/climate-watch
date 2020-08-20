import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import layout from 'styles/layout.scss';

import styles from './definition-list-styles.scss';

const DefinitionList = ({
  className,
  title: sectionTitle,
  definitions,
  compare
}) => (
  <dl className={className} key={sectionTitle}>
    {definitions &&
      definitions.map(({ slug, title, descriptions }) => (
        <div className={styles.definitionRow} key={slug}>
          <div
            key={`${slug}-${title}-${sectionTitle}`}
            className={cx(
              layout.content,
              compare ? styles.definitionCompare : styles.definition
            )}
          >
            <dt className={styles.definitionTitle}>{title}:</dt>
            {descriptions &&
              descriptions.map(({ iso, value }) => (
                <dd key={`${slug}-${iso}`} className={styles.definitionDesc}>
                  {compare && value === '-' ? (
                    <div className={styles.noComparable}>
                      No comparable data available
                    </div>
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{ __html: value }} // eslint-disable-line
                    />
                  )}
                </dd>
              ))}
          </div>
        </div>
      ))}
  </dl>
);

DefinitionList.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  definitions: PropTypes.array,
  compare: PropTypes.bool
};

export default DefinitionList;
