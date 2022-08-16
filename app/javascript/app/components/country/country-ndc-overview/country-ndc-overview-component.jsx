import React from 'react';
import PropTypes from 'prop-types';
import Card from 'components/card';
import CardRow from 'components/card/card-row';
import Intro from 'components/intro';
import Icon from 'components/icon';
import cx from 'classnames';
import moment from 'moment-timezone';
import ModalMetadata from 'components/modal-metadata';
import Loading from 'components/loading';
import NoContent from 'components/no-content';
import AbbrReplace, { replaceStringAbbr } from 'components/abbr-replace';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import introTheme from 'styles/themes/intro/intro-simple.scss';
import layout from 'styles/layout.scss';
import cardTheme from 'styles/themes/card/card-overflow-content.scss';
import alertIcon from 'assets/icons/alert.svg';
import NdcContentOverviewProvider from 'providers/ndc-content-overview-provider';
import CountriesDocumentsProvider from 'providers/countries-documents-provider';

import styles from './country-ndc-overview-styles.scss';

function CountryNdcOverview(props) {
  const { sectors, values, loading, iso, isEmbed, ndcsDocument } = props;

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
            The information shown below only reflects the selected NDC
            submission.
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
  const introTitle = !ndcsDocument
    ? 'Summary'
    : `Summary of ${ndcsDocument.long_name}`;

  const renderIntro = () => (
    <Intro
      theme={introTheme}
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
      return (
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
              <div className={styles.header}>
                {renderIntro()}
                <TabletPortraitOnly>{description}</TabletPortraitOnly>
              </div>
              <TabletLandscape>{description}</TabletLandscape>
              {renderCards()}
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
  sectors: PropTypes.array,
  values: PropTypes.object,
  loading: PropTypes.bool,
  ndcsDocument: PropTypes.object,
  isEmbed: PropTypes.bool
};

export default CountryNdcOverview;
