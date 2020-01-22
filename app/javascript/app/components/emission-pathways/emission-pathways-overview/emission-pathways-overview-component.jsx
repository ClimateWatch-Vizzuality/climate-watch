import React, { PureComponent } from 'react';
import Button from 'components/button';
import ModalOverview from 'components/modal-overview';
import PropTypes from 'prop-types';
import Loading from 'components/loading';
import layout from 'styles/layout.scss';
import cx from 'classnames';
import { toStartCase } from 'app/utils';
import styles from './emission-pathways-overview-styles.scss';

class EmissionPathwaysOverview extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  getElement = (key, data) => {
    let element = null;
    switch (key) {
      case 'url':
        element = (
          <a
            href={data[key]}
            target="_blank"
            rel="noopener noreferrer"
            className={cx(styles.itemData, styles.itemLink)}
          >
            {data[key]}
          </a>
        );
        break;
      case 'maintainer':
        element = (
          <div className={styles.itemLogo}>
            <img src={`https:${data[key]}`} />
          </div>
        );
        break;
      default:
        element = <p className={styles.itemData}>{data[key]}</p>;
        break;
    }
    return element;
  };

  render() {
    const { data, fullData, modalTitle, loading, handleInfoClick } = this.props;
    return (
      <div className={styles.wrapper}>
        <div className={layout.content}>
          {loading && <Loading light className={styles.loader} />}
          <div className="grid-column-item">
            <div className={cx(styles.col5, styles.overview)}>
              {data &&
                Object.keys(data).map(key => (
                  <div key={key} className={styles.item}>
                    <div className={styles.title}>{toStartCase(key)}</div>
                    {this.getElement(key, data)}
                  </div>
                ))}
            </div>
            <div className={styles.col5}>
              <Button
                className={(styles.col5, styles.seeAllButton)}
                onClick={handleInfoClick}
                variant="secondary"
              >
                See all
              </Button>
            </div>
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
