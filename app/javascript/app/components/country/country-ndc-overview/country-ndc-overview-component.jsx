import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/button';
import Card from 'components/card';
import CardRow from 'components/card/card-row';
import Intro from 'components/intro';
import Icon from 'components/icon';
import cx from 'classnames';
import upperCase from 'lodash/upperCase';
import ModalMetadata from 'components/modal-metadata';
import Loading from 'components/loading';
import NoContent from 'components/no-content';
import ButtonGroup from 'components/button-group';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import introTheme from 'styles/themes/intro/intro-simple.scss';
import layout from 'styles/layout.scss';
import cardTheme from 'styles/themes/card/card-overflow-content.scss';
import alertIcon from 'assets/icons/alert.svg';
import NdcContentOverviewProvider from 'providers/ndc-content-overview-provider';

import styles from './country-ndc-overview-styles.scss';

const FEATURE_LTS_EXPLORE = process.env.FEATURE_LTS_EXPLORE === 'true';

class CountryNdcOverview extends PureComponent {
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
        variant="secondary"
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
        variant="primary"
        href={isNdcp ? href : null}
        link={isNdcp ? null : link}
        onClick={handleAnalyticsClick}
      >
        Explore NDC content
      </Button>
    );
  }

  renderLegacyCards() {
    const { sectors, values } = this.props;
    const renderSubtitle = (text, paddingLeft) => (
      <h4 className={cx(styles.subTitle, { [styles.paddedLeft]: paddingLeft })}>
        {text}
      </h4>
    );
    return (
      <div className="grid-column-item">
        <div className={styles.row}>
          <div className="layout-card-container">
            <div className={styles.subtitles}>
              {renderSubtitle('Mitigation contribution')}
              <TabletLandscape>
                {renderSubtitle('Adaptation contribution', true)}
              </TabletLandscape>
            </div>
            <div className={styles.legacyCards}>
              <div className="grid-column-item">
                <div className={styles.legacyCardsRowContainer}>
                  <Card title="GHG Target" contentFirst>
                    <div className={styles.cardContent}>
                      {values && values.ghg_target_type ? (
                        <React.Fragment>
                          <CardRow
                            rowData={{
                              title: 'Target type',
                              value:
                                values.ghg_target_type &&
                                values.ghg_target_type[0].value
                            }}
                          />
                          <CardRow
                            rowData={{
                              title: 'Target year',
                              value:
                                values.time_target_year &&
                                values.time_target_year[0].value
                            }}
                          />
                        </React.Fragment>
                      ) : (
                        <div className={styles.noContent}>Not included</div>
                      )}
                    </div>
                  </Card>
                  <Card title="Non-GHG Target" contentFirst>
                    <div className={styles.cardContent}>
                      {values && values.non_ghg_target ? (
                        <CardRow
                          rowData={{
                            title: '',
                            value: values.non_ghg_target[0].value
                          }}
                        />
                      ) : (
                        <div className={styles.noContent}>Not included</div>
                      )}
                    </div>
                  </Card>
                  <Card
                    title="Identified Sectors for Mitigation Action"
                    contentFirst
                  >
                    <div className={styles.cardContent}>
                      {values && values.coverage_sectors ? (
                        <CardRow
                          rowData={{
                            title: '',
                            value: values.coverage_sectors[0].value
                          }}
                        />
                      ) : (
                        <div className={styles.noContent}>Not included</div>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
              <TabletPortraitOnly>
                {renderSubtitle('Adaptation contribution')}
              </TabletPortraitOnly>
              <div className={styles.adaptationList}>
                <Card
                  title="Identified Sectors for Adaptation Action"
                  contentFirst
                >
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
        </div>
      </div>
    );
  }

  renderCards() {
    const { values } = this.props;
    return FEATURE_LTS_EXPLORE ? (
      <div className={styles.cards}>
        <Card title="Contribution Type" theme={cardTheme} contentFirst>
          <div className={styles.cardContent}>
            {values && values.mitigation_contribution_type ? (
              <React.Fragment>
                <CardRow
                  rowData={{
                    title: 'Mitigation contribution type',
                    value: values.mitigation_contribution_type[0].value
                  }}
                  theme={cardTheme}
                />
                <CardRow
                  rowData={{
                    title: 'Target type',
                    value:
                      values.ghg_target_type && values.ghg_target_type[0].value
                  }}
                  theme={cardTheme}
                />
                <CardRow
                  rowData={{
                    title: 'Adaptation included',
                    value: values.adaptation[0].value
                  }}
                  theme={cardTheme}
                />
              </React.Fragment>
            ) : (
              <div className={styles.noContent}>Not included</div>
            )}
          </div>
        </Card>
        <Card title="GHG Target" theme={cardTheme} contentFirst>
          <div className={styles.cardContent}>
            {values && values.time_target_year ? (
              <React.Fragment>
                <CardRow
                  rowData={{
                    title: 'Target year',
                    value: values.time_target_year[0].value
                  }}
                />
                <CardRow
                  rowData={{
                    title: 'Sectors covered',
                    value: values.coverage_sectors[0].value
                  }}
                />
              </React.Fragment>
            ) : (
              <div className={styles.noContent}>Not included</div>
            )}
          </div>
        </Card>
        <Card title="Non-GHG Target" theme={cardTheme} contentFirst>
          <div className={styles.cardContent}>
            {values && values.non_ghg_target ? (
              <CardRow
                rowData={{
                  title: '',
                  value: values.non_ghg_target[0].value
                }}
              />
            ) : (
              <div className={styles.noContent}>Not included</div>
            )}
          </div>
        </Card>
      </div>
    ) : (
      this.renderLegacyCards()
    );
  }

  renderAlertText = () => (
    <div className={styles.alertContainer}>
      <div className={styles.alert}>
        <Icon icon={alertIcon} className={styles.alertIcon} />
        <span className={styles.alertText}>
          The information shown below only reflects the selected NDC submission.
        </span>
      </div>
    </div>
  );

  render() {
    const {
      sectors,
      values,
      loading,
      actions,
      iso,
      isEmbed,
      selectedDocument
    } = this.props;
    const { date: documentDate } = selectedDocument || {};
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
    const summaryIntroText = !selectedDocument
      ? 'Summary'
      : `Summary of ${selectedDocument.document_type &&
          upperCase(selectedDocument.document_type)}`;
    return (
      <div className={cx(styles.wrapper, { [styles.embededWrapper]: isEmbed })}>
        {FEATURE_LTS_EXPLORE &&
          hasSectors &&
          !loading &&
          this.renderAlertText()}
        <NdcContentOverviewProvider
          locations={[iso]}
          document={selectedDocument && selectedDocument.document_type}
        />
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
                        actions
                          ? 'Nationally Determined Contribution (NDC) Overview'
                          : summaryIntroText
                      }
                      subtitle={documentDate && `(submitted[${documentDate}])`}
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

CountryNdcOverview.propTypes = {
  iso: PropTypes.string,
  sectors: PropTypes.array,
  values: PropTypes.object,
  loading: PropTypes.bool,
  actions: PropTypes.bool,
  isNdcp: PropTypes.bool,
  isEmbed: PropTypes.bool,
  handleInfoClick: PropTypes.func.isRequired,
  selectedDocument: PropTypes.object,
  handleAnalyticsClick: PropTypes.func.isRequired
};

export default CountryNdcOverview;
