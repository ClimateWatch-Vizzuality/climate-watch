import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/button';
import Card from 'components/card';
import Intro from 'components/intro';
import cx from 'classnames';
import ModalMetadata from 'components/modal-metadata';
import Loading from 'components/loading';
import NoContent from 'components/no-content';
import ButtonGroup from 'components/button-group';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import introTheme from 'styles/themes/intro/intro-simple.scss';
import layout from 'styles/layout.scss';
// import NdcContentOverviewProvider from 'providers/ndc-content-overview-provider';
import LtsCountryAccordionProvider from 'providers/lts-country-accordion-provider';

import styles from './country-lts-overview-styles.scss';

class CountryLtsOverview extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  renderInfoButton() {
    const { handleInfoClick, isEmbed, iso } = this.props;
    const buttonGroupConfig = isEmbed
      ? [{ type: 'info', onClick: handleInfoClick }]
      : [
        { type: 'info', onClick: handleInfoClick },
        {
          type: 'share',
          shareUrl: `/embed/countries/${iso}/ndc-content-overview`,
          positionRight: true
        }
      ];

    return (
      <ButtonGroup
        key="action1"
        className={styles.exploreBtn}
        buttonsConfig={buttonGroupConfig}
      />
    );
  }

  renderCompareButton() {
    const { iso, isNdcp } = this.props;
    const href = `/contained/ndcs/compare/mitigation?locations=${iso}`;
    const link = `/ndcs/compare/mitigation?locations=${iso}`;
    return (
      <Button
        color="white"
        href={isNdcp ? href : null}
        link={isNdcp ? null : link}
      >
        Compare
      </Button>
    );
  }

  renderExploreButton() {
    const { iso, handleAnalyticsClick, isNdcp } = this.props;

    const href = `/contained/ndcs/country/${iso}`;
    const link = `/ndcs/country/${iso}`;

    return (
      <Button
        className={styles.exploreBtn}
        color="yellow"
        href={isNdcp ? href : null}
        link={isNdcp ? null : link}
        onClick={handleAnalyticsClick}
      >
        Explore NDC content
      </Button>
    );
  }


  renderCards() {
    const { sectors, values } = this.props;
    const renderSubtitle = text => <h4 className={styles.subTitle}>{text}</h4>;

    const { card, contentContainer, data, title } = styles;
    const theme = {
      card,
      contentContainer,
      data,
      title
    };
  
    return (
      <div className="grid-column-item">
        <div className={styles.row}>
          <div className="layout-card-container">
            <div className={styles.cards}>
              <div className="grid-column-item">
                <div className={styles.cardsRowContainer}>
                  <Card
                    title="Contribution type"
                    contentFirst
                    theme={theme}
                  >
                    <div className={styles.cardContent}>
                      {values && values.coverage_sectors ? (
                        <p
                          className={styles.targetText}
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html: values.coverage_sectors[0].value
                          }}
                        />
                      ) : (
                        <div className={styles.noContent}>Not included</div>
                      )}
                    </div>
                  </Card>
                  <Card
                    title="GHG Target"
                    contentFirst
                    theme={theme}
                  >
                    <div className={styles.cardContent}>
                      {values && values.ghg_target_type ? (
                        <React.Fragment>
                          <div className={styles.metaSection}>
                            <span className={styles.metaTitle}>Target type</span>
                            <p
                              className={styles.targetText}
                              // eslint-disable-next-line react/no-danger
                              dangerouslySetInnerHTML={{
                                __html: values.ghg_target_type[0].value
                              }}
                            />
                          </div>
                          <div className={styles.metaSection}>
                            <span className={styles.metaTitle}>Target year</span>
                            <p
                              className={styles.targetText}
                              // eslint-disable-next-line react/no-danger
                              dangerouslySetInnerHTML={{
                                __html: values.time_target_year[0].value
                              }}
                            />
                          </div>
                        </React.Fragment>
                      ) : (
                        <div className={styles.noContent}>Not included</div>
                      )}
                    </div>
                  </Card>
                  <Card
                    title="Non-GHG Target"
                    contentFirst
                    theme={theme}
                  >
                    <div className={styles.cardContent}>
                      {values && values.non_ghg_target ? (
                        <p
                          className={styles.targetText}
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html: values.non_ghg_target[0].value
                          }}
                        />
                      ) : (
                        <div className={styles.noContent}>Not included</div>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { sectors, values, loading, actions, iso, isEmbed } = this.props;
    const hasSectors = values && sectors;
    const description = hasSectors && (
      <p
        className={styles.descriptionContainer}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html:
            values.indc_summary &&
            values.indc_summary[0] &&
            values.indc_summary[0].value
        }}
      />
    );

    return (
      <div className={cx(styles.wrapper, { [styles.embededWrapper]: isEmbed })}>
        <LtsCountryAccordionProvider locations={[iso]} />
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
                  <div
                    className={cx(styles.header, actions ? styles.col2 : '')}
                  >
                    <Intro
                      theme={introTheme}
                      title={
                        actions ? (
                          'Nationally Determined Contribution (NDC) Overview'
                        ) : (
                          'Summary'
                        )
                      }
                    />
                    <TabletPortraitOnly>{description}</TabletPortraitOnly>
                    {actions && (
                      <div className="grid-column-item">
                        <div className={styles.actions}>
                          {this.renderInfoButton()}
                          {this.renderCompareButton()}
                          <TabletLandscape>
                            {this.renderExploreButton()}
                          </TabletLandscape>
                        </div>
                      </div>
                    )}
                  </div>
                  <TabletLandscape>{description}</TabletLandscape>
                  {this.renderCards()}
                  <TabletPortraitOnly>
                    {actions && this.renderExploreButton()}
                  </TabletPortraitOnly>
                </div>
              </div>
            )}
          </div>
        )}
        <ModalMetadata />
      </div>
    );
  }
}

CountryLtsOverview.propTypes = {
  iso: PropTypes.string,
  sectors: PropTypes.array,
  values: PropTypes.object,
  loading: PropTypes.bool,
  actions: PropTypes.bool,
  isNdcp: PropTypes.bool,
  isEmbed: PropTypes.bool,
  handleInfoClick: PropTypes.func.isRequired,
  handleAnalyticsClick: PropTypes.func.isRequired
};

export default CountryLtsOverview;
