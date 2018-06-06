import React from 'react';
import Modal, { ModalHeader } from 'components/modal';
import PropTypes from 'prop-types';
import VizCreator from 'components/my-climate-watch/viz-creator';
import ActionCard from 'components/my-climate-watch/my-cw-placeholder-card';
import Vis from 'components/my-climate-watch/my-visualisations/my-cw-vis';
import {
  chartDataSelector,
  getVisualisationType
} from 'components/my-climate-watch/viz-creator/viz-creator-selectors';
import styles from './my-visualisations-styles';

const modalStyles = {
  overlay: {
    zIndex: 40,
    boxShadow: '0 5px 15px 0 rgba(71, 44, 184, 0.1)',
    backgroundColor: 'rgba(17, 55, 80, 0.4)',
    overflow: 'auto'
  }
};

const MyVisualisations = props => {
  const {
    data,
    creatorIsOpen,
    openCreator,
    onSelectVis,
    closeCreator,
    currentId,
    mode,
    deleteAtomic
  } = props;
  const onClick = vis =>
    (mode === 'add'
      ? onSelectVis({
        id: vis.id,
        title: vis.title,
        description: vis.description,
        chart: getVisualisationType({ datasets: vis.json_body }),
        config: chartDataSelector({ datasets: vis.json_body }),
        deleteAtomic,
        width: '90%',
        height: 300
      })
      : openCreator({
        id: vis.id,
        title: vis.title,
        description: vis.description,
        datasets: vis.json_body
      }));

  return (
    <div>
      <ul className={styles.visContainer}>
        {data.map(vis => (
          <li key={vis.id} className={styles.visCard}>
            <Vis data={vis} onClick={() => onClick(vis)} />
          </li>
        ))}
        <li key="action-card" className={styles.visCard}>
          <ActionCard
            text="Create a new visualization"
            action={{ type: 'action', onClick: () => openCreator() }}
          />
        </li>
      </ul>
      <Modal
        customStyles={modalStyles}
        theme={styles}
        isOpen={creatorIsOpen}
        onRequestClose={closeCreator}
        shouldCloseOnOverlayClick={false}
        header={
          <ModalHeader
            theme={styles}
            title={`${currentId ? 'Edit' : 'Create a new'} visualization`}
          />
        }
      >
        <VizCreator onHideCreator={closeCreator} />
      </Modal>
    </div>
  );
};

MyVisualisations.propTypes = {
  data: PropTypes.array,
  creatorIsOpen: PropTypes.bool,
  openCreator: PropTypes.func,
  closeCreator: PropTypes.func,
  onSelectVis: PropTypes.func,
  currentId: PropTypes.number,
  mode: PropTypes.string,
  deleteAtomic: PropTypes.func
};

export default MyVisualisations;
