import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import cx from 'classnames';

import NdcsSdgsMetaProvider from 'providers/ndcs-sdgs-meta-provider';
import SDGCard from 'components/sdg-card';
import ReactTooltip from 'react-tooltip';
import NoContent from 'components/no-content';
import Dropdown from 'components/dropdown';
import isEqual from 'lodash/isEqual';
import InfoButton from 'components/button/info-button';
import Icon from 'components/icon';
import infoIcon from 'assets/icons/info.svg';

import layout from 'styles/layout.scss';
import btnInfoTheme from 'styles/themes/button/button-info.scss';
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
    const { sectors, tooltipData, targets } = this.props;
    const targetsContent = targets && targets[tooltipData.goal_number];
    return tooltipData && targetsContent ? (
      <div className={styles.tooltip}>
        <p className={styles.tooltipTitle}>
          <b>{tooltipData.number}: </b>
          {tooltipData.title}
        </p>
        {tooltipData.sectors &&
          tooltipData.sectors.length > 0 && (
            <p className={styles.sectors}>
              <b>Sectors: </b>
              {tooltipData.sectors.map((sector, index) => (
                <span key={`${tooltipData.targetKey}-${sector}`}>
                  {sectors[sector]}
                  {index === tooltipData.sectors.length - 1 ? '' : ', '}
                </span>
              ))}
            </p>
          )}
      </div>
    ) : null;
  }

  render() {
    const {
      goals,
      targets,
      targetsData,
      activeSector,
      sectorOptions,
      handleSectorChange,
      loading,
      setTooltipData,
      toogleNDCsSDGsInfo,
      infoOpen
    } = this.props;
    return (
      <div className={styles.wrapper}>
        <div className={layout.content}>
          <div className={styles.header}>
            <div className={styles.titleContainer}>
              <h3 className={styles.title}>NDC-SDG Linkages</h3>
              <InfoButton
                className={cx(btnInfoTheme.btnInfo, {
                  [btnInfoTheme.btnInfoActive]: infoOpen
                })}
                infoOpen={infoOpen}
                handleInfoClick={() => toogleNDCsSDGsInfo(i => !i)}
              >
                <Icon icon={infoIcon} />
              </InfoButton>
              <div className={styles.info}>
                <p
                  className={cx(styles.infoText, {
                    [styles.infoTextOpen]: infoOpen
                  })}
                >
                  Each box represents a Sustainable Development Goal (SDG) and
                  each dot is a more specific target within that goal. Alignment
                  with that country&apos;s NDC is represented by color added to
                  the dot.
                </p>
              </div>
            </div>
            <div className={styles.sectorSelector}>
              <Dropdown
                label="Sector"
                placeholder="Choose a sector"
                options={sectorOptions}
                onValueChange={handleSectorChange}
                value={activeSector}
              />
            </div>
          </div>
          <NdcsSdgsMetaProvider />
          {goals &&
          goals.length > 0 && (
          <div>
                <div className={styles.sdgs}>
              {goals.map(goal => (
                    <SDGCard
                  activeSector={activeSector}
                  key={goal.title}
                  goal={goal}
                  targets={targets[goal.number]}
                  targetData={targetsData[goal.number]}
                  tooltipId="sdg-linkages"
                  setTooltipData={setTooltipData}
                  indicators
                  className={cardTheme.card}
                />
                  ))}
            </div>
                <ReactTooltip id="sdg-linkages">{this.getTooltip()}</ReactTooltip>
              </div>
            )}
          {isEmpty(goals) &&
          !loading && <NoContent message="No SDG data available" />}
        </div>
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
  loading: Proptypes.bool,
  infoOpen: Proptypes.bool,
  setTooltipData: Proptypes.func,
  toogleNDCsSDGsInfo: Proptypes.func,
  tooltipData: Proptypes.object,
  targetsMeta: Proptypes.object
};

export default CountrySDGLinkages;
