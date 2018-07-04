import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/modal/modal-component';
import ModalHeader from 'components/modal/modal-header-component';
import TextInput from 'components/text-input';
import Dropdown from 'components/dropdown';

import theme from 'styles/themes/input/text-input-theme.scss';
import styles from './modal-download-styles.scss';

class ModalDownload extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      organization: '',
      sector: {},
      country: {},
      explanation: ''
    };
  }

  handleChange = (event, input) => {
    this.setState({ [input]: event.target.value });
  };

  updateDropdownValue = (valueObject, dropdownId) => {
    this.setState({ [dropdownId]: valueObject });
  };

  renderForm() {
    const { countries, sectors, isSubmitting, downloadSize } = this.props;

    const onSubmit = event => {
      event.preventDefault();
      this.props.onSubmit(this.state);
    };

    return (
      <div>
        <p>
          Climate Watch has an open data commitment and intends to provide
          information free of constraints and restrictions on use. However, to
          help improve Climate Watch we request that you provide some feedback
          about how you intend to use the data.
        </p>

        <form onSubmit={onSubmit}>
          <TextInput
            className={styles.input}
            theme={theme}
            label={'First name'}
            value={this.state.first_name}
            inputType="text"
            onChange={e => this.handleChange(e, 'firstName')}
            required
          />

          <TextInput
            className={styles.input}
            theme={theme}
            label={'Last name'}
            value={this.state.lastName}
            inputType="text"
            onChange={e => this.handleChange(e, 'lastName')}
            required
          />

          <TextInput
            className={styles.input}
            theme={theme}
            inputType="email"
            label={'Email'}
            value={this.state.email}
            onChange={e => this.handleChange(e, 'email')}
            required
          />

          <Dropdown
            className={styles.dropdown}
            id={'firstName'}
            label="Country"
            options={countries}
            onValueChange={selected =>
              this.updateDropdownValue(selected, 'country')}
            value={this.state.country}
            hideResetButton
            required
          />

          <label>
            Subscribe to email updates
            <input name="subscribe" type="checkbox" value="true" />
          </label>

          <TextInput
            className={styles.input}
            theme={theme}
            inputType="text"
            label={'Organization'}
            value={this.state.organization}
            onChange={e => this.handleChange(e, 'organization')}
          />

          <Dropdown
            className={styles.dropdown}
            label="Sector"
            options={sectors}
            onValueChange={selected =>
              this.updateDropdownValue(selected, 'sector')}
            value={this.state.sector}
            hideResetButton
          />

          <TextInput
            className={styles.input}
            theme={theme}
            inputType="textarea"
            label={'How do you intend to use the data?'}
            value={this.state.explanation}
            onChange={e => this.handleChange(e, 'explanation')}
          />

          <input
            type="submit"
            value={`Download ${downloadSize}`}
            disabled={isSubmitting}
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
  downloadSize: PropTypes.string,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  countries: PropTypes.array.isRequired,
  sectors: PropTypes.array.isRequired
};

export default ModalDownload;
