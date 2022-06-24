import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Dropdown from 'components/dropdown';
import ButtonGroup from 'components/button-group';
import CheckInput from 'components/check-input';
import Tag from 'components/tag';
import { CALCULATION_OPTIONS } from 'app/data/constants';
import Chart from 'components/charts/chart';
import ModalPngDownload from 'components/modal-png-download';
import EmissionsMetaProvider from 'providers/ghg-emissions-meta-provider';
import WbCountryDataProvider from 'providers/wb-country-data-provider';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import { isPageContained } from 'utils/navigation';
import DataZoom from 'components/data-zoom';
import quantificationTagTheme from 'styles/themes/tag/quantification-tag.scss';
import styles from './country-ghg-emissions-styles.scss';

const FEATURE_COUNTRY_CHANGES = process.env.FEATURE_COUNTRY_CHANGES === 'true';

const CountryGhgEmissions = props => {
  const {
    data,
    domain,
    quantifications,
    loading,
    config,
    handleYearHover,
    filtersOptions,
    filtersSelected,
    dataZoomData,
    dataZoomPosition,
    setDataZoomPosition,
    setYears,
    dataZoomYears,
    sources,
    calculations,
    handleSourceChange,
    handleCalculationChange,
    calculationSelected,
    sourceSelected,
    iso,
    handleInfoClick,
    handlePngDownloadModal,
    isEmbed,
    downloadLink,
    quantificationsTagsConfig,
    countryName,
    pngSelectionSubtitle,
    pngDownloadId
  } = props;

  const [previousTargetsChecked, setPreviousTargetsChecked] = useState(false);

  const renderFilterDropdowns = () => [
    <Dropdown
      key="filter1"
      label="Data Source"
      options={sources}
      onValueChange={handleSourceChange}
      value={sourceSelected}
      hideResetButton
    />,
    <Dropdown
      key="filter2"
      label="Metric"
      options={calculations}
      onValueChange={handleCalculationChange}
      value={calculationSelected}
      hideResetButton
    />
  ];

  const renderActionButtons = () => {
    const notEmbedButtonGroupConfig = [
      {
        type: 'info',
        onClick: handleInfoClick,
        dataTour: 'countries-06'
      },
      {
        type: 'share',
        shareUrl: `/embed/countries/${iso}/ghg-emissions`,
        analyticsGraphName: 'Country/Ghg-emissions',
        positionRight: true,
        dataTour: 'countries-05'
      },
      {
        type: 'downloadCombo',
        dataTour: 'countries-04',
        options: [
          {
            label: 'Save as image (PNG)',
            action: handlePngDownloadModal
          },
          {
            label: 'Go to data explorer',
            link: downloadLink,
            target: '_self'
          }
        ]
      },
      {
        type: 'addToUser'
      }
    ];
    const buttonGroupConfig = isEmbed
      ? [{ type: 'info', onClick: handleInfoClick }]
      : notEmbedButtonGroupConfig;

    const buttons = [
      <ButtonGroup
        key="action1"
        className={styles.btnGroup}
        buttonsConfig={buttonGroupConfig}
      />
    ];
    return buttons;
  };

  const renderChart = () => {
    const points = !isPageContained ? quantifications : [];
    const useLineChart =
      calculationSelected.value === CALCULATION_OPTIONS.PER_CAPITA.value ||
      calculationSelected.value === CALCULATION_OPTIONS.PER_GDP.value;
    const customD3Format =
      calculationSelected.value === CALCULATION_OPTIONS.PER_CAPITA.value
        ? '.2f'
        : '.0f';
    return (
      <Chart
        className={styles.graph}
        type={useLineChart ? 'line' : 'area'}
        config={config}
        data={data}
        domain={useLineChart && domain}
        onMouseMove={handleYearHover}
        points={points}
        dataOptions={filtersOptions}
        dataSelected={filtersSelected}
        loading={loading}
        height={360}
        customD3Format={customD3Format}
        stepped={sourceSelected.label === 'UNFCCC'}
        dataZoomComponent={
          !loading && (
            <span data-tour="ghg-03">
              <DataZoom
                data={dataZoomData}
                position={dataZoomPosition}
                years={dataZoomYears}
                setPosition={setDataZoomPosition}
                onYearChange={(min, max) => setYears({ min, max })}
              />
            </span>
          )
        }
      />
    );
  };

  const renderQuantificationsTags = () => (
    <ul>
      {!loading &&
        !isPageContained &&
        quantificationsTagsConfig.map(q => (
          <Tag
            theme={quantificationTagTheme}
            key={q.label}
            canRemove={false}
            label={q.label}
            color={q.color}
            data={q}
            className={styles.quantificationsTags}
          />
        ))}
    </ul>
  );

  const renderTargetsToggle = () => (
    <div className={styles.targetsToggle}>
      <CheckInput
        id="toggle-targets"
        className={styles.checkbox}
        checked={previousTargetsChecked}
        label="Show previous targets"
        onChange={() => setPreviousTargetsChecked(!previousTargetsChecked)}
        toggleFirst
      />
    </div>
  );

  return (
    <div className={styles.container}>
      <EmissionsMetaProvider />
      <WbCountryDataProvider />
      <TabletLandscape>
        <div
          className={cx(styles.graphControls, {
            [styles.graphControlsEmbed]: isEmbed
          })}
        >
          {renderFilterDropdowns()}
          {renderActionButtons()}
          {FEATURE_COUNTRY_CHANGES && renderTargetsToggle()}
        </div>
        {renderChart()}
        {renderQuantificationsTags()}
      </TabletLandscape>
      <TabletPortraitOnly>
        <div className={styles.graphControlsSection}>
          {renderFilterDropdowns()}
        </div>
        {renderChart()}
        {renderQuantificationsTags()}
        <div className={styles.graphControlsSection}>
          {renderActionButtons()}
          {FEATURE_COUNTRY_CHANGES && renderTargetsToggle()}
        </div>
      </TabletPortraitOnly>
      <ModalPngDownload
        id={pngDownloadId}
        title={`GHG Emissions and Emissions Targets in ${countryName}`}
        selectionSubtitle={pngSelectionSubtitle}
      >
        {renderChart()}
        {renderQuantificationsTags()}
        {FEATURE_COUNTRY_CHANGES && renderTargetsToggle()}
      </ModalPngDownload>
    </div>
  );
};

