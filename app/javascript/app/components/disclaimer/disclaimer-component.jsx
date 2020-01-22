import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/button';
import Icon from 'components/icon';
import closeIcon from 'assets/icons/sidebar-close.svg';
import cx from 'classnames';
import styles from './disclaimer-styles.scss';

class Disclaimer extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      handleOnRequestClose,
      hasBeenShown,
      className,
      onlyText
    } = this.props;
    return onlyText || !hasBeenShown ? (
      <div
        className={cx(
          styles.disclaimerBox,
          { [styles.onlyText]: onlyText },
          className
        )}
      >
        <div className={cx({ [styles.disclaimerLayout]: !onlyText })}>
          <div className={styles.firstText}>
            Please note that the level of emissions in future years is estimated
            based on the mitigation targets communicated by countries in their
            pre-2020 pledges and nationally determined contributions, which
            might differ from historical emissions presented in terms of source,
            sector and gas coverage, GWP values and inventory methodologies
            used. The historical levels of emissions and future target levels of
            emissions are presented on the same chart for illustration only and
            analysis drawn directly from the chart is therefore limited.
          </div>
          <div className={styles.secondText}>
            For detailed methodology and data sources used, please refer to
            UNEP’s{' '}
            <a
              className={styles.link}
              href="https://www.unenvironment.org/explore-topics/climate-change/what-we-do/mitigation/pledge-pipeline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pledge Pipeline
            </a>
            .
          </div>
          {!onlyText && (
            <Button
              className={styles.closeButton}
              onClick={handleOnRequestClose}
            >
              <Icon icon={closeIcon} className={styles.close} />
            </Button>
          )}
        </div>
      </div>
    ) : null;
  }
}

Disclaimer.propTypes = {
  hasBeenShown: PropTypes.bool,
  onlyText: PropTypes.bool,
  handleOnRequestClose: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default Disclaimer;
