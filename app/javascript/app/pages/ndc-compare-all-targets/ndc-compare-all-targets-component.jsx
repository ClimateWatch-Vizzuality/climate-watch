/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import cx from 'classnames';
import layout from 'styles/layout.scss';
import HandIconInfo from 'components/ndcs/shared/hand-icon-info';
import styles from './ndc-compare-all-targets-styles.scss';

class NDCCompareAllTargets extends PureComponent {
  render() {
    const { route } = this.props;
    return (
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
            text="Explore which countries have submitted long-term
              strategies thus far below. Visit Climate Watch in
              the coming months for in-depth analysis of long-term
              strategies."
          />
        </div>
      </div>
    );
  }
}

NDCCompareAllTargets.propTypes = {
  route: PropTypes.object.isRequired
};

export default NDCCompareAllTargets;
