import React from 'react';
import Modal, { ModalHeader } from 'components/modal';
import PropTypes from 'prop-types';
import VizCreator from 'components/my-climate-watch/viz-creator';

const modalStyles = {
  content: {
    width: '90vw',
    maxHeight: '90vh',
    height: '90vh'
  }
};

const getKey = i => `viz-${i}`;

const MyVisualisations = ({
  data,
  creatorIsOpen,
  openCreator,
  closeCreator
}) => (
  <div>
    <h1>My visualisations</h1>
    <ul>
      {data.map((v, i) => <li key={getKey(i)}>{JSON.stringify(v)}</li>)}
      <li>
        <button onClick={openCreator}>Create a new visualisation</button>
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
