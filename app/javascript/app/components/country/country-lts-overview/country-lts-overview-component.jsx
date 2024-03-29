import React from 'react';
import PropTypes from 'prop-types';
import Card from 'components/card';
import CardRow from 'components/card/card-row';
import Intro from 'components/intro';
import ButtonGroup from 'components/button-group';
import Button from 'components/button';
import cx from 'classnames';
import ModalMetadata from 'components/modal-metadata';
import Loading from 'components/loading';
import NoContent from 'components/no-content';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import introSmallTheme from 'styles/themes/intro/intro-simple-small.scss';
import introTheme from 'styles/themes/intro/intro-simple.scss';
import cardTheme from 'styles/themes/card/card-overflow-content.scss';
import layout from 'styles/layout.scss';
import LtsContentOverviewProvider from 'providers/lts-content-overview-provider';

import styles from './country-lts-overview-styles.scss';

const Cards = ({ cardData }) => (
  <div className="grid-column-item">
    <div className={styles.row}>
      <div className="layout-card-container">
        <div className={styles.cards}>
          <div className="grid-column-item">
            {cardData ? (
              <div className={styles.cardsRowContainer}>
                <Card title="Submission" theme={cardTheme} contentFirst>
                  <div className={styles.cardContent}>
                    <CardRow rowData={cardData.lts_document} />
                    <CardRow rowData={cardData.lts_date} />
                  </div>
                </Card>
                <Card title="Mitigation" theme={cardTheme} contentFirst>
                  <div className={styles.cardContent}>
                    <CardRow rowData={cardData.lts_target} />
                    <CardRow rowData={cardData.lts_m_tt} />
                  </div>
                </Card>
                <Card title="Adaptation" theme={cardTheme} contentFirst>
                  <div className={styles.cardContent}>
                    <CardRow rowData={cardData.lts_a_otc} />
                  </div>
                </Card>
              </div>
            ) : (
              <div className={styles.noContent}>Not included</div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CountryLtsOverview = props => {
  const {
    loading,
    iso,
    isEmbed,
    isNdcp,
    cardData,
    isCountryPage, // Remove isCountryPage (it will be always false) when FEATURE_COUNTRY_CHANGES is removed
    handleInfoClick,
    handleAnalyticsClick
  } = props;

  const renderInfoButton = () => {
    const notEmbeddedButtonConfig = [
      { type: 'info', onClick: handleInfoClick },
      {
        type: 'share',
        shareUrl: `/embed/countries/${iso}/lts-content-overview`,
        positionRight: true
      }
    ];
    const buttonGroupConfig = isEmbed
      ? [{ type: 'info', onClick: handleInfoClick }]
      : notEmbeddedButtonConfig;

    return (
      <ButtonGroup
        key="action1"
        className={styles.exploreBtn}
        buttonsConfig={buttonGroupConfig}
      />
    );
  };

  const renderCompareButton = () => {
    const href = `/contained/custom-compare/overview?targets=${iso}-lts`;
    const link = `/custom-compare/overview?targets=${iso}-lts`;
    return (
      <Button
        variant="secondary"
        href={isNdcp ? href : null}
        link={isNdcp ? null : link}
      >
        Compare
      </Button>
    );
  };

  const renderExploreButton = () => {
    const href = `/contained/lts/country/${iso}`;
    const link = `/lts/country/${iso}`;

    return (
      <Button
        className={styles.exploreBtn}
        variant="primary"
        href={isNdcp ? href : null}
        link={isNdcp ? null : link}
        onClick={handleAnalyticsClick}
      >
        Explore LTS content
      </Button>
    );
  };

  const description = !!cardData && (
    <div
      className={cx(styles.descriptionContainer, layout.parsedHTML)}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: cardData && cardData.lts_vision && cardData.lts_vision.value
      }}
    />
  );

  return (
    <div
      className={cx(
        styles.wrapper,
        { [styles.noContentHeight]: isCountryPage && !cardData },
        { [styles.embededWrapper]: isEmbed }
      )}
    >
      <LtsContentOverviewProvider locations={[iso]} />
      <div className="layout-container">
        {loading && <Loading light className={styles.loader} />}
        <div className={layout.content}>
          <div className="grid-column-item">
            <div
              className={cx(styles.header, {
                [styles.col2]: isCountryPage && cardData
              })}
            >
              <Intro
                theme={isCountryPage ? introSmallTheme : introTheme}
                title={
                  isCountryPage
                    ? 'Long-term Strategies (LTS) Overview'
                    : 'Long-term vision'
                }
                tag="h3"
              />
              {cardData && isCountryPage && (
                <div className="grid-column-item">
                  <div className={styles.actions}>
                    {renderInfoButton()}
                    {renderCompareButton()}
                    <TabletLandscape>{renderExploreButton()}</TabletLandscape>
                  </div>
                </div>
              )}
              <TabletPortraitOnly>{description}</TabletPortraitOnly>
            </div>
            <TabletLandscape>{description}</TabletLandscape>
            {cardData ? (
              <Cards cardData={cardData} />
            ) : (
              <NoContent
                message="This country hasn't submitted any Long-term Strategies"
                className={styles.noContentWrapper}
              />
            )}
          </div>
        </div>
      </div>
      <ModalMetadata />
    </div>
  );
};

CardRow.propTypes = {
  rowData: PropTypes.object
};

Cards.propTypes = {
  cardData: PropTypes.object
};

CountryLtsOverview.propTypes = {
  iso: PropTypes.string,
  cardData: PropTypes.object,
  loading: PropTypes.bool,
  isNdcp: PropTypes.bool,
  isEmbed: PropTypes.bool,
  isCountryPage: PropTypes.bool,
  handleInfoClick: PropTypes.func,
  handleAnalyticsClick: PropTypes.func
};

export default CountryLtsOverview;
