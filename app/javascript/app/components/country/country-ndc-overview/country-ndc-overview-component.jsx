import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/button';
import Card from 'components/card';
import CardRow from 'components/card/card-row';
import Intro from 'components/intro';
import Icon from 'components/icon';
import cx from 'classnames';
import moment from 'moment';
import ModalMetadata from 'components/modal-metadata';
import Loading from 'components/loading';
import NoContent from 'components/no-content';
import ButtonGroup from 'components/button-group';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import introSmallTheme from 'styles/themes/intro/intro-simple-small.scss';
import introTheme from 'styles/themes/intro/intro-simple.scss';
import layout from 'styles/layout.scss';
import cardTheme from 'styles/themes/card/card-overflow-content.scss';
import alertIcon from 'assets/icons/alert.svg';
import NdcContentOverviewProvider from 'providers/ndc-content-overview-provider';
import CountriesDocumentsProvider from 'providers/countries-documents-provider';

import styles from './country-ndc-overview-styles.scss';

function CountryNdcOverview(props) {
  // TODO: At some point we might want to split the country page component into a different one
  const {
    sectors,
    values,
    loading,
    isCountryPage,
    iso,
    isEmbed,
    isNdcp,
    handleInfoClick,
    handleAnalyticsClick,
    selectedDocument
  } = props;

  const renderInfoButton = () => {
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
  };

  const renderCompareButton = () => {
    const link = `/custom-compare/mitigation?targets=${iso}-${selectedDocument &&
      selectedDocument.slug}`;
    const href = `/contained${link}`;
    return (
      <Button
        variant="secondary"
        href={isNdcp ? href : null}
        link={isNdcp ? null : link}
        disabled={!selectedDocument}
      >
        Compare
      </Button>
    );
  };

  const renderExploreButton = () => {
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
  };

  const renderCards = () => (
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
  );

  const renderAlertText = () => (
    <div className={styles.alertContainer}>
      <div className={styles.alert}>
        <Icon icon={alertIcon} className={styles.alertIcon} />
        <span className={styles.alertText}>
          The information shown below only reflects the{' '}
          {!isCountryPage ? 'selected' : 'last'} NDC submission.
        </span>
      </div>
    </div>
  );

  const { submission_date: documentDate } = selectedDocument || {};
  const hasSectors = values && sectors;
  const description = hasSectors && (
    <div
      className={cx(styles.descriptionContainer, layout.parsedHTML)}
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
    : `Summary of ${selectedDocument.long_name}`;
  const renderIntro = () => (
    <Intro
      theme={isCountryPage ? introSmallTheme : introTheme}
      title={
        isCountryPage
          ? 'Nationally Determined Contribution (NDC) Overview'
          : summaryIntroText
      }
      subtitle={
        documentDate &&
        `(submitted ${moment(documentDate).format('MM/DD/YYYY')})`
      }
    />
  );

  const renderContent = () => {
    if (!hasSectors && !loading) {
      return isCountryPage ? (
        <div className={layout.content}>
          <div className="grid-column-item">
            <div className={cx(styles.header)}>
              {renderIntro()}
              <NoContent
                message="This country hasn't submitted any Nationally Determined Contribution"
                className={styles.noContentWrapper}
              />
            </div>
          </div>
        </div>
      ) : (
        <NoContent
          message="No overview content data"
          className={styles.noContentWrapper}
        />
      );
    }
    return (
      <div className="layout-container">
        {loading && <Loading light className={styles.loader} />}
        {hasSectors && (
          <div className={layout.content}>
            <div className="grid-column-item">
              <div
                className={cx(styles.header, {
                  [styles.col2]: isCountryPage
                })}
              >
                {renderIntro()}
                <TabletPortraitOnly>{description}</TabletPortraitOnly>
                {isCountryPage && (
                  <div className="grid-column-item">
                    <div className={styles.actions}>
                      {renderInfoButton()}
                      {renderCompareButton()}
                      <TabletLandscape>{renderExploreButton()}</TabletLandscape>
                    </div>
                  </div>
                )}
              </div>
              <TabletLandscape>{description}</TabletLandscape>
              {renderCards()}
              <TabletPortraitOnly>
                {isCountryPage && renderExploreButton()}
              </TabletPortraitOnly>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cx(styles.wrapper, { [styles.embededWrapper]: isEmbed })}>
      {hasSectors && !loading && renderAlertText()}
      <CountriesDocumentsProvider location={iso} />
      <NdcContentOverviewProvider
        locations={[iso]}
        document={selectedDocument && selectedDocument.slug}
      />
      {renderContent()}
      <ModalMetadata />
    </div>
  );
}

CountryNdcOverview.propTypes = {
  iso: PropTypes.string,
  sectors: PropTypes.array,
  values: PropTypes.object,
  loading: PropTypes.bool,
  isCountryPage: PropTypes.bool,
  isNdcp: PropTypes.bool,
  isEmbed: PropTypes.bool,
  handleInfoClick: PropTypes.func.isRequired,
  selectedDocument: PropTypes.object,
  handleAnalyticsClick: PropTypes.func.isRequired
};

export default CountryNdcOverview;
