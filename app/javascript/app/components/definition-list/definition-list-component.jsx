import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import AbbrReplace, { replaceStringAbbr } from 'components/abbr-replace';
import layout from 'styles/layout.scss';
import PreviousSubmissionIcon from 'components/previous-submission-icon';
import ReactTooltip from 'react-tooltip';
import styles from './definition-list-styles.scss';

const FEATURE_ENHANCEMENT_CHANGES =
  process.env.FEATURE_ENHANCEMENT_CHANGES === 'true';

const renderComparisonWithPreviousNDCIcon = value => (
  <div>
    <PreviousSubmissionIcon
      value={value}
      tooltipId="definition-icon"
      className={styles.indicatorIcon}
    />
    <ReactTooltip id="definition-icon" />
  </div>
);

const DefinitionList = ({
  className,
  title: sectionTitle,
  definitions,
  compare,
  comparisonWithPreviousNDC
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
            <dt className={styles.definitionTitle}>
              <AbbrReplace>{title}</AbbrReplace>:
            </dt>
            {descriptions &&
              descriptions.map(({ iso, value }) => (
                <dd key={`${slug}-${iso}`} className={styles.definitionDesc}>
                  {compare && value === '-' ? (
                    <div className={styles.noComparable}>
                      No comparable data available
                    </div>
                  ) : (
                    <div className={styles.value}>
                      {FEATURE_ENHANCEMENT_CHANGES &&
                        comparisonWithPreviousNDC &&
                        renderComparisonWithPreviousNDCIcon(value)}
                      <div
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{
                          __html: replaceStringAbbr(value)
                        }}
                      />
                    </div>
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
  comparisonWithPreviousNDC: PropTypes.bool,
  compare: PropTypes.bool
};

export default DefinitionList;
