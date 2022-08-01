import React, {
  useRef,
  useState,
  useMemo,
  useEffect,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import NDCSProvider from 'providers/ndcs-provider';
import EmissionsProvider from 'providers/emissions-provider';
import ReactTooltip from 'react-tooltip';
import { INDICATOR_SLUGS } from 'data/constants';
import infoIcon from 'assets/icons/info.svg';
import ReactDOMServer from 'react-dom/server';
import Icon from 'components/icon';
import styles from './emission-sources-chart-styles.scss';

const getOrdinal = i => {
  if (i === 1) return '1st';
  if (i === 2) return '2nd';
  if (i === 3) return '3rd';
  return `${i}th`;
};

function EmissionSourcesChart({
  emissions,
  iso,
  sectorData,
  emissionProviderFilters,
  otherParties,
  countryNames
}) {
  const [startPoint, setStartPoint] = useState(0);
  const [totalWidth, setTotalWidth] = useState(0);
  const [positiveWidth, setPositiveWidth] = useState(null);
  const currentCountryEmissionsRef = useRef();
  const chartRef = useRef();
  const separatorRef = useRef();
  const height = 30;

  const negativeEmissions = useMemo(
    () =>
      sectorData &&
      sectorData.length > 0 &&
      sectorData.filter(s => s.emission < 0),
    [sectorData]
  );
  const hasNegativeEmissions =
    negativeEmissions && negativeEmissions.length > 0;

  const getTooltip = (chart, emission, i) => {
    const renderTooltip = content =>
      ReactDOMServer.renderToString(
        <div className={styles.tooltip}>
          <div className={styles.tooltipTitle}>World{"'"}s Emissions</div>
          {content}
        </div>
      );

    if (chart === 'emissions') {
      return renderTooltip(
        i > 5 ? (
          <div>
            Rest of the world representing a share of {otherParties.percentage}%
          </div>
        ) : (
          <div>
            #{i + 1} {countryNames[emission.iso]}, with a share of{' '}
            {emission.percentage}%
          </div>
        )
      );
    }

    return ReactDOMServer.renderToString(
      <div className={styles.tooltip}>
        <div className={styles.tooltipTitle}>
          {countryNames[iso]}
          {"'"}s {emission.sector}
        </div>
        <div>
          {`${Math.round(emission.emission * 100) / 100} MtCO`}
          <sub>2</sub>e
          <br />{' '}
          {`${Math.round(emission.percentage * 100) / 100}%
            `}
        </div>
      </div>
    );
  };

  const getTotalWidth = useCallback(() => {
    if (chartRef?.current) {
      setTotalWidth(chartRef.current.getBoundingClientRect().width);
    }
  }, [chartRef && chartRef.current, iso]);

  const calculateLeftPoint = reference => {
    const offset = reference.current.parentElement.getBoundingClientRect().left;
    return reference.current.getBoundingClientRect().left - offset;
  };

  useEffect(() => {
    if (negativeEmissions && separatorRef?.current) {
      setPositiveWidth(calculateLeftPoint(separatorRef));
    }
  }, [negativeEmissions, separatorRef && separatorRef.current, iso]);

  const getStartPoint = useCallback(() => {
    if (currentCountryEmissionsRef && currentCountryEmissionsRef.current) {
      setStartPoint(calculateLeftPoint(currentCountryEmissionsRef));
    }
  }, [currentCountryEmissionsRef && currentCountryEmissionsRef.current, iso]);

  const recalculateChart = useCallback(() => {
    getStartPoint();
    getTotalWidth();
  }, []);

  useEffect(() => {
    if (currentCountryEmissionsRef && currentCountryEmissionsRef.current) {
      setStartPoint(calculateLeftPoint(currentCountryEmissionsRef));
    }
  }, [currentCountryEmissionsRef && currentCountryEmissionsRef.current, iso]);

  useEffect(() => {
    getTotalWidth();
  }, [chartRef && chartRef.current, iso]);

  const width = useMemo(() => {
    if (totalWidth && emissions) {
      const isoEmissions = emissions.find(e => e.iso === iso);
      const isoPercentage = isoEmissions && isoEmissions.percentage;
      return isoPercentage && (totalWidth * isoPercentage) / 100;
    }
    return null;
  }, [totalWidth, emissions, iso]);

  useEffect(() => {
    window.addEventListener('resize', recalculateChart);

    return () => {
      window.removeEventListener('resize', recalculateChart);
    };
  }, []);

  const renderCountrySectors = () => {
    if (!sectorData) return null;

    return (
      <div className={styles.countrySectors}>
        {sectorData
          .filter(s => s.emission > 0)
          .map((e, i) => (
            <span
              className={styles.countrySector}
              style={{ width: `${e.percentage}%`, backgroundColor: e.color }}
              data-tip={getTooltip('sectors', e, i)}
              data-for="emissions-chart-tooltip"
            >
              {(e.percentage > 10 || i < 2) && (
                <span className={styles.countrySectorText}>
                  <div
                    className={styles.sectorTitle}
                    style={{ color: e.color }}
                  >
                    {e.sector}
                  </div>
                  <div>
                    {Math.round(e.emission * 100) / 100} MtCO<sub>2</sub>e
                  </div>
                  <div>{Math.round(e.percentage * 100) / 100}%</div>
                </span>
              )}
            </span>
          ))}
        {hasNegativeEmissions && (
          <span
            className={styles.negativeEmissionsSeparator}
            ref={separatorRef}
          />
        )}
        {hasNegativeEmissions &&
          negativeEmissions.map((e, i) => (
            <span
              className={cx(styles.countrySector, styles.negativeSector)}
              style={{
                background: `repeating-linear-gradient(45deg, ${e.color}, white 2px, white 12px)`,
                width: `${Math.abs(e.percentage)}%`
              }}
            >
              {Math.abs(e.percentage) > 10 && (
                <span
                  className={cx(
                    styles.countrySectorText,
                    styles.negativeEmissionsSectorText
                  )}
                >
                  <div className={styles.sectorContent}>
                    <div
                      data-tip="This sector captures more carbon than it produces and is therefore a carbon sink with negative emissions"
                      data-for="negative-emissions-tooltip"
                      className={styles.infoContainer}
                    >
                      <Icon
                        icon={infoIcon}
                        className={styles.infoIcon}
                        tooltipId="negative-emissions-tooltip"
                      />
                    </div>
                    <ReactTooltip id="negative-emissions-tooltip" />
                    <div
                      className={styles.sectorTitleContainer}
                      data-tip={getTooltip('sectors', e, i)}
                      data-for="emissions-chart-tooltip"
                    >
                      <div
                        className={styles.sectorTitle}
                        style={{ color: e.color }}
                      >
                        {e.sector}
                      </div>
                      <div>
                        {Math.round(e.emission * 100) / 100} MtCO<sub>2</sub>e
                      </div>
                    </div>
                  </div>
                </span>
              )}
            </span>
          ))}
      </div>
    );
  };

  return (
    <div className={styles.emissionSources} ref={chartRef}>
      <div className={styles.worldSharePosition}>
        {emissions &&
          emissions.map((e, i) => (
            <span
              key={`country-span-${e.iso}`}
              className={cx(styles.emissionCountry, {
                [styles.currentCountry]: iso === e.iso
              })}
              style={{
                width: `${e.percentage}%`,
                backgroundColor: e.color
              }}
              data-tip={getTooltip('emissions', e, i)}
              data-for="emissions-chart-tooltip"
              {...(iso === e.iso && {
                ref: currentCountryEmissionsRef
              })}
            >
              {iso === e.iso && (
                <span
                  className={cx(styles.currentCountryText, {
                    [styles.fitRight]: i > 120
                  })}
                >
                  {countryNames[iso]} is the World{"'"}s {getOrdinal(i + 1)}{' '}
                  largest emitter, with a total share of {e.percentage}%{' '}
                </span>
              )}
            </span>
          ))}
      </div>
      {totalWidth &&
        height &&
        (startPoint || startPoint === 0) &&
        (width || width === 0) && (
          <svg
            className={styles.linkingSVG}
            height={height}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={`M${startPoint} 0 Q ${startPoint} ${height} 0 ${height} L 0 ${height} ${
                hasNegativeEmissions ? positiveWidth : totalWidth
              } ${height} M${
                hasNegativeEmissions ? positiveWidth : totalWidth
              } ${height} Q ${startPoint + width} ${height} ${startPoint +
                width} 0 L ${startPoint + width} 0 ${startPoint} 0 Z`}
            />
          </svg>
        )}
      {renderCountrySectors()}
      <NDCSProvider
        overrideFilter
        indicatorSlugs={[INDICATOR_SLUGS.emissions]}
      />
      <EmissionsProvider filters={emissionProviderFilters} />
      <ReactTooltip id="emissions-chart-tooltip" html />
    </div>
  );
}

EmissionSourcesChart.propTypes = {
  emissions: PropTypes.array,
  emissionProviderFilters: PropTypes.object,
  otherParties: PropTypes.object,
  countryNames: PropTypes.object,
  sectorData: PropTypes.array,
  iso: PropTypes.string
};

export default EmissionSourcesChart;
