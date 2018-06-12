import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/modal/modal-component';
import ModalHeader from 'components/modal/modal-header-component';
import styles from './modal-download-styles.scss';

const SPREADSHEET_URL =
  'https://script.google.com/macros/s/AKfycbynUpTR6EHAcGwfgaI26U3jFH4WKaPNTsR8qZBkSwNs7OCh7TJF/exec';

class ModalDownload extends PureComponent {
  submit(event) {
    event.preventDefault();

    const payload = {
      first_name: this.firstNameInput.value,
      last_name: this.lastNameInput.value,
      email: this.emailInput.value,
      subscribe: this.subscribeInput.checked,
      organization: this.organizationInput.value,
      sector: this.sectorInput.value,
      explanation: this.explanationInput.value
    };

    const params = Object.keys(payload).map(
      key => `${key}=${encodeURIComponent(payload[key])}`
    );

    this.submitInput.disabled = 'disabled';

    fetch(`${SPREADSHEET_URL}?${params.join('&')}`).then(response => {
      this.submitInput.disabled = null;
      window.location.assign(this.props.downloadUrl);
    });
  }

  renderForm() {
    const { size } = this.props;
    const submit = this.submit.bind(this);

    return (
      <div>
        <p>
          Climate Watch has an open data commitment and intends to provide
          information free of constraints and restrictions on use. However, to
          help improve Climate Watch we request that you provide some feedback
          about how you intend to use the data.
        </p>

        <form onSubmit={submit}>
          <div>
            <div>
              <label>
                First name
                <input
                  name="first_name"
                  ref={el => (this.firstNameInput = el)}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Last name
                <input
                  name="last_name"
                  ref={el => (this.lastNameInput = el)}
                  required
                />
              </label>
            </div>
          </div>

          <label>
            Email address
            <input
              type="email"
              name="email"
              ref={el => (this.emailInput = el)}
              required
            />
          </label>

          <label>
            Country
            <input
              name="country"
              ref={el => (this.countryInput = el)}
              required
            />
          </label>

          <label>
            Subscribe to email updates
            <input
              name="subscribe"
              type="checkbox"
              value="true"
              ref={el => (this.subscribeInput = el)}
            />
          </label>

          <label>
            Organization
            <input
              id="organization"
              name="organization"
              ref={el => (this.organizationInput = el)}
            />
          </label>

          <label>
            Sector
            <input
              id="sector"
              name="sector"
              ref={el => (this.sectorInput = el)}
            />
          </label>

          <label>
            How do you intend to use the data?
            <textarea
              name="explanation"
              ref={el => (this.explanationInput = el)}
            />
          </label>

          <input
            type="submit"
            value={`Download ${size}`}
            ref={el => (this.submitInput = el)}
          />

          <p>
            These data carry the Creative Commons CC BY 4.0 license. By clicking
            Download you agree to our Data privacy policy.
          </p>
        </form>
      </div>
    );
  }

  render() {
    const { isOpen, onRequestClose } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        header={<ModalHeader title="Download NDC Component" />}
      >
        {this.renderForm()}
      </Modal>
    );
  }
}

ModalDownload.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  downloadUrl: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default ModalDownload;
