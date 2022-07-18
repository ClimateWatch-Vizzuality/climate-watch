import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
  Fragment
} from 'react';
import ReactDOMServer from 'react-dom/server';
import Proptypes from 'prop-types';
import { format } from 'd3-format';
import cx from 'classnames';
import { Switch, Chart } from 'cw-components';
import { scaleLinear } from 'd3-scale';
import { axisTop } from 'd3-axis';
import { select } from 'd3-selection';
import Icon from 'components/icon';
import Tag from 'components/tag';
import externalLink from 'assets/icons/external-link.svg';
import ReactTooltip from 'react-tooltip';

import ButtonGroup from 'components/button-group';
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

const PADDING_RIGHT = 30;
const PADDING_LEFT = 10;

function CountryEmploymentAndCosts(props) {
  const { sectionData, setModalMetadata } = props;
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const chartContainer = useRef();

  const currentConfig = sectionData?.[selectedTab.value];

  const handleInfoClick = useCallback(() => {
    props.setModalMetadata({
      category: 'Country',
      slugs: selectedTab.value === tabs[0].value ? 'irena_1' : 'irena_2',
      open: true
    });
  }, [setModalMetadata, selectedTab]);

  const width = useMemo(() => {
    const bounding =
      chartContainer.current && chartContainer.current.getBoundingClientRect();
    return bounding && bounding.width;
  }, [chartContainer.current]);

  useEffect(() => {
    if (currentConfig && width && selectedTab.value === tabs[0].value) {
      const CHART_HEIGHT = 40 * currentConfig.data.length;
      const scale = scaleLinear()
        .domain(currentConfig.domain)
        .range([0, width - 10]);

      const xAxisEmployment = axisTop()
        .tickSize(-CHART_HEIGHT)
        .scale(scale);

      // when the user changes to another country, we need to remove the current axis
      // and render the new one. Otherwise, the new axis will be rendered on top of the
      // old one.
      select('#employment-chart')
        .selectAll('*')
        .remove();

      select('#employment-chart')
        .attr('width', width + PADDING_RIGHT)
        .attr('height', CHART_HEIGHT)
        .append('g')
        .attr('transform', `translate(${PADDING_LEFT},${PADDING_RIGHT})`)
        .call(xAxisEmployment)
        .call(g => g.select('.domain').remove())
        .call(g => g.selectAll('.tick line').attr('stroke', '#ccc'));
    }
  }, [selectedTab, width, currentConfig]);

  const getTooltip = useCallback(
    (datum, _config) =>
      ReactDOMServer.renderToString(
        <ul>
          {_config.data.map(({ name, value }) => (
            <li className={styles.tooltipContainer}>
              <div
                className={styles.tooltipName}
                style={{
                  color: _config.config.theme[name].fill,
                  ...(datum.name === name && {
                    fontWeight: 600,
                    textDecoration: 'underline'
                  })
                }}
              >
                {name}
              </div>
              <div
                className={styles.tooltipValue}
                style={{ ...(datum.name === name && { fontWeight: 600 }) }}
              >
                {format('.4s')(value)}
              </div>
            </li>
          ))}
        </ul>
      ),
    []
  );

  const renderContent = () => {
    const hasData = currentConfig && currentConfig.data.length;

    return (
      <div>
        <div className={styles.header}>
          <div className={styles.titleContainer}>
            <h3 className={styles.title}>
              How do renewables generate jobs and reduce energy costs over time?
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
          <div className={styles.descriptionContainer}>
            <p>
              The increasing uptake of renewable sources of energy into
              countries' energy mix is generating green jobs and driving down
              the cost of electricity, making them competitive or even cheaper
              than non-renewable sources in certain geographies.
            </p>
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
        {!hasData && (
          <div className={styles.noDataContainer}>
            <span>No data available.</span>
          </div>
        )}
        {Boolean(hasData) && (
          <div className={styles.chartContainer}>
            <div className={styles.chartTitleContainer}>
              <div className={styles.chartTitle}>{currentConfig?.name}</div>
              <ButtonGroup
                key="employment-costs-btn-group"
                className={styles.buttonContainer}
                buttonsConfig={[{ type: 'info', onClick: handleInfoClick }]}
              />
            </div>
            <div className={styles.chartLegend}>
              <div className={styles.legend}>
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
                      canRemove={false}
                    />
                  ))}
                </ul>
              </div>
              <div>
                <div
                  ref={chartContainer}
                  className={cx(styles.employmentChartContainer, {
                    [styles.hidden]: selectedTab.value !== tabs[0].value
                  })}
                >
                  <svg id="employment-chart" width="100%" height="100%" />
                  {selectedTab.value === tabs[0].value && (
                    <Fragment>
                      <div className={styles.chart}>
                        {currentConfig?.data?.map(d => (
                          <div
                            className={styles.barContainer}
                            key={`value-${d.name}`}
                          >
                            <div
                              className={styles.bar}
                              style={{
                                minWidth: `${d.percentage}%`,
                                backgroundColor:
                                  currentConfig.config.theme[d.name].fill
                              }}
                              data-for="employment-chart-bar"
                              data-tip={getTooltip(d, currentConfig)}
                            />
                            <div>{format('.4s')(d.value)}</div>
                          </div>
                        ))}
                      </div>
                      <ReactTooltip
                        id="employment-chart-bar"
                        html
                        className={styles.tooltip}
                        backgroundColor="#fff"
                      />
                    </Fragment>
                  )}
                </div>
                {selectedTab.value === tabs[1].value && (
                  <Chart
                    type="line"
                    config={currentConfig?.config}
                    data={currentConfig?.data}
                    dots={false}
                    height={450}
                    domain={currentConfig?.domain}
                    showUnit
                    getCustomYLabelFormat={d => format('.4s')(d)}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

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
