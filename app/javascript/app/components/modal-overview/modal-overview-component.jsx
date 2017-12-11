import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/modal/modal-component';
import ModalHeader from 'components/modal/modal-header-component';
import NoContent from 'components/no-content';
import startCase from 'lodash/startCase';
import styles from './modal-overview-styles.scss';

const MetadataProp = ({ title, children }) => (
  <p className={styles.text}>
    <span className={styles.textHighlight}>{startCase(title)}: </span>
    {children}
  </p>
);

MetadataProp.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};

class ModalOverview extends PureComponent {
  constructor() {
    super();
    this.handleOnRequestClose = this.handleOnRequestClose.bind(this);
    this.state = {
      selectedIndex: 0
    };
  }

  handleOnRequestClose() {
    this.props.onRequestClose();
  }

  renderData() {
    const { data } = this.props;
    if (!data) return <NoContent />;
    return Object.keys(data).map(key => (
      <MetadataProp key={key} title={key}>
        {data[key]}
      </MetadataProp>
    ));
  }

  render() {
    const { isOpen, title, tabTitles } = this.props;
    return (
      <Modal isOpen={isOpen} onRequestClose={this.handleOnRequestClose}>
        <ModalHeader
          title={title}
          tabTitles={tabTitles}
          selectedIndex={this.state.selectedIndex}
          handleTabIndexChange={i => this.setState({ selectedIndex: i })}
        />
        {this.renderData()}
      </Modal>
    );
  }
}

ModalOverview.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
  tabTitles: PropTypes.array,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default ModalOverview;
