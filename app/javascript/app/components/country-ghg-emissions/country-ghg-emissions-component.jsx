import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'components/dropdown';
import ButtonGroup from 'components/button-group';
import Button from 'components/button';
import ChartStackedArea from 'components/charts/stacked-area';
import Tag from 'components/tag';
import cx from 'classnames';

import layout from 'styles/layout.scss';
import styles from './country-ghg-emissions-styles.scss';

class CountryGhgEmissions extends PureComponent {
  render() {
    const {
      data,
      config,
      iso,
      sources,
      handleSourceChange,
      sourceSelected,
      handleRemoveTag
    } = this.props;
    return (
      <div className={styles.wrapper}>
        <div className={cx(layout.content, styles.col2)}>
          <div className={styles.graph}>
            <h3 className={styles.title}>
              Greenhouse Gas Emissions and Emissions Targets
            </h3>
            <div className={styles.graphControls}>
              <Dropdown
                label="GHG emissions source"
                options={sources}
                onValueChange={handleSourceChange}
                value={sourceSelected}
                hideResetButton
              />
              <ButtonGroup className={styles.btnGroup} />
              <Button
                className={styles.exploreBtn}
                color="yellow"
                link={`/ghg-emissions?breakBy=location&filter=${iso}`}
              >
                Explore emissions
              </Button>
            </div>
            <ChartStackedArea config={config} data={data} />
            <div className={styles.tags}>
              {config.columns &&
                config.columns.y.map(column => (
                  <Tag
                    className={styles.tag}
                    key={`${column.value}`}
                    data={{
                      color: config.theme[column.value].stroke,
                      label: column.label,
                      id: column.value
                    }}
                    onRemove={handleRemoveTag}
                  />
                ))}
            </div>
          </div>
          <div className={styles.map}>I am a cool map</div>
        </div>
      </div>
    );
  }
}

CountryGhgEmissions.propTypes = {
  data: PropTypes.array.isRequired,
  config: PropTypes.object.isRequired,
  iso: PropTypes.string.isRequired,
  sources: PropTypes.array.isRequired,
  sourceSelected: PropTypes.object.isRequired,
  handleSourceChange: PropTypes.func.isRequired,
  handleRemoveTag: PropTypes.func.isRequired
};

CountryGhgEmissions.defaultProps = {
  iso: ''
};

export default CountryGhgEmissions;
