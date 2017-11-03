import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/button';
import Card from 'components/card';
import Intro from 'components/intro';
import cx from 'classnames';
import Loading from 'components/loading';
import NoContent from 'components/no-content';

import introTheme from 'styles/themes/intro/intro-simple.scss';
import layout from 'styles/layout.scss';
import styles from './country-ndc-overview-styles.scss';

class CountryNdcOverview extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { iso, sectors, values, loading, actions, textColumns } = this.props;
    const hasSectors = values && sectors;
    if (!hasSectors && !loading) {
      return (
        <NoContent
          message="No overview content data"
          className={styles.noContent}
        />
      );
    }
    return (
      <div className={styles.wrapper}>
        <div className={layout.content}>
          {loading && <Loading light className={styles.loader} />}
          {hasSectors && (
            <div>
              <div className={cx(styles.header, actions ? styles.col2 : '')}>
                <Intro
                  theme={introTheme}
                  title={
                    actions ? (
                      'Nationally Determined Contribution (NDC) Overview'
                    ) : (
                      'Overview'
                    )
                  }
                  description={values.indc_summary[0].value}
                  textColumns={textColumns}
                />
                {actions && (
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
                      link={`/ndcs/country/${iso}`}
                    >
                      Explore NDC content
                    </Button>
                  </div>
                )}
              </div>
              <h4 className={styles.subTitle}>Mitigation contribution</h4>
              <div className={styles.cards}>
                <Card title="GHG Target">
                  <div className={styles.cardContent}>
                    {values.ghg_target_type.length ? (
                      <div>
                        <span className={styles.metaTitle}>Target type</span>
                        <p
                          className={styles.targetText}
                          dangerouslySetInnerHTML={{
                            // eslint-disable-line
                            __html: values.ghg_target_type[0].value
                          }}
                        />
                        <span className={styles.metaTitle}>Target year</span>
                        <p
                          className={styles.targetText}
                          dangerouslySetInnerHTML={{
                            // eslint-disable-line
                            __html: values.time_target_year[0].value
                          }}
                        />
                      </div>
                    ) : (
                      <div className={styles.noContent}>Not included</div>
                    )}
                  </div>
                </Card>
                <Card title="Non-GHG Target">
                  <div className={styles.cardContent}>
                    {values.non_ghg_target.length ? (
                      <p
                        className={styles.targetText}
                        dangerouslySetInnerHTML={{
                          // eslint-disable-line
                          __html: values.non_ghg_target[0].value
                        }}
                      />
                    ) : (
                      <div className={styles.noContent}>Not included</div>
                    )}
                  </div>
                </Card>
                <Card title="Sectoral coverage">
                  <div className={styles.cardContent}>
                    {values.coverage_sectors_short.length ? (
                      <p
                        className={styles.targetText}
                        dangerouslySetInnerHTML={{
                          // eslint-disable-line
                          __html: values.coverage_sectors_short[0].value
                        }}
                      />
                    ) : (
                      <div className={styles.noContent}>Not included</div>
                    )}
                  </div>
                </Card>
                <div>
                  <h4 className={cx(styles.subTitle, styles.adaptionList)}>
                    Adaptation Contribution
                  </h4>
                  <Card title="Sectoral coverage">
                    <div className={styles.cardContent}>
                      {sectors.length ? (
                        <ul className={styles.list}>
                          {sectors.map(sector => (
                            <li key={sector} className={styles.listItem}>
                              {sector}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className={styles.noContent}>Not included</div>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

CountryNdcOverview.propTypes = {
  iso: PropTypes.string,
  sectors: PropTypes.array,
  values: PropTypes.object,
  loading: PropTypes.bool,
  actions: PropTypes.bool,
  textColumns: PropTypes.bool
};

export default CountryNdcOverview;
