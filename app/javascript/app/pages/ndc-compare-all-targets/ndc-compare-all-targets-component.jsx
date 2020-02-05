/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import Icon from 'components/icon';
import Button from 'components/button';
import cx from 'classnames';
import layout from 'styles/layout.scss';
import HandIconInfo from 'components/ndcs/shared/hand-icon-info';
import compareSubmittedIcon from 'assets/icons/compare-submitted.svg';
import compareNotSubmittedIcon from 'assets/icons/compare-not-submitted.svg';
import compareIntendsIcon from 'assets/icons/compare-intends.svg';
import styles from './ndc-compare-all-targets-styles.scss';

const renderLegend = () => (
  <div className={styles.legend}>
    <span className={styles.legendItem}>
      <Icon icon={compareSubmittedIcon} className={styles.submitIcon} />
      Submitted
    </span>
    <span className={styles.legendItem}>
      <Icon icon={compareNotSubmittedIcon} className={styles.submitIcon} />
      Not submitted
    </span>
    <span className={styles.legendItem}>
      <Icon icon={compareIntendsIcon} className={styles.submitIcon} />
      Intends to submit
    </span>
  </div>
);

const NDCCompareAllTargets = ({ route }) => (
  <div className={styles.wrapper}>
    <Header route={route}>
      <div className={cx(layout.content, styles.header)}>
        <div className={styles.title}>
          <Intro
            title="Compare all targets"
            description="It is important for countries’ various commitments, laws and policies align to achieve their climate objectives.
Explore a summary of which countries have submitted each type of target and compare all of them side-by-side."
          />
        </div>
      </div>
    </Header>
    <div className={cx(layout.content, styles.wrapper)}>
      <HandIconInfo
        className={styles.handIconInfo}
        text="Explore which countries have submitted long-term
            strategies thus far below. Visit Climate Watch in
            the coming months for in-depth analysis of long-term
            strategies."
      />
      <div className={styles.legendAndActions}>
        {renderLegend()}
        <Button variant="primary" disabled>
            Compare
        </Button>
      </div>
    </div>
  </div>
);

NDCCompareAllTargets.propTypes = {
  route: PropTypes.object.isRequired
};

export default NDCCompareAllTargets;
