import React, { PureComponent } from 'react';
import Button from 'components/button';
import ModalOverview from 'components/modal-overview';
import PropTypes from 'prop-types';
import startCase from 'lodash/startCase';
import Loading from 'components/loading';
import layout from 'styles/layout.scss';
import cx from 'classnames';
import styles from './emission-pathways-overview-styles.scss';

class EmissionPathwaysOverview extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { data, fullData, modalTitle, loading, handleInfoClick } = this.props;
    return (
      <div className={styles.wrapper}>
        <div className={layout.content}>
          {loading && <Loading light className={styles.loader} />}
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
            <Button
              className={(styles.col5, styles.seeAllButton)}
              onClick={handleInfoClick}
              color="plain"
            >
              See all
            </Button>
          </div>
        </div>
        <ModalOverview data={fullData} title={modalTitle} />
      </div>
    );
  }
}

EmissionPathwaysOverview.propTypes = {
  data: PropTypes.object,
  fullData: PropTypes.object,
  modalTitle: PropTypes.string,
  loading: PropTypes.bool,
  handleInfoClick: PropTypes.func.isRequired
};

export default EmissionPathwaysOverview;
