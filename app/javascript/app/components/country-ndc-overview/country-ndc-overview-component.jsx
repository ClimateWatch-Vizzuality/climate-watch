import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/button';
import Card from 'components/card';
import Intro from 'components/intro';
import cx from 'classnames';

import introTheme from 'styles/themes/intro/intro-simple.scss';
import layout from 'styles/layout.scss';
import styles from './country-ndc-overview-styles.scss';

const cardData = [
  {
    title: 'GHG Target',
    data: {
      targetType: 'Absolute Emission Reduction',
      targetYear: '2025'
    }
  },
  {
    title: 'Non-GHG Target',
    data: {
      targetType: 'Absolute Emission Reduction',
      targetYear: '2030'
    }
  },
  {
    title: 'Sectoral coverage'
  }
];

const listData = [
  'Cross-cutting area',
  'Education',
  'Energy',
  'Health',
  'LULUCF/Forestry',
  'Social Development'
];

class CountryNdcOverview extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { iso } = this.props;
    return (
      <div className={styles.wrapper}>
        <div className={layout.content}>
          <div className={cx(styles.header, styles.col2)}>
            <Intro
              theme={introTheme}
              title="NDC Content Overview"
              description="Brazil intends to commit to reduce greenhouse gas emissions by 37% below 2005 levels in 2025, with an indicative goal to reduce GHG emissions by 43% by 2030, relative to 2005 levels."
            />
            <div className={styles.actions}>
              <div className={styles.printButton} />
              <Button
                className={styles.exploreBtn}
                color="white"
                link={`/ndcs/compare?locations=${iso}`}
              >
                Compare
              </Button>
              <Button
                className={styles.exploreBtn}
                color="yellow"
                link={`/ghg-emissions?breakBy=location&filter=${iso}`}
              >
                See more
              </Button>
            </div>
          </div>
          <h4 className={styles.subTitle}>Mitigation contribution</h4>
          <div className={styles.cards}>
            {cardData &&
              cardData.map(card => (
                <Card title={card.title} key={card.title}>
                  <div className={styles.cardContent}>
                    {card.data && (
                      <div>
                        <span className={styles.metaTitle}>Target type</span>
                        <p className={styles.targetText}>
                          {card.data.targetType}
                        </p>
                        <span className={styles.metaTitle}>Target year</span>
                        <p className={styles.targetText}>
                          {card.data.targetYear}
                        </p>
                      </div>
                    )}
                    {!card.data && (
                      <div className={styles.noContent}>Not included</div>
                    )}
                  </div>
                </Card>
              ))}
            {listData && (
              <div>
                <h4 className={cx(styles.subTitle, styles.adaptionList)}>
                  Adaptation Contribution
                </h4>
                <ul className={styles.list}>
                  {listData.map(item => (
                    <li className={styles.listItem} key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

CountryNdcOverview.propTypes = {
  iso: PropTypes.string
};

export default CountryNdcOverview;
