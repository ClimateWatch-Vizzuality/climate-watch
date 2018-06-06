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
    const { data, deleteVisualisation } = this.props;
    const datasets = data.json_body;
    // Object with datasets key to reuse the selector keeping the same format that the reducer
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
              onEditClick: this.handleOnClick
            },
            {
              type: 'delete',
              onDeleteClick: () => deleteVisualisation({ id })
            },
            {
              type: 'share',
              shareUrl: '',
              analyticsGraphName: '',
              reverseDropdown: true
            }
          ]}
        />
        {datasets && (
          <RenderChart chart={chart} config={chartData} height={360} />
        )}
        <div className={styles.visDescription}>{data.description}</div>
      </div>
    );
  }
}

MyVis.propTypes = {
  onClick: PropTypes.func.isRequired,
  deleteVisualisation: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    json_body: PropTypes.object.isRequired
  }).isRequired
};

export default MyVis;
