import React from 'react';
import Modal, { ModalHeader } from 'components/modal';
import PropTypes from 'prop-types';
import VizCreator from 'components/my-climate-watch/viz-creator';
import ActionCard from 'components/my-climate-watch/my-cw-placeholder-card';
import Card from 'components/my-climate-watch/my-visualisations/my-cw-vis-card';
import styles from './my-visualisations-styles.scss';

const modalStyles = {
  content: {
    width: '90vw',
    maxHeight: '90vh',
    height: '90vh'
  }
};

const MyVisualisations = ({
  data,
  creatorIsOpen,
  openCreator,
  closeCreator
}) => (
  <div>
    <h1>My visualisations</h1>
    <ul className={styles.visContainer}>
      {data.map(vis => (
        <li key={vis.id} className={styles.visCard}>
          <Card data={vis} onClick={openCreator} />
        </li>
      ))}
      <li key="action-card" className={styles.insightsCard}>
        <ActionCard
          text="Create a new insight"
          action={{ type: 'action', onClick: openCreator }}
        />
      </li>
    </ul>
    <Modal
      customStyles={modalStyles}
      isOpen={creatorIsOpen}
      onRequestClose={closeCreator}
      shouldCloseOnOverlayClick={false}
    >
      <ModalHeader title="Create a visualisation" />
      <VizCreator onHideCreator={closeCreator} />
    </Modal>
  </div>
);

MyVisualisations.propTypes = {
  data: PropTypes.array,
  creatorIsOpen: PropTypes.bool,
  openCreator: PropTypes.func,
  closeCreator: PropTypes.func
};

export default MyVisualisations;
