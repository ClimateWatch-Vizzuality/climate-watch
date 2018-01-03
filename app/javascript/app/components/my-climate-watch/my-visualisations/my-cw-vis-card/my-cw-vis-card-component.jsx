import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from 'components/button';

import LineChart from 'components/my-climate-watch/viz-creator/components/charts/line/line';
import { chartDataSelector } from 'components/my-climate-watch/viz-creator/viz-creator-selectors';

import styles from './my-cw-vis-card-styles.scss';

class MyVisCard extends PureComponent {
  handleOnClick = () => {
    this.props.onClick({
      id: this.props.data.id,
      title: this.props.data.title,
      datasets: this.props.data.json_body
    });
  };
  render() {
    const { data, className } = this.props;

    // Object with datasets key to reuse the selector keeping the same format that the reducer
    const chartData = data.json_body
      ? chartDataSelector({ datasets: data.json_body })
      : null;
    return (
      <Button
        onClick={this.handleOnClick}
        className={cx(styles.card, className)}
      >
        {chartData && <LineChart {...chartData} height={200} />}
        <h2 className={styles.cardTitle}>{data.title}</h2>
      </Button>
    );
  }
}

MyVisCard.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    json_body: PropTypes.object.isRequired
  }).isRequired
};

export default MyVisCard;
