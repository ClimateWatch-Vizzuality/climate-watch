import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Dotdotdot from 'react-dotdotdot';
import ButtonGroup from 'components/button-group';
import RenderChart from 'components/my-climate-watch/viz-creator/components/render-chart';
import {
  chartDataSelector,
  getVisualisationType
} from 'components/my-climate-watch/viz-creator/viz-creator-selectors';

import styles from './my-cw-vis-card-styles.scss';

class MyVisCard extends PureComponent {
  handleOnClick = () => {
    this.props.onClick();
  };
  render() {
    const { data, className, deleteVisualisation } = this.props;
    const datasets = data.json_body;
    // Object with datasets key to reuse the selector keeping the same format that the reducer
    const chart = datasets ? getVisualisationType({ datasets }) : null;
    const chartData = datasets
      ? chartDataSelector({ datasets, small: false })
      : null;
    const id = data.id;

    return (
      <div className={styles.cardContainer}>
        <div className={cx(styles.card, className)}>
          <div className={styles.chart}>
            {datasets && (
              <RenderChart chart={chart} config={chartData} height={200} />
            )}
          </div>
          <div className={styles.cardTexts}>
            <h2 className={styles.cardTitle}>{data.title}</h2>
            <Dotdotdot className={styles.cardDescription} clamp={2}>
              {data.description}
            </Dotdotdot>
          </div>
        </div>
        <ButtonGroup
          key={`action${id}`}
          className={styles.cardActions}
          buttonsConfig={[
            {
              type: 'edit',
              onClick: this.handleOnClick
            },
            {
              type: 'delete',
              onClick: () => deleteVisualisation({ id })
            },
            {
              type: 'share',
              shareUrl: `/embed/my-visualizations/${id}`,
              analyticsGraphName: 'MyCW-visualizations'
            }
          ]}
        />
      </div>
    );
  }
}

MyVisCard.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  deleteVisualisation: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    json_body: PropTypes.object.isRequired
  }).isRequired
};

export default MyVisCard;
