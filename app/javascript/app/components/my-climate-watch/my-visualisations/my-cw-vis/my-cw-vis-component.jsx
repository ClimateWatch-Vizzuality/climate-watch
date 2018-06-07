import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from 'components/button-group';
import RenderChart from 'components/my-climate-watch/viz-creator/components/render-chart';
import {
  chartDataSelector,
  getVisualisationType
} from 'components/my-climate-watch/viz-creator/viz-creator-selectors';

import styles from './my-cw-vis-styles.scss';

class MyVis extends PureComponent {
  handleOnClick = () => {
    this.props.onClick();
  };
  render() {
    const { data, deleteVisualisation, isEmbed } = this.props;
    const datasets = data.json_body;
    const chart = datasets ? getVisualisationType({ datasets }) : null;
    const chartData = datasets ? chartDataSelector({ datasets }) : null;
    const id = data.id;
    return (
      <div className={styles.visContainer}>
        <h3 className={styles.visTitle}>{data.title}</h3>
        <ButtonGroup
          key={`action${id}`}
          className={styles.visActions}
          buttonsConfig={[
            {
              type: 'edit',
              onEditClick: this.handleOnClick,
              disabled: isEmbed
            },
            {
              type: 'delete',
              onDeleteClick: () => deleteVisualisation({ id }),
              disabled: isEmbed
            },
            {
              type: 'share',
              shareUrl: `/embed/my-visualizations/${id}`,
              analyticsGraphName: 'MyCW-visualizations',
              reverseDropdown: false
            }
          ]}
        />
        {datasets && (
          <RenderChart
            className={styles.vizChartContainer}
            chart={chart}
            config={chartData}
            height={360}
          />
        )}
        <div className={styles.visDescription}>{data.description}</div>
      </div>
    );
  }
}

MyVis.propTypes = {
  onClick: PropTypes.func,
  deleteVisualisation: PropTypes.func.isRequired,
  isEmbed: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    json_body: PropTypes.object
  }).isRequired
};

export default MyVis;
