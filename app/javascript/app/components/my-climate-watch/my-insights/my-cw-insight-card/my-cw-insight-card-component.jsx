import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import RenderChart from 'components/my-climate-watch/viz-creator/components/render-chart';
import Icon from 'components/icon';
import deleteIcon from 'assets/icons/delete.svg';
import styles from './my-cw-insight-card-styles.scss';

class MyInsightCard extends PureComponent {
  render() {
    const { data, className, link, deleteInsight } = this.props;
    const chartData = data && data.chart && data.chart.data;
    return (
      <div className={cx(styles.card, className)}>
        <Link to={link}>
          {chartData && <RenderChart chart={chartData.chart} {...chartData} />}
          <h2 className={styles.cardTitle}>{data.title}</h2>
          <p className={styles.cardContent}>{data.body.blocks[0].text}</p>
        </Link>
        <button
          className={styles.cardDelete}
          onClick={() => deleteInsight(data.id)}
        >
          <Icon icon={deleteIcon} className={styles.icon} />
        </button>
      </div>
    );
  }
}

MyInsightCard.propTypes = {
  className: PropTypes.string,
  link: PropTypes.string.isRequired,
  deleteInsight: PropTypes.func.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.object.isRequired
  }).isRequired
};

export default MyInsightCard;
