/* eslint-disable no-confusing-arrow */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import PreviousSubmissionIcon from 'components/previous-submission-icon';
import AbbrReplace, { replaceStringAbbr } from 'components/abbr-replace';
import layoutStyles from 'app/styles/layout.scss';
import ReactTooltip from 'react-tooltip';
import styles from './definition-list-legacy-styles.scss';

class DefinitionList extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      definitions,
      compare,
      className,
      comparisonWithPreviousNDC
    } = this.props;

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

    const renderDefinitions = () =>
      comparisonWithPreviousNDC
        ? renderComparisonWithPreviousNDC()
        : definitions.map(def => (
          <div className="grid-column-item" key={def.slug}>
            <div
              key={`${def.slug}-${def.title}-${Math.random()}`}
              className={cx(
                compare ? styles.definitionCompare : styles.definition
              )}
            >
              <dt className={styles.definitionTitle}>
                <AbbrReplace>{def.title}</AbbrReplace>
              </dt>
              {def.descriptions &&
                  def.descriptions.map(desc => (
                    <dd
                      key={`${def.slug}-${desc.iso}`}
                      className={styles.definitionDesc}
                    >
                      <div
                        className={layoutStyles.parsedHTML}
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{
                          __html: replaceStringAbbr(desc.value)
                        }}
                      />
                    </dd>
                  ))}
            </div>
          </div>
        ));

    return (
      <dl
        className={cx({
          [className]: !comparisonWithPreviousNDC,
          [styles.comparisonWithPreviousNDCContainer]: comparisonWithPreviousNDC
        })}
      >
        {definitions && definitions.length > 0 && renderDefinitions()}
      </dl>
    );
  }
}

DefinitionList.propTypes = {
  className: PropTypes.string,
  definitions: PropTypes.array,
  compare: PropTypes.bool,
  comparisonWithPreviousNDC: PropTypes.bool
};

export default DefinitionList;
