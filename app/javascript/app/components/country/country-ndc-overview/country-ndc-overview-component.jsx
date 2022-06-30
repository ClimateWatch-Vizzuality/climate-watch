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
    ndcsDocument,
    ltsDocument,
    countryName
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
    const link = `/custom-compare/mitigation?targets=${iso}-${ndcsDocument &&
      ndcsDocument.slug}${ltsDocument ? `,${iso}-lts` : ''}`;
    const href = `/contained${link}`;
    return (
      <Button
        {...(process.env.FEATURE_COUNTRY_CHANGES === 'true' && {
          variant: 'primary',
          href: link
        })}
        {...(process.env.FEATURE_COUNTRY_CHANGES !== 'true' && {
          variant: 'secondary',
          href: isNdcp ? href : null,
          link: isNdcp ? null : link,
          disabled: !ndcsDocument
        })}
      >
        {process.env.FEATURE_COUNTRY_CHANGES === 'true'
          ? 'Compare targets and see how they align'
          : 'Compare'}
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
      <Card
        title={
          process.env.FEATURE_COUNTRY_CHANGES === 'true'
            ? 'Latest NDC'
            : 'Contribution Type'
        }
        theme={cardTheme}
        contentFirst
      >
        <div className={styles.cardContent}>
          {process.env.FEATURE_COUNTRY_CHANGES === 'true' && (
            <React.Fragment>
              {values?.ghg_target && (
                <CardRow
                  rowData={{
                    title: 'GHG target',
                    value: values.ghg_target
                  }}
                  theme={cardTheme}
                />
              )}
              {values?.mitigation_contribution_type && (
                <CardRow
                  rowData={{
                    title: 'Mitigation contribution type',
                    value: values.mitigation_contribution_type
                  }}
                  theme={cardTheme}
                />
              )}
              {values?.adaptation && (
                <CardRow
                  rowData={{
                    title: 'Adaptation included',
                    value: values.adaptation
                  }}
                  theme={cardTheme}
                />
              )}
            </React.Fragment>
          )}
          {process.env.FEATURE_COUNTRY_CHANGES !== 'true' && (
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
          )}
          {!values?.mitigation_contribution_type && (
            <div className={styles.noContent}>Not included</div>
          )}
        </div>
      </Card>
      <Card
        title={
          process.env.FEATURE_COUNTRY_CHANGES === 'true'
            ? 'Long Term Strategy'
            : 'GHG Target'
        }
        theme={cardTheme}
        contentFirst
      >
        <div className={styles.cardContent}>
          {process.env.FEATURE_COUNTRY_CHANGES === 'true' && (
            <React.Fragment>
              {values?.lts_target && (
                <CardRow
                  rowData={{
                    title: 'Quantified Long-term Emissions Goal',
                    value: values.lts_target
                  }}
                  theme={cardTheme}
                />
              )}

              {values?.lts_date && (
                <CardRow
                  rowData={{
                    title: 'Submission Date',
                    value: values.lts_date
                  }}
                  theme={cardTheme}
                />
              )}

              {values?.lts_document && (
                <CardRow
                  rowData={{
                    title: 'Long-term Strategy Document',
                    value: values.lts_document
                  }}
                  theme={cardTheme}
                />
              )}
            </React.Fragment>
          )}
          {process.env.FEATURE_COUNTRY_CHANGES !== 'true' && (
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
          )}
          {process.env.FEATURE_COUNTRY_CHANGES === 'true' &&
            !values?.lts_target && (
              <div className={styles.noContent}>Not included</div>
            )}
          {process.env.FEATURE_COUNTRY_CHANGES !== 'true' &&
            !values?.time_target_year && (
              <div className={styles.noContent}>Not included</div>
            )}
        </div>
      </Card>
      <Card
        title={
          process.env.FEATURE_COUNTRY_CHANGES === 'true'
            ? 'Net-Zero Target'
            : 'Non-GHG Target'
        }
        theme={cardTheme}
        contentFirst
      >
        <div className={styles.cardContent}>
          {process.env.FEATURE_COUNTRY_CHANGES === 'true' && (
            <React.Fragment>
              {values?.nz_status && (
                <CardRow
                  rowData={{
                    title: 'Net-zero Target Status',
                    value: values.nz_status
                  }}
                  theme={cardTheme}
                />
              )}

              {values?.nz_year && (
                <CardRow
                  rowData={{
                    title: 'Net-zero Target Year',
                    value: values.nz_year
                  }}
                  theme={cardTheme}
                />
              )}

              {values?.nz_source && (
                <CardRow
                  rowData={{
                    title: 'Net-zero Target Source',
                    value: values.nz_source
                  }}
                  theme={cardTheme}
                />
              )}
            </React.Fragment>
          )}

          {process.env.FEATURE_COUNTRY_CHANGES !== 'true' && (
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
          )}
          {process.env.FEATURE_COUNTRY_CHANGES === 'true' &&
            !values?.nz_status && (
              <div className={styles.noContent}>Not included</div>
            )}
          {process.env.FEATURE_COUNTRY_CHANGES !== 'true' &&
            !values?.non_ghg_target_year && (
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

    if (process.env.FEATURE_COUNTRY_CHANGES !== 'true') {
      return 'Nationally Determined Contribution (NDC) Overview';
    }

    return `What is the content of ${
      countryName?.endsWith('s') ? `${countryName}'` : `${countryName}'s`
    } Climate Commitments?`;
  }, [isCountryPage, countryName]);

  const renderIntro = () => (
    <Intro
      theme={isCountryPage ? introSmallTheme : introTheme}
      title={introTitle}
      {...(process.env.FEATURE_COUNTRY_CHANGES !== 'true' && {
        subtitle:
          documentDate &&
          `(submitted ${moment(documentDate).format('MM/DD/YYYY')})`,
        tag: 'h3'
      })}
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
                {process.env.FEATURE_COUNTRY_CHANGES !== 'true' && (
                  <TabletPortraitOnly>{description}</TabletPortraitOnly>
                )}
                {isCountryPage &&
                  process.env.FEATURE_COUNTRY_CHANGES !== 'true' && (
                    <div className="grid-column-item">
                      <div className={styles.actions}>
                        {renderInfoButton()}
                        {renderCompareButton()}
                        <TabletLandscape>
                          {renderExploreButton()}
                        </TabletLandscape>
                      </div>
                    </div>
                  )}
                {isCountryPage &&
                  process.env.FEATURE_COUNTRY_CHANGES === 'true' && (
                    <div className="grid-column-item">
                      {renderCompareButton()}
                    </div>
                  )}
              </div>
              {process.env.FEATURE_COUNTRY_CHANGES !== 'true' && (
                <TabletLandscape>{description}</TabletLandscape>
              )}
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
      {hasSectors &&
        !loading &&
        process.env.FEATURE_COUNTRY_CHANGES !== 'true' &&
        renderAlertText()}
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
  isCountryPage: PropTypes.bool,
  isNdcp: PropTypes.bool,
  isEmbed: PropTypes.bool,
  handleInfoClick: PropTypes.func.isRequired,
  ndcsDocument: PropTypes.object,
  ltsDocument: PropTypes.object,
  handleAnalyticsClick: PropTypes.func.isRequired
};

export default CountryNdcOverview;
