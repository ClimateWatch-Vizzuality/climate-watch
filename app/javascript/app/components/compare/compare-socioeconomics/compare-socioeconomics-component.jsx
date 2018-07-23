import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import layout from 'styles/layout';
import Loading from 'components/loading';
import SocioeconomicsProvider from 'providers/socioeconomics-provider';
import { TabletPortraitOnly } from 'components/responsive';
import { CHART_COLORS } from 'data/constants';
import cx from 'classnames';
import NoContent from 'components/no-content';
import styles from './compare-socioeconomics-styles.scss';

class CompareSocioeconomics extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  render() {
    const renderSocioeconomics = (data, index) => {
      if (!data) {
        return loading ? (
          <Loading light className={styles.loader} />
        ) : (
          <div className={styles.compareSocioeconomics} key={index} />
        );
      }
      const {
        gdpPerCapitaLocale,
        gdp_per_capita_rank,
        gdp_per_capita_year,
        populationLocale,
        populationGrowthLocale,
        population_year
      } = data;
      return (
        <div key={index}>
          {gdpPerCapitaLocale && gdp_per_capita_rank ? (
            <div className={styles.line}>
              <div
                className={styles.title}
              >{`GDP per capita (${gdp_per_capita_year})`}</div>
              <div
                className={styles.value}
              >{`USD ${gdpPerCapitaLocale} (ranked ${gdp_per_capita_rank} globally)`}</div>
            </div>
          ) : null}
          {populationLocale && populationGrowthLocale ? (
            <div className={styles.line}>
              <div
                className={styles.title}
              >{`Population (${population_year})`}</div>
              <div
                className={styles.value}
              >{`${populationLocale} (${populationGrowthLocale}% annual growth)`}</div>
            </div>
          ) : null}
        </div>
      );
    };
    const {
      countrySocioeconomics,
      locations,
      locationNames,
      loading
    } = this.props;
    const hasLocationNames = locationNames && locationNames.length;
    return (
      <div className={styles.section}>
        <div className={layout.content}>
          <SocioeconomicsProvider locations={locations} />
          <div className="grid-column-item">
            <div className={styles.col3}>
              {countrySocioeconomics && countrySocioeconomics.some(c => c) ? (
                countrySocioeconomics.map((countrySocioeconomicData, i) => (
                  <div
                    key={`socioeconomic-${i}{${locations[i]}`} //eslint-disable-line
                    className={styles.compareSocioeconomics}
                  >
                    <TabletPortraitOnly>
                      {hasLocationNames && locationNames[i] && (
                        <div className={cx(styles.countryHeader)}>
                          <div
                            className={styles.dot}
                            style={{ backgroundColor: CHART_COLORS[i] }}
                          />
                          <div className={styles.countryName}>
                            {locationNames[i]}
                          </div>
                        </div>
                      )}
                    </TabletPortraitOnly>
                    {renderSocioeconomics(countrySocioeconomicData, i)}
                  </div>
                ))
              ) : (
                <NoContent
                  message={'No data selected'}
                  className={styles.noData}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CompareSocioeconomics.propTypes = {
  countrySocioeconomics: PropTypes.array,
  locations: PropTypes.array,
  locationNames: PropTypes.array,
  loading: PropTypes.bool
};

export default CompareSocioeconomics;
