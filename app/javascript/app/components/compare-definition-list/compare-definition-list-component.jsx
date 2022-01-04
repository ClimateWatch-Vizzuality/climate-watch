import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import AbbrReplace, { replaceStringAbbr } from 'components/abbr-replace';
import layout from 'styles/layout.scss';
import PreviousSubmissionIcon from 'components/previous-submission-icon';
import ReactTooltip from 'react-tooltip';
import styles from './compare-definition-list-styles.scss';

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

const CompareDefinitionList = ({
  className,
  title: sectionTitle,
  definitions,
  comparisonWithPreviousNDC
}) => (
  <dl className={className} key={sectionTitle}>
    {definitions &&
      definitions.map(({ slug, title, descriptions }) => (
        <div className={styles.definitionRow} key={slug}>
          <div
            key={`${slug}-${title}-${sectionTitle}`}
            className={cx(layout.content, styles.definitionCompare)}
          >
            <dt className={styles.definitionTitle}>
              <AbbrReplace>{title}</AbbrReplace>:
            </dt>
            {descriptions &&
              descriptions.map(({ iso, value }) => (
                <dd key={`${slug}-${iso}`} className={styles.definitionDesc}>
                  {value === '-' ? (
                    <div className={styles.noComparable}>
                      No comparable data available
                    </div>
                  ) : (
                    <div className={styles.value}>
                      {comparisonWithPreviousNDC &&
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

CompareDefinitionList.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  definitions: PropTypes.array,
  comparisonWithPreviousNDC: PropTypes.bool
};

export default CompareDefinitionList;
