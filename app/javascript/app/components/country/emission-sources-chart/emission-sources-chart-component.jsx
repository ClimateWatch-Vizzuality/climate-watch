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
import ReactDOMServer from 'react-dom/server';
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
  const currentCountryEmissionsRef = useRef();
  const chartRef = useRef();
  const height = 30;

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
          {`${Math.round(emission.emission * 100) / 100} MtCO2e - ${Math.round(
            emission.percentage * 100
          ) / 100}%`}
        </div>
      </div>
    );
  };

  const getTotalWidth = useCallback(() => {
    if (chartRef?.current) {
      setTotalWidth(chartRef.current.getBoundingClientRect().width);
    }
  }, [chartRef && chartRef.current]);

  const getStartPoint = useCallback(() => {
    if (currentCountryEmissionsRef && currentCountryEmissionsRef.current) {
      const offset = currentCountryEmissionsRef.current.parentElement.getBoundingClientRect()
        .left;
      setStartPoint(
        currentCountryEmissionsRef.current.getBoundingClientRect().left - offset
      );
    }
  }, [currentCountryEmissionsRef && currentCountryEmissionsRef.current]);

  const recalculateChart = useCallback(() => {
    getStartPoint();
    getTotalWidth();
  }, []);

  const initialStartPoint = useMemo(() => {
    if (currentCountryEmissionsRef && currentCountryEmissionsRef.current) {
      const offset = currentCountryEmissionsRef.current.parentElement.getBoundingClientRect()
        .left;
      return (
        currentCountryEmissionsRef.current.getBoundingClientRect().left - offset
      );
    }

    return null;
  }, [currentCountryEmissionsRef && currentCountryEmissionsRef.current]);

  const initialTotalWidth = useMemo(() => {
    if (chartRef?.current) {
      setTotalWidth(chartRef.current.getBoundingClientRect().width);
    }
  }, [chartRef && chartRef.current]);

  const width = useMemo(() => {
    if (totalWidth && emissions) {
      const isoEmissions = emissions.find(e => e.iso === iso);
      const isoPercentage = isoEmissions && isoEmissions.percentage;
      return isoPercentage && (totalWidth * isoPercentage) / 100;
    }
    return null;
  }, [totalWidth, emissions]);

  useEffect(() => {
    if (initialStartPoint) setStartPoint(initialStartPoint);
  }, [initialStartPoint]);

  useEffect(() => {
    if (initialTotalWidth) setTotalWidth(initialTotalWidth);
  }, [initialTotalWidth]);

  useEffect(() => {
    window.addEventListener('resize', recalculateChart);

    return () => {
      window.removeEventListener('resize', recalculateChart);
    };
  }, []);

  return (
    <div className={styles.emissionSources} ref={chartRef}>
      <div className={styles.worldSharePosition}>
        {emissions &&
          emissions.map((e, i) => (
            <span
              className={cx(styles.emissionCountry, {
                [styles.currentCountry]: iso === e.iso
              })}
              style={{ width: `${e.percentage}%`, backgroundColor: e.color }}
              data-tip={getTooltip('emissions', e, i)}
              data-for="emissions-chart-tooltip"
              {...(iso === e.iso && { ref: currentCountryEmissionsRef })}
            >
              {iso === e.iso && (
                <span className={styles.currentCountryText}>
                  {countryNames[iso]} is the World{"'"}s {getOrdinal(i + 1)}{' '}
                  largest emitter, with a total share of {e.percentage}%{' '}
                </span>
              )}
            </span>
          ))}
      </div>
      {totalWidth &&
        (startPoint || startPoint === 0) &&
        (width || width === 0) && (
          <svg
            className={styles.linkingSVG}
            height={height}
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points={`
                ${startPoint}, 0
                ${width + startPoint}, 0
                ${totalWidth}, ${height}
                0, ${height}
              `}
              fill="#e8ecf5"
            />
          </svg>
        )}
      <div className={styles.countrySectors}>
        {sectorData &&
          sectorData.map((e, i) => (
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
                  <div>{Math.round(e.emission * 100) / 100} MtCO2e</div>
                  <div>{Math.round(e.percentage * 100) / 100}%</div>
                </span>
              )}
            </span>
          ))}
      </div>
      <NDCSProvider
        overrideFilter
        additionalIndicatorSlugs={[INDICATOR_SLUGS.emissions]}
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
