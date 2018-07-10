import { createElement, PureComponent } from 'react';
import ModalHeader from './modal-header-component';
import ModalComponent from './modal-component';

export { ModalHeader, ModalComponent };

class ModalContainer extends PureComponent {
  // TODO: This is obviously not the best solution. We have to remove the tabindex from the modal as its preventing the scrollbar from the dropdowns inside it to work
  componentDidUpdate() {
    const modal = document.getElementsByClassName('modal')[0];
    if (modal && modal.hasAttribute('tabindex')) {
      modal.removeAttribute('tabindex');
    }
  }

  render() {
    return createElement(ModalComponent, {
      ...this.props
    });
  }
}

export default ModalContainer;
