/* eslint-disable no-confusing-arrow */
import React from 'react';
import Proptypes from 'prop-types';

import AbbrReplace from 'components/abbr-replace';
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
    handleInfoClick
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
                from the energy, agriculture and LUCF sectors and their
                respective ranking compared to other countries.
              </p>
            </AbbrReplace>
          </div>
          <div className={styles.cards}>
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
                  <CardGraph
                    sectionData={card}
                    maximumCountries={maximumCountries}
                    noInfo
                    type={card.type}
                    iso={iso}
                  />
                </Card>
              ))}
            {sectionData && (
              <Card
                title={sectionData.electricity.title}
                contentFirst
                info={infoButton(sectionData.electricity.metadata)}
                theme={{ card: styles.chartCard, data: styles.chartCardData }}
              >
                {' '}
                <CardGraph
                  sectionData={sectionData.electricity.data}
                  noInfo
                  maximumCountries={maximumCountries}
                  type="LINE_CHART"
                  iso={iso}
                />
              </Card>
            )}
          </div>
        </div>
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
  maximumCountries: Proptypes.number
};

export default CountryEmissionDrivers;
