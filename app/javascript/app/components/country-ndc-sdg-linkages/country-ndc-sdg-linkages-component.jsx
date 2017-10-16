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
import Button from 'components/button';
import Icon from 'components/icon';
import infoIcon from 'assets/icons/info.svg';

import layout from 'styles/layout.scss';
import btnInfoTheme from 'styles/themes/button/button-info.scss';
import cardTheme from 'styles/themes/sdg-card/sdg-card';
import styles from './country-ndc-sdg-linkages-styles.scss';

class CountrySDGLinkages extends PureComponent {
  componentDidUpdate(prevProps) {
    if (
      !isEqual(prevProps.sdgs, this.props.sdgs) ||
      !isEqual(prevProps.targetsMeta, this.props.targetsMeta)
    ) {
      ReactTooltip.rebuild();
    }
  }

  getTooltip() {
    const { sectors, tooltipData, targetsMeta } = this.props;
    const targetsContent = targetsMeta && targetsMeta[tooltipData.targetKey];
    const hasTargetSectors =
      targetsContent &&
      targetsContent.sectors &&
      !!targetsContent.sectors.length;
    return tooltipData && targetsContent ? (
      <div className={styles.tooltip}>
        <p className={styles.tooltipTitle}>
          <b>{tooltipData.targetKey}: </b>
          {tooltipData.title}
        </p>
        {hasTargetSectors && (
          <p className={styles.sectors}>
            <b>Sectors: </b>
            {targetsContent.sectors.map((sector, index) => (
              <span key={`${tooltipData.targetKey}-${sector}`}>
                {sectors[sector].name}
                {index === targetsContent.sectors.length - 1 ? '' : ', '}
              </span>
            ))}
          </p>
        )}
      </div>
    ) : null;
  }

  render() {
    const {
      sdgs,
      activeSector,
      sectorOptions,
      handleSectorChange,
      loading,
      setTooltipData,
      targetsMeta,
      toogleNDCsSDGsInfo,
      infoOpen
    } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={layout.content}>
          <div className={styles.header}>
            <div className={styles.titleContainer}>
              <h3 className={styles.title}>NDC-SDG Linkages</h3>
              <Button
                className={cx(btnInfoTheme.btnInfo, {
                  [btnInfoTheme.btnInfoActive]: infoOpen
                })}
                onClick={toogleNDCsSDGsInfo}
              >
                <Icon icon={infoIcon} />
              </Button>
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
          {!isEmpty(sdgs) && (
            <div>
              <div className={styles.sdgs}>
                {sdgs.map(sdg => (
                  <SDGCard
                    targetsMeta={targetsMeta}
                    activeSector={activeSector}
                    key={sdg.title}
                    sdgData={sdg}
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
          {isEmpty(sdgs) &&
          !loading && <NoContent message="No SDG data available" />}
        </div>
      </div>
    );
  }
}

CountrySDGLinkages.propTypes = {
  sdgs: Proptypes.array,
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
