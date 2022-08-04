import React, { PureComponent, Fragment } from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';

import Loading from 'components/loading';
import AbbrReplace from 'components/abbr-replace';
import NdcsAdaptationProvider from 'providers/ndcs-adaptation-provider';
import ReactTooltip from 'react-tooltip';
import NoContent from 'components/no-content';
import ButtonGroup from 'components/button-group';
import Dropdown from 'components/dropdown';
import ModalMetadata from 'components/modal-metadata';
import isEqual from 'lodash/isEqual';
import Button from 'components/button';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import layout from 'styles/layout.scss';
import cardTheme from 'styles/themes/sdg-card/sdg-card';
import AdaptationCard from './adaptation-card';
import styles from './country-ndc-adaptation-styles.scss';
import { DATABASES_OPTIONS } from './country-ndc-adaptation-constants';

class CountryNDCAdaptation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false
    };
  }

  componentDidUpdate(prevProps) {
    if (
      !isEqual(prevProps.sectors, this.props.sectors) ||
      !isEqual(prevProps.targetsMeta, this.props.targetsMeta)
    ) {
      ReactTooltip.rebuild();
    }

    if (
      !isEqual(prevProps.documentOptions, this.props.documentOptions) &&
      !this.props.activeDocument
    ) {
      this.props.setFilter({
        document: this.props.documentOptions?.[0]?.value || null
      });
    }
  }

  getTooltip() {
    const { tooltipData, targetsData } = this.props;
    const actions =
      targetsData[tooltipData?.sectorNumber]?.targets?.[tooltipData?.number]
        ?.actions;

    if (!tooltipData) {
      this.setState({ showTooltip: false });

      return null;
    }

    this.setState({ showTooltip: true });

    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipTitle}>
          <b>{tooltipData.number}: </b>
          {tooltipData.title}
        </p>

        {actions?.length > 0 && (
          <p className={styles.actionTitleContainer}>
            {actions.map(({ id, title }) => (
              <div key={id} className={styles.actionTitle}>
                {title}
              </div>
            ))}
          </p>
        )}
      </div>
    );
  }

  renderCards() {
    const {
      sectors,
      targets,
      targetsData,
      loading,
      setTooltipData,
      iso,
      isEmbed,
      activeDocument
    } = this.props;
    if (loading) return <Loading light className={styles.loader} />;
    if (isEmpty(sectors) || isEmpty(targetsData)) {
      return (
        <NoContent
          className={styles.noContent}
          message="No Adaptation data available"
        />
      );
    }

    const hasSectors = sectors && sectors.length > 0;
    if (!hasSectors) return null;

    return (
      <Fragment>
        <div className={cx(styles.sectors, { [styles.sectorsEmbed]: isEmbed })}>
          {sectors.map(sector => (
            <AdaptationCard
              key={sector.title}
              sector={sector}
              iso={iso}
              targets={targets[sector.number]}
              targetData={targetsData[sector.number]}
              tooltipId="ndc-adaptation"
              setTooltipData={setTooltipData}
              indicators
              className={cardTheme.card}
              activeCommitment={activeDocument}
            />
          ))}
        </div>
        <ReactTooltip
          className={styles.tooltipContainer}
          id="ndc-adaptation"
          scrollHide={false}
          disable={!this.state.showTooltip}
        >
          {this.getTooltip()}
        </ReactTooltip>
      </Fragment>
    );
  }

  render() {
    const {
      isEmbed,
      handleDocumentChange,
      handleDatabaseChange,
      handleInfoClick,
      handleAnalyticsClick,
      countryName,
      iso,
      activeDatabase,
      activeDocument,
      documentOptions
    } = this.props;

    const description = (
      <div className={styles.descriptionContainer}>
        <AbbrReplace>
          The colored symbols represent adaptation actions prioritized by this
          country in its NDCs; grey symbols represent areas where there are
          currently no adaptation actions. These dots are mapped against
          critical systems that need an acceleration of adaptation efforts to
          address the impacts of climate change. These critical systems were
          identified in the Global Commission on Adaptation&apos;s flagship
          report &quot;Adapt Now.&quot;
        </AbbrReplace>
      </div>
    );

    const exploreButton = (
      <Button
        className={styles.exploreBtn}
        variant="primary"
        href="/ndcs-explore"
        onClick={handleAnalyticsClick}
      >
        Explore NDC Content
      </Button>
    );

    const buttonGroup = (
      <ButtonGroup
        key="ndc-adaptation-btn-group"
        className={styles.buttonContainer}
        buttonsConfig={[{ type: 'info', onClick: handleInfoClick }]}
      />
    );

    const countryString = countryName?.endsWith('s')
      ? `${countryName}'`
      : `${countryName}'s`;

    return (
      <div className={styles.wrapper}>
        <div className={layout.content}>
          <div className={styles.header}>
            <h3 className={styles.title}>
              <AbbrReplace>
                {`What adaptation plans are covered in ${
                  countryName ? countryString : ''
                } NDCs?`}
              </AbbrReplace>
            </h3>
            <TabletLandscape>{exploreButton}</TabletLandscape>
          </div>
          {description}
          <div className={styles.sectorFilters}>
            <div className={styles.sectorFilter}>
              {buttonGroup}
              <Dropdown
                label="Filter by Climate Commitment"
                placeholder="Choose a commitment"
                options={documentOptions}
                onValueChange={handleDocumentChange}
                value={activeDocument}
                noAutoSort
              />
              <Dropdown
                label="Select database"
                placeholder="Choose a database"
                options={DATABASES_OPTIONS}
                onValueChange={handleDatabaseChange}
                value={activeDatabase}
                noAutoSort
              />
            </div>
          </div>
          {this.renderCards()}
          <TabletPortraitOnly>{exploreButton}</TabletPortraitOnly>
        </div>
        <ModalMetadata />
        {isEmbed && <ReactTooltip />}
        <NdcsAdaptationProvider
          params={{
            location: iso
          }}
        />
      </div>
    );
  }
}

CountryNDCAdaptation.propTypes = {
  sectors: Proptypes.array,
  targets: Proptypes.object,
  targetsData: Proptypes.object,
  documentOptions: Proptypes.array.isRequired,
  handleDocumentChange: Proptypes.func.isRequired,
  handleDatabaseChange: Proptypes.func.isRequired,
  isEmbed: Proptypes.bool,
  loading: Proptypes.bool,
  setTooltipData: Proptypes.func,
  tooltipData: Proptypes.object,
  targetsMeta: Proptypes.object,
  iso: Proptypes.string.isRequired,
  activeDatabase: Proptypes.object.isRequired,
  activeDocument: Proptypes.object.isRequired,
  countryName: Proptypes.string,
  handleInfoClick: Proptypes.func.isRequired,
  handleAnalyticsClick: Proptypes.func.isRequired,
  setFilter: Proptypes.func.isRequired
};

CountryNDCAdaptation.defaultProps = {
  targetsData: {}
};

export default CountryNDCAdaptation;
