import React from 'react';
import Modal, { ModalHeader } from 'components/modal';
import PropTypes from 'prop-types';
import VizCreator from 'components/my-climate-watch/viz-creator';
import ActionCard from 'components/my-climate-watch/my-cw-placeholder-card';
import Card from 'components/my-climate-watch/my-visualisations/my-cw-vis-card';
import {
  chartDataSelector,
  visualisationType
} from 'components/my-climate-watch/viz-creator/viz-creator-selectors';
import styles from './my-visualisations-styles.scss';

const modalStyles = {
  content: {
    width: '90vw',
    maxHeight: '90vh',
    height: '90vh',
    padding: 0
  }
};

const MyVisualisations = ({
  data,
  creatorIsOpen,
  openCreator,
  onSelectVis,
  closeCreator,
  currentId,
  mode
}) => (
  <div>
    <ul className={styles.visContainer}>
      {data.map(vis => (
        <li key={vis.id} className={styles.visCard}>
          <Card
            data={vis}
            onClick={() => {
              const payload = {
                id: vis.id,
                title: vis.title,
                description: vis.description,
                datasets: vis.json_body
              };
              return mode === 'edit'
                ? openCreator(payload)
                : onSelectVis({
                  mode: 'IMMUTABLE',
                  type: 'multichart',
                  data: {
                    chart: visualisationType({ datasets: vis.json_body }),
                    config: chartDataSelector({ datasets: vis.json_body }),
                    width: '90%',
                    height: 300
                  }
                });
            }}
          />
        </li>
      ))}
      <li key="action-card" className={styles.visCard}>
        <ActionCard
          text="Create a new visualization"
          action={{ type: 'action', onClick: openCreator }}
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

MyVisualisations.propTypes = {
  data: PropTypes.array,
  creatorIsOpen: PropTypes.bool,
  openCreator: PropTypes.func,
  closeCreator: PropTypes.func,
  onSelectVis: PropTypes.func,
  currentId: PropTypes.number,
  mode: PropTypes.string
};

export default MyVisualisations;
