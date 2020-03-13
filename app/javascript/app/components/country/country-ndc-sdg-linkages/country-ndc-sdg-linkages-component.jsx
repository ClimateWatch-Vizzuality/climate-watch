import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';

import Loading from 'components/loading';
import NdcsSdgsDataProvider from 'providers/ndcs-sdgs-data-provider';
import NdcsSdgsMetaProvider from 'providers/ndcs-sdgs-meta-provider';
import SDGCard from 'components/sdg-card';
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
import styles from './country-ndc-sdg-linkages-styles.scss';

class CountrySDGLinkages extends PureComponent {
  componentDidUpdate(prevProps) {
    if (
      !isEqual(prevProps.goals, this.props.goals) ||
      !isEqual(prevProps.targetsMeta, this.props.targetsMeta)
    ) {
      ReactTooltip.rebuild();
    }
  }

  getTooltip() {
    const { sectors, tooltipData, targets, tooltipSectorIds } = this.props;
    const targetsContent = targets && targets[tooltipData.goal_number];
    const hasTooltipData = sector => {
      if (tooltipSectorIds) {
        return !!tooltipSectorIds.find(id => sectors[id] === sector);
      }
      return false;
    };
    const sectorsLabels =
      !isEmpty(tooltipData.sectors) &&
      (tooltipData.sectors.map(sector => sectors[sector]) || []).sort();
    return tooltipData && targetsContent ? (
      <div className={styles.tooltip}>
        <p className={styles.tooltipTitle}>
          <b>{tooltipData.number}: </b>
          {tooltipData.title}
        </p>
        {!isEmpty(tooltipData.sectors) && (
          <p className={styles.sectors}>
            <b>Sectors: </b>
            {sectorsLabels.map((sector, index) => (
              <span key={`${tooltipData.targetKey}-${sector}`}>
                <span
                  className={cx({
                    [styles.sectorIncluded]: hasTooltipData(sector)
                  })}
                >
                  {sector}
                </span>
                <span>
                  {index === tooltipData.sectors.length - 1 ? '' : ', '}
                </span>
              </span>
            ))}
          </p>
        )}
      </div>
    ) : null;
  }

  renderCards() {
    const {
      goals,
      targets,
      targetsData,
      activeSector,
      loading,
      setTooltipData,
      handleOnDotClick,
      iso,
      isEmbed
    } = this.props;
    const hasGoals = goals && goals.length > 0;
    if (loading) return <Loading light className={styles.loader} />;
    if (isEmpty(goals) || isEmpty(targetsData)) {
      return (
        <NoContent
          className={styles.noContent}
          message="No SDG data available"
        />
      );
    }
    return (
      hasGoals && (
        <div>
          <div className={cx(styles.sdgs, { [styles.sdgsEmbed]: isEmbed })}>
            {goals.map(goal => (
              <SDGCard
                activeSector={activeSector}
                key={goal.title}
                goal={goal}
                iso={iso}
                targets={targets[goal.number]}
                targetData={targetsData[goal.number]}
                tooltipId="sdg-linkages"
                setTooltipData={setTooltipData}
                indicators
                className={cardTheme.card}
                handleOnDotClick={handleOnDotClick}
              />
            ))}
          </div>
          <ReactTooltip
            id="sdg-linkages"
            className={styles.tooltipContainer}
            scrollHide={false}
          >
            {this.getTooltip()}
          </ReactTooltip>
        </div>
      )
    );
  }

  render() {
    const {
      iso,
      activeSector,
      sectorOptions,
      isNdcp,
      isEmbed,
      handleSectorChange,
      handleInfoClick,
      handleAnalyticsClick
    } = this.props;
    const description = (
      <div className={styles.descriptionContainer}>
        The colored dots represent the Sustainable Development Goals (SDGs) for
        which there is an aligned climate target, action, policy measure or need
        in the NDC. This alignment was identified based only on the information
        communicated in the NDC, not the domestic policy context. It is
        therefore only an entry point for considering the degree of potential
        alignment between the country’s climate and sustainable development
        objectives.
      </div>
    );

    const href = '/contained/ndcs-sdg?isNdcp=true';
    const link = '/ndcs-sdg';

    const exploreButton = (
      <Button
        className={styles.exploreBtn}
        variant="primary"
        href={isNdcp ? href : null}
        link={isNdcp ? null : link}
        onClick={handleAnalyticsClick}
      >
        Explore Global Linkages
      </Button>
    );
    const buttonGroupConfig = isEmbed
      ? [{ type: 'info', onClick: handleInfoClick }]
      : [
        { type: 'info', onClick: handleInfoClick },
        {
          type: 'share',
          shareUrl: `/embed/countries/${iso}/ndc-sdg-linkages`,
          positionRight: true
        }
      ];

    const buttonGroup = (
      <ButtonGroup
        key="action1"
        className={styles.exploreBtn}
        buttonsConfig={buttonGroupConfig}
      />
    );

    const sectorFilterDescription =
      'Only linkages relevant to the selected sector are shown';

    return (
      <div className={styles.wrapper}>
        <NdcsSdgsDataProvider />
        <div className={layout.content}>
          <div className={styles.header}>
            <div className={styles.buttons}>
              <h3 className={styles.title}>NDC-SDG Linkages</h3>
              <TabletPortraitOnly>{description}</TabletPortraitOnly>
              {buttonGroup}
              <Dropdown
                label="Filter by sector"
                placeholder="Choose a sector"
                options={sectorOptions}
                onValueChange={handleSectorChange}
                value={activeSector}
                info
                infoText={sectorFilterDescription}
              />
              <TabletLandscape>{exploreButton}</TabletLandscape>
            </div>
            <TabletLandscape>{description}</TabletLandscape>
          </div>
          <NdcsSdgsMetaProvider />
          {this.renderCards()}
          <TabletPortraitOnly>{exploreButton}</TabletPortraitOnly>
        </div>
        <ModalMetadata />
        {isEmbed && <ReactTooltip />}
      </div>
    );
  }
}

CountrySDGLinkages.propTypes = {
  goals: Proptypes.array,
  targets: Proptypes.object,
  targetsData: Proptypes.object,
  sectorOptions: Proptypes.array,
  sectors: Proptypes.object,
  handleSectorChange: Proptypes.func,
  activeSector: Proptypes.object,
  isNdcp: Proptypes.bool,
  isEmbed: Proptypes.bool,
  loading: Proptypes.bool,
  setTooltipData: Proptypes.func,
  tooltipData: Proptypes.object,
  tooltipSectorIds: Proptypes.array,
  targetsMeta: Proptypes.object,
  iso: Proptypes.string,
  handleInfoClick: Proptypes.func.isRequired,
  handleOnDotClick: Proptypes.func.isRequired,
  handleAnalyticsClick: Proptypes.func.isRequired
};

CountrySDGLinkages.defaultProps = {
  targetsData: {}
};

export default CountrySDGLinkages;
