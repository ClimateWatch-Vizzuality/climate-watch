import React from 'react';
import PropTypes from 'prop-types';
import Card from 'components/card';
import Intro from 'components/intro';
import cx from 'classnames';
import ModalMetadata from 'components/modal-metadata';
import Loading from 'components/loading';
import NoContent from 'components/no-content';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import introTheme from 'styles/themes/intro/intro-simple.scss';
import cardTheme from 'styles/themes/card/card-light.scss';
import layout from 'styles/layout.scss';
import NdcCountryAccordionProvider from 'providers/ndc-country-accordion-provider';

import styles from './country-lts-overview-styles.scss';

const CardRow = ({ rowData }) => (
  <React.Fragment>
    {rowData && (
      <div className={styles.cardRow}>
        <span className={styles.cardTitle}>{rowData.name || ''}</span>
        <p
          className={styles.targetText}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: rowData.value || ''
          }}
        />
      </div>
    )}
  </React.Fragment>
);

const Cards = ({ cardData }) => (
  <div className="grid-column-item">
    <div className={styles.row}>
      <div className="layout-card-container">
        <div className={styles.cards}>
          <div className="grid-column-item">
            {cardData ? (
              <div className={styles.cardsRowContainer}>
                <Card title="Submission" contentFirst theme={cardTheme}>
                  <div className={styles.cardContent}>
                    <CardRow rowData={cardData.lts_document} />
                    <CardRow rowData={cardData.lts_date} />
                  </div>
                </Card>
                <Card title="Mitigation" contentFirst theme={cardTheme}>
                  <div className={styles.cardContent}>
                    <CardRow rowData={cardData.lts_target} />
                    <CardRow rowData={cardData.lts_m_tt} />
                    <CardRow rowData={cardData.lts_zero} />
                  </div>
                </Card>
                <Card title="Modeling" contentFirst theme={cardTheme}>
                  <div className={styles.cardContent}>
                    <CardRow rowData={cardData.lts_m_sce_yn} />
                    <CardRow rowData={cardData.lts_m_model} />
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
  // eslint-disable-line react/prefer-stateless-function

  const { sectors, loading, actions, iso, isEmbed, cardData } = props;
  const hasSectors = !!sectors;
  const description = hasSectors && (
    <p
      className={styles.descriptionContainer}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: cardData && cardData.lts_vision
      }}
    />
  );

  return (
    <div className={cx(styles.wrapper, { [styles.embededWrapper]: isEmbed })}>
      <NdcCountryAccordionProvider locations={[iso]} category={'summary'} lts />
      {!hasSectors && !loading ? (
        <NoContent
          message="No overview content data"
          className={styles.noContentWrapper}
        />
      ) : (
        <div className="layout-container">
          {loading && <Loading light className={styles.loader} />}
          {hasSectors && (
            <div className={layout.content}>
              <div className="grid-column-item">
                <div className={cx(styles.header, actions ? styles.col2 : '')}>
                  <Intro theme={introTheme} title={'Long-term vision'} />
                  <TabletPortraitOnly>{description}</TabletPortraitOnly>
                </div>
                <TabletLandscape>{description}</TabletLandscape>
                <Cards cardData={cardData} />
              </div>
            </div>
          )}
        </div>
      )}
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
  sectors: PropTypes.object,
  cardData: PropTypes.object,
  loading: PropTypes.bool,
  actions: PropTypes.bool,
  isEmbed: PropTypes.bool
};

export default CountryLtsOverview;
