import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import SDGCard from 'components/sdg-card';
import ReactTooltip from 'react-tooltip';
import NoContent from 'components/no-content';
import Dropdown from 'components/dropdown';

import styles from './country-ndc-sdg-linkages-styles.scss';

class CountrySDGLinkages extends PureComponent {
  getHtmlTooltip = content => ({ __html: content });

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
      <div>
        <h3 className={styles.title}>NDC-SDG Linkages</h3>
        {!isEmpty(sdgs) && (
          <div>
            <div className={styles.sdgs}>
              {sdgs.map(sdg => (
                <div key={sdg.title} className={styles.card}>
                  <SDGCard
                    sdgData={sdg}
                    tooltipId="sdg-linkages"
                    setTooltipData={setTooltipData}
                    indicators
                  />
                </div>
              ))}
            </div>
            <ReactTooltip id="sdg-linkages">
              {tooltipData && (
                <div className={styles.tooltip}>
                  <p className={styles.tooltipTitle}>
                    <b>{tooltipData.targetKey}: </b>
                    {tooltipData.title}
                  </p>
                  <p className={styles.sectors}>
                    <b>Sectors: </b>
                    {tooltipData.sectors &&
                      tooltipData.sectors.map((sector, index) => (
                        <span key={`${tooltipData.targetKey}-${sector}`}>
                          {sectors[sector].name}
                          {index === tooltipData.sectors.length - 1 ? '' : ', '}
                        </span>
                      ))}
                  </p>
                </div>
              )}
            </ReactTooltip>
            <div className={styles.sectorSelector}>
              <Dropdown
                label="Sector"
                placeholder="Choose a sector"
                options={sectorOptions}
                onChange={handleSectorChange}
                value={activeSector}
              />
            </div>
          </div>
        )}
        {isEmpty(sdgs) &&
        !loading && <NoContent message="No SDG data available" />}
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
