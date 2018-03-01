import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import RenderChart from 'components/my-climate-watch/viz-creator/components/render-chart';
import { convertFromRaw } from 'draft-js';
import styles from './my-cw-insight-card-styles.scss';

class MyInsightCard extends PureComponent {
  render() {
    const { data, className, link, deleteInsight } = this.props;
    const { chart: { data: chartData } } = data;
    return [
      <Link to={link} className={cx(styles.card, className)} key="card-content">
        <RenderChart chart={chartData.chart} {...chartData} />
        <h2 className={styles.cardTitle}>{data.title}</h2>
        <p
          className={styles.cardContent}
          dangerouslySetInnerHTML={{
            // eslint-disable-line
            __html: convertFromRaw(data.body).getPlainText()
          }}
        />
      </Link>,
      <button onClick={() => deleteInsight(data.id)} key="delete-btn">
        delete
      </button>
    ];
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
