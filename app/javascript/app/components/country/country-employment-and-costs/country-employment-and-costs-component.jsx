/* eslint-disable no-confusing-arrow */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Proptypes from 'prop-types';
import Icon from 'components/icon';
import cx from 'classnames';
import { Switch } from 'cw-components';
import externalLink from 'assets/icons/external-link.svg';
import ReactTooltip from 'react-tooltip';
import ModalMetadata from 'components/modal-metadata';
import { scaleLinear } from 'd3-scale';
import { axisTop } from 'd3-axis';
import { select } from 'd3-selection';

import layout from 'styles/layout.scss';

import styles from './country-employment-and-costs-styles.scss';

const tabs = [
  {
    name: 'Renewable Energy Employment by Technology',
    value: 'employment',
    legend: 'Number of jobs in thousands - Year 2020'
  },
  {
    name: 'Solar and Wind Costs',
    value: 'costs',
    legend: 'Costs - Year 2020'
  }
];

const getScale = (sectionData, width, section) => {
  if (!sectionData || !width) return null;
  return scaleLinear()
    .domain([0, Math.max(...sectionData[section].map(e => e.value))])
    .range([0, width - 10]);
};

const HEIGHT = 300;
const PADDING_RIGHT = 30;
const PADDING_LEFT = 10;

function CountryEmploymentAndCosts(props) {
  const { sectionData } = props;
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const data = sectionData && sectionData[selectedTab.value];
  const legendRef = useRef();

  const width = useMemo(() => {
    const bounding =
      legendRef.current && legendRef.current.getBoundingClientRect();
    return bounding && bounding.width;
  }, [legendRef.current]);

  useEffect(() => {
    if (sectionData && width) {
      const xAxisEmployment = axisTop()
        .tickSize(-HEIGHT)
        .scale(getScale(sectionData, width, 'employment'));
      const xAxisCosts = axisTop()
        .tickSize(-HEIGHT)
        .scale(getScale(sectionData, width, 'costs'));

      select('#employment-and-costs-legend-employment')
        .attr('width', width + PADDING_RIGHT)
        .attr('height', HEIGHT)
        .append('g')
        .attr('transform', `translate(${PADDING_LEFT},${PADDING_RIGHT})`)
        .call(xAxisEmployment);

      select('#employment-and-costs-legend-costs')
        .attr('width', width + PADDING_RIGHT)
        .attr('height', HEIGHT)
        .append('g')
        .attr('transform', `translate(${PADDING_LEFT},${PADDING_RIGHT})`)
        .call(xAxisCosts);
    }
  }, [sectionData, width]);

  const renderContent = () => (
    <div>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>
            How does climate action increase jobs and save money?
          </h3>
          <a
            title="Go to IRENA"
            href="https://www.irena.org/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Explore more on IRENA
            <Icon icon={externalLink} className={styles.icon} />
          </a>
        </div>
        <ReactTooltip className={styles.tooltip} />
      </div>
      <div className={styles.switchWrapper}>
        <Switch
          options={tabs}
          selectedOption={selectedTab.value}
          onClick={setSelectedTab}
          theme={{
            wrapper: styles.switchWrapper,
            checkedOption: styles.switchSelected
          }}
        />
      </div>
      {data && (
        <div className={styles.chartContainer}>
          <div className={styles.chartLegend}>
            <div className={styles.yLabels}>
              {data.map(d => (
                <div key={d.name}>{d.name}</div>
              ))}
            </div>
            <div className={styles.legend} ref={legendRef}>
              <div className={styles.legendUnit}>{selectedTab.legend}</div>
              <div className={styles.axis}>
                <svg
                  id="employment-and-costs-legend-employment"
                  width="100%"
                  height="100%"
                  className={cx(styles.axisLegend, {
                    [styles.hidden]: selectedTab.value !== 'employment'
                  })}
                />
                <svg
                  id="employment-and-costs-legend-costs"
                  width="100%"
                  height="100%"
                  className={cx(styles.axisLegend, {
                    [styles.hidden]: selectedTab.value !== 'costs'
                  })}
                />
                <div className={styles.chart}>
                  {data.map(d => (
                    <div
                      className={styles.barContainer}
                      key={`value-${d.name}`}
                    >
                      <div
                        className={styles.bar}
                        style={{
                          minWidth: `${d.percentage}%`,
                          backgroundColor: d.color
                        }}
                      />
                      <div>{d.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <ModalMetadata />
      <div className={layout.content}>{renderContent()}</div>
    </div>
  );
}

CountryEmploymentAndCosts.propTypes = {
  sectionData: Proptypes.array
};

export default CountryEmploymentAndCosts;
