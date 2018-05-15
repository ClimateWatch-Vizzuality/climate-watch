import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import layout from 'styles/layout';
import Loading from 'components/loading';
import SocioeconomicsProvider from 'providers/socioeconomics-provider';
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
        <div className={styles.compareSocioeconomics} key={index}>
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
    const { countrySocioeconomics, locations, loading } = this.props;
    return (
      <div className={styles.section}>
        <div className={layout.content}>
          <SocioeconomicsProvider locations={locations} />
          <div className="grid-column-item">
            <div className={styles.col3}>
              {countrySocioeconomics && countrySocioeconomics.some(c => c) ? (
                countrySocioeconomics.map((countrySocioeconomicData, i) =>
                  renderSocioeconomics(countrySocioeconomicData, i)
                )
              ) : (
                <NoContent
                  message={'No data selected'}
                  icon
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
  loading: PropTypes.bool
};

export default CompareSocioeconomics;
