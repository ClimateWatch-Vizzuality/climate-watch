import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './definition-list-styles.scss';

class DefinitionList extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { definitions, compare, className } = this.props;
    return (
      <dl className={className}>
        {definitions.map(def => (
          <div
            key={`${def.slug}`}
            className={cx(
              compare ? styles.definitionCompare : styles.definition
            )}
          >
            <dt className={styles.definitionTitle}>{def.title}</dt>
            {def.descriptions.map(desc => (
              <dd
                key={`${def.slug}-${desc.iso}`}
                className={styles.definitionDesc}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: desc.value }} // eslint-disable-line
                />
              </dd>
            ))}
          </div>
        ))}
      </dl>
    );
  }
}

DefinitionList.propTypes = {
  className: PropTypes.string,
  definitions: PropTypes.array,
  compare: PropTypes.bool
};

export default DefinitionList;
