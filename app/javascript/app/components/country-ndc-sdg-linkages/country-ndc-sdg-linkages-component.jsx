import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

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
import styles from './country-ndc-sdg-linkages-styles.scss';

class CountrySDGLinkages extends PureComponent {
  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.sdgs, this.props.sdgs)) {
      ReactTooltip.rebuild();
    }
  }

  render() {
    const {
      sdgs,
      activeSector,
      sectorOptions,
      sectors,
      handleSectorChange,
      loading,
      setTooltipData,
      tooltipData
    } = this.props;
    return (
      <div className={styles.wrapper}>
        <div className={layout.content}>
          <div className={styles.header}>
            <div className={styles.titleContainer}>
              <h3 className={styles.title}>NDC-SDG Linkages</h3>
              <Button className={btnInfoTheme.btnInfo}>
                <Icon icon={infoIcon} />
              </Button>
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
          {!isEmpty(sdgs) && (
            <div>
              <div className={styles.sdgs}>
                {sdgs.map(sdg => (
                  <SDGCard
                    activeSector={activeSector}
                    key={sdg.title}
                    sdgData={sdg}
                    tooltipId="sdg-linkages"
                    setTooltipData={setTooltipData}
                    indicators
                    className={styles.card}
                  />
                ))}
              </div>
              <ReactTooltip id="sdg-linkages">
                {tooltipData && (
                  <div className={styles.tooltip}>
                    <p className={styles.tooltipTitle}>
                      <b>{tooltipData.targetKey}: </b>
                      {tooltipData.title}
                    </p>
                    {tooltipData.sectors && (
                      <p className={styles.sectors}>
                        <b>Sectors: </b>
                        {tooltipData.sectors.map((sector, index) => (
                          <span key={`${tooltipData.targetKey}-${sector}`}>
                            {sectors[sector].name}
                            {index === tooltipData.sectors.length - 1 ? (
                              ''
                            ) : (
                              ', '
                            )}
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                )}
              </ReactTooltip>
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
  setTooltipData: Proptypes.func,
  tooltipData: Proptypes.object
};

export default CountrySDGLinkages;
