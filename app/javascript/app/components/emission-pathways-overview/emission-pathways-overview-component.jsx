import React, { PureComponent } from 'react';
import Button from 'components/button';
import PropTypes from 'prop-types';
import startCase from 'lodash/startCase';
import layout from 'styles/layout.scss';
import cx from 'classnames';
import styles from './emission-pathways-overview-styles.scss';

class EmissionPathwaysOverview extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { data } = this.props;
    return (
      <div className={layout.content}>
        <div className={cx(styles.col5, styles.overview)}>
          {data &&
            Object.keys(data).map(key => (
              <div key={key} className={styles.item}>
                <div className={styles.title}>{startCase(key)}</div>
                <div className={styles.itemData}>{data[key]}</div>
              </div>
            ))}
        </div>
        <div className={styles.col5}>
          <Button className={(styles.col5, styles.seeAllButton)}>
            See all
          </Button>
        </div>
      </div>
    );
  }
}

EmissionPathwaysOverview.propTypes = {
  data: PropTypes.object
};

export default EmissionPathwaysOverview;
