/* eslint-disable no-confusing-arrow */
import React, { useState, useRef } from 'react';
import Proptypes from 'prop-types';
import { format } from 'd3-format';
import { Switch, Chart } from 'cw-components';
import Icon from 'components/icon';
import Tag from 'components/tag';
import externalLink from 'assets/icons/external-link.svg';
import ReactTooltip from 'react-tooltip';

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
    legend: 'Levelised Cost of Electricity (2020 USD/kWh)'
  }
];

const CHART_HEIGHT = 450;

function CountryEmploymentAndCosts(props) {
  const { sectionData } = props;
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const legendRef = useRef();

  const currentConfig = sectionData?.[selectedTab.value];

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
      <div className={styles.chartContainer}>
        <div className={styles.chartTitle}>{currentConfig?.name}</div>
        <div className={styles.chartLegend}>
          <div className={styles.legend} ref={legendRef}>
            <ul>
              {(currentConfig?.config?.columns?.y || []).map(column => (
                <Tag
                  className={styles.legendItem}
                  key={`${column.value}`}
                  data={{
                    id: column.value,
                    url: column.url || null,
                    title: column.label || null
                  }}
                  label={column.label}
                  color={currentConfig?.config?.theme[column.value].stroke}
                  // tooltipId="legend-tooltip"
                  // onRemove={handleRemove}
                  canRemove={false}
                />
              ))}
            </ul>
          </div>
          {selectedTab.value === 'costs' && (
            <Chart
              type="line"
              config={currentConfig?.config}
              data={currentConfig?.data}
              dots={false}
              height={CHART_HEIGHT}
              domain={currentConfig?.domain}
              showUnit
              getCustomYLabelFormat={d => format('.2f')(d)}
            />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <div className={layout.content}>{renderContent()}</div>
    </div>
  );
}

CountryEmploymentAndCosts.propTypes = {
  sectionData: Proptypes.array
};

export default CountryEmploymentAndCosts;