CountryGhgEmissions.propTypes = {
  isEmbed: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  domain: PropTypes.object,
  config: PropTypes.object.isRequired,
  iso: PropTypes.string.isRequired,
  countryName: PropTypes.string.isRequired,
  pngDownloadId: PropTypes.string.isRequired,
  quantifications: PropTypes.array.isRequired,
  quantificationsTagsConfig: PropTypes.array.isRequired,
  calculations: PropTypes.array.isRequired,
  calculationSelected: PropTypes.object.isRequired,
  sources: PropTypes.array.isRequired,
  sourceSelected: PropTypes.object.isRequired,
  filtersOptions: PropTypes.array,
  filtersSelected: PropTypes.array,
  handleInfoClick: PropTypes.func.isRequired,
  handleYearHover: PropTypes.func,
  handlePngDownloadModal: PropTypes.func,
  handleSourceChange: PropTypes.func.isRequired,
  handleCalculationChange: PropTypes.func.isRequired,
  pngSelectionSubtitle: PropTypes.string,
  downloadLink: PropTypes.string,
  dataZoomData: PropTypes.array,
  dataZoomPosition: PropTypes.object,
  setDataZoomPosition: PropTypes.func.isRequired,
  setYears: PropTypes.func.isRequired,
  dataZoomYears: PropTypes.object
};

CountryGhgEmissions.defaultProps = {
  iso: ''
};

export default CountryGhgEmissions;
