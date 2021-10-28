/* eslint-disable no-confusing-arrow */
import React from 'react';
import PropTypes from 'prop-types';
import PreviousSubmissionIcon from 'components/previous-submission-icon';
import AbbrReplace from 'components/abbr-replace';
import ReactTooltip from 'react-tooltip';
import cx from 'classnames';
import styles from './custom-definition-list-styles.scss';

function CustomDefinitionList({ definitions, className }) {
  const renderComparisonWithPreviousNDC = () =>
    definitions.map(def => (
      <div
        key={`${def.slug}-${def.title}-${Math.random()}`}
        className={styles.previousNDCDefinition}
      >
        {def.descriptions &&
          def.descriptions.map(desc => (
            <dd
              key={`${def.slug}-${desc.iso}`}
              className={styles.definitionDesc}
            >
              <PreviousSubmissionIcon
                value={desc.value}
                tooltipId="definition-icon"
                className={styles.tooltipIndicatorIcon}
              />
              <ReactTooltip id="definition-icon" />
            </dd>
          ))}
        <dt className={styles.definitionTitle}>
          <AbbrReplace>{def.title}</AbbrReplace>
        </dt>
      </div>
    ));

  return (
    <div className="grid-column-item">
      <div className={cx(className, styles.overallContainer)}>
        <h3>Overall comparison with previous NDC</h3>
        <dl className={styles.comparisonWithPreviousNDCContainer}>
          {definitions &&
            definitions.length > 0 &&
            renderComparisonWithPreviousNDC()}
        </dl>
      </div>
    </div>
  );
}

CustomDefinitionList.propTypes = {
  definitions: PropTypes.array,
  className: PropTypes.string
};

export default CustomDefinitionList;
