import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MyVis from 'components/my-climate-watch/my-visualisations/my-cw-vis';

import layout from 'styles/layout.scss';
import styles from './my-cw-vis-graph-styles.scss';

class MyVisGraph extends PureComponent {
  render() {
    const { data, isEmbed } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={layout.content}>
          <MyVis data={data} isEmbed={isEmbed} />
        </div>
      </div>
    );
  }
}

MyVisGraph.propTypes = {
  data: PropTypes.object,
  isEmbed: PropTypes.bool
};

export default MyVisGraph;
