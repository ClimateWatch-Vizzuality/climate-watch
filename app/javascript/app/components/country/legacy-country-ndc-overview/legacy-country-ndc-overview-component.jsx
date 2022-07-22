import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/button';
import Card from 'components/card';
import CardRow from 'components/card/card-row';
import Intro from 'components/intro';
import Icon from 'components/icon';
import cx from 'classnames';
import moment from 'moment-timezone';
import ModalMetadata from 'components/modal-metadata';
import Loading from 'components/loading';
import NoContent from 'components/no-content';
import ButtonGroup from 'components/button-group';
import AbbrReplace, { replaceStringAbbr } from 'components/abbr-replace';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import introSmallTheme from 'styles/themes/intro/intro-simple-small.scss';
import introTheme from 'styles/themes/intro/intro-simple.scss';
import layout from 'styles/layout.scss';
import cardTheme from 'styles/themes/card/card-overflow-content.scss';
import alertIcon from 'assets/icons/alert.svg';
import NdcContentOverviewProvider from 'providers/ndc-content-overview-provider';
import CountriesDocumentsProvider from 'providers/countries-documents-provider';

import styles from './legacy-country-ndc-overview-styles.scss';

const isCountryPage = true;

function CountryNdcOverview(props) {
  const {
    sectors,
    values,
    loading,
    iso,
    isEmbed,
    isNdcp,
    handleInfoClick,
    handleAnalyticsClick,
    ndcsDocument,
    ltsDocument,
    countryName
  } = props;

  const renderInfoButton = () => {
    const notEmbeddedButtonConfig = [
      { type: 'info', onClick: handleInfoClick },
      {
        type: 'share',
        shareUrl: `/embed/countries/${iso}/ndc-content-overview`,
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
    const link = `/custom-compare/mitigation?targets=${iso}-${ndcsDocument &&
      ndcsDocument.slug}${ltsDocument ? `,${iso}-lts` : ''}`;
    const href = `/contained${link}`;
    return (
      <Button
        {...{
          variant: 'secondary',
          href: isNdcp ? href : null,
          link: isNdcp ? null : link,
          disabled: !ndcsDocument
        }}
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
      <Card title={'Contribution Type'} theme={cardTheme} contentFirst>
        <div className={styles.cardContent}>
          <React.Fragment>
            {values?.mitigation_contribution_type && (
              <CardRow
                rowData={{
                  title: 'Mitigation contribution type',
                  value: values.mitigation_contribution_type[0].value
                }}
                theme={cardTheme}
              />
            )}
            {values?.ghg_target_type && (
              <CardRow
                rowData={{
                  title: 'Target type',
                  value:
                    values.ghg_target_type && values.ghg_target_type[0].value
                }}
                theme={cardTheme}
              />
            )}
            {values?.adaptation && (
              <CardRow
                rowData={{
                  title: 'Adaptation included',
                  value: values.adaptation && values.adaptation[0].value
                }}
                theme={cardTheme}
              />
            )}
          </React.Fragment>
          {!values?.mitigation_contribution_type && (
            <div className={styles.noContent}>Not included</div>
          )}
        </div>
      </Card>
      <Card title={'GHG Target'} theme={cardTheme} contentFirst>
        <div className={styles.cardContent}>
          <React.Fragment>
            {values?.time_target_year && (
              <CardRow
                rowData={{
                  title: 'Target year',
                  value: values.time_target_year[0].value
                }}
              />
            )}
            {values?.coverage_sectors && (
              <CardRow
                rowData={{
                  title: 'Sectors covered',
                  value: values.coverage_sectors[0].value
                }}
              />
            )}
          </React.Fragment>
          {!values?.time_target_year && (
            <div className={styles.noContent}>Not included</div>
          )}
        </div>
      </Card>
      <Card title={'Non-GHG Target'} theme={cardTheme} contentFirst>
        <div className={styles.cardContent}>
          <React.Fragment>
            {values?.non_ghg_target_year && (
              <CardRow
                rowData={{
                  title: '',
                  value: values.non_ghg_target[0].value
                }}
              />
            )}
          </React.Fragment>
          {!values?.non_ghg_target_year && (
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
          <AbbrReplace>
            The information shown below only reflects the{' '}
            {!isCountryPage ? 'selected' : 'last'} NDC submission.
          </AbbrReplace>
        </span>
      </div>
    </div>
  );

  const { submission_date: documentDate } = ndcsDocument || {};
  const hasSectors = values && sectors;
  const description = hasSectors && (
    <div
      className={cx(styles.descriptionContainer, layout.parsedHTML)}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html:
          values.indc_summary &&
          values.indc_summary[0] &&
          replaceStringAbbr(values.indc_summary[0].value)
      }}
    />
  );
  const summaryIntroText = !ndcsDocument
    ? 'Summary'
    : `Summary of ${ndcsDocument.long_name}`;

  const introTitle = useMemo(() => {
    if (!isCountryPage) return summaryIntroText;

    return 'Nationally Determined Contribution (NDC) Overview';
  }, [isCountryPage, countryName]);

  const renderIntro = () => (
    <Intro
      theme={isCountryPage ? introSmallTheme : introTheme}
      title={introTitle}
      {...{
        subtitle:
          documentDate &&
          `(submitted ${moment(documentDate).format('MM/DD/YYYY')})`,
        tag: 'h3'
      }}
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
        document={ndcsDocument && ndcsDocument.slug}
      />
      {renderContent()}
      <ModalMetadata />
    </div>
  );
}

CountryNdcOverview.propTypes = {
  iso: PropTypes.string,
  countryName: PropTypes.string,
  sectors: PropTypes.array,
  values: PropTypes.object,
  loading: PropTypes.bool,
  isNdcp: PropTypes.bool,
  isEmbed: PropTypes.bool,
  handleInfoClick: PropTypes.func.isRequired,
  ndcsDocument: PropTypes.object,
  ltsDocument: PropTypes.object,
  handleAnalyticsClick: PropTypes.func.isRequired
};

export default CountryNdcOverview;
