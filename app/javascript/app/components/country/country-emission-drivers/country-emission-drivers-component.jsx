/* eslint-disable no-confusing-arrow */
import React from 'react';
import Proptypes from 'prop-types';
import NoContent from 'components/no-content';

import AbbrReplace from 'components/abbr-replace';
import Loading from 'components/loading';
import Card from 'components/card';
import CardGraph from 'components/card-graph';
import ReactTooltip from 'react-tooltip';
import InfoButton from 'components/button/info-button';

import layout from 'styles/layout.scss';

import styles from './country-emission-drivers-styles.scss';

function CountryEmissionDrivers(props) {
  const {
    sectionData,
    countryName,
    maximumCountries,
    iso,
    handleInfoClick,
    loading
  } = props;

  const infoButton = slug => (
    <InfoButton
      className={styles.infoBtn}
      infoOpen={false}
      handleInfoClick={() => handleInfoClick(slug)}
    />
  );

  const renderContent = () => (
    <div>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>
            What are important sectoral emissions drivers in {countryName}?
          </h3>
          <div className={styles.descriptionContainer}>
            <AbbrReplace>
              <p>
                The following indicators show representative emissions drivers
                from the energy, agriculture and LULUCF sectors and their
                respective ranking compared to other countries.
              </p>
            </AbbrReplace>
          </div>
        </div>
        {loading ? (
          <Loading light className={styles.loader} />
        ) : (
          <div className={styles.cards}>
            <React.Fragment>
              {sectionData &&
                Object.values(sectionData.cards).map((card, i) => (
                  <Card
                    title={card.title}
                    contentFirst
                    info={infoButton(card.metadata)}
                    theme={{
                      card: styles[`squareCard${i + 1}`],
                      data: styles.cardData
                    }}
                  >
                    {card.data &&
                    card.data[0] &&
                    card.data[0].values &&
                    card.data[0].values.length > 0 ? (
                        <CardGraph
                          sectionData={card}
                          maximumCountries={maximumCountries}
                          noInfo
                          type={card.type}
                          iso={iso}
                        />
                      ) : (
                        <NoContent message="No data available" />
                      )}
                  </Card>
                ))}
              {sectionData && (
                <Card
                  title={sectionData.electricity.title}
                  contentFirst
                  info={infoButton(sectionData.electricity.metadata)}
                  theme={{
                    card: styles.chartCard,
                    data: styles.chartCardData
                  }}
                >
                  {' '}
                  {sectionData.electricity.data &&
                  sectionData.electricity.data[0] &&
                  sectionData.electricity.data[0].data.length > 0 ? (
                      <CardGraph
                        sectionData={sectionData.electricity.data}
                        noInfo
                        maximumCountries={maximumCountries}
                        type="LINE_CHART"
                        iso={iso}
                      />
                    ) : (
                      <NoContent message="No data available" />
                    )}
                </Card>
              )}
            </React.Fragment>
          </div>
        )}
        <ReactTooltip className={styles.tooltip} />
      </div>
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <div className={layout.content}>{renderContent()}</div>
    </div>
  );
}

CountryEmissionDrivers.propTypes = {
  sectionData: Proptypes.array,
  handleInfoClick: Proptypes.func.isRequired,
  countryName: Proptypes.string,
  iso: Proptypes.string,
  maximumCountries: Proptypes.number,
  loading: Proptypes.bool
};

export default CountryEmissionDrivers;
