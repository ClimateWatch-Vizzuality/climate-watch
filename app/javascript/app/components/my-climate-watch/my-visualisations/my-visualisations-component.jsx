import React from 'react';
import Modal, { ModalHeader } from 'components/modal';

import VizCreator from 'components/my-climate-watch/viz-creator';

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
    <ul>
      {data.map(i => <li>{JSON.stringify(i)}</li>)}
      <li>
        <button onClick={openCreator}>Create a new visualisation</button>
      </li>
    </ul>
    <Modal
      styles={modalStyles}
      isOpen={creatorIsOpen}
      onRequestClose={closeCreator}
    >
      <ModalHeader title="Create a visualisation" />
      <VizCreator onHideCreator={closeCreator} />
    </Modal>
  </div>
);

export default MyVisualisations;
