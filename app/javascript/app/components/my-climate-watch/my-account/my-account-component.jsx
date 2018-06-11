import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInput from 'components/text-input';
import Button from 'components/button';

import theme from 'styles/themes/input/text-input-theme.scss';
import styles from './my-account-styles.scss';

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      organization: '',
      workArea: ''
    };
  }

  render() {
    const { user, id, updateUser } = this.props;

    return (
      <div>
        <h1 className={styles.title}>User Profile</h1>
        <div className={styles.personalInfo}>
          <TextInput
            className={styles.input}
            theme={theme}
            placeholder={user.user_id.name || 'Add a name'}
            label={'Name'}
            inputType={'text'}
            onChange={value => this.setState({ name: value })}
          />
          <TextInput
            className={styles.input}
            theme={theme}
            value={user.email}
            inputType={'text'}
            label={'Email'}
            disabled
          />
        </div>
        <div className={styles.organizationalInfo}>
          <TextInput
            className={styles.input}
            theme={theme}
            placeholder={user.user_id.organization || 'Add an organization'}
            label={'Organization'}
            inputType={'text'}
            focus
            onChange={value => this.setState({ organization: value })}
          />
          <TextInput
            className={styles.input}
            theme={theme}
            placeholder={user.user_id.work_area || 'Add an area of work'}
            label={'Area of work'}
            inputType={'text'}
            onChange={value => this.setState({ workArea: value })}
          />
        </div>
        <div className={styles.updateButton}>
          <Button
            color={'yellow'}
            onClick={() => {
              updateUser(id, {
                name: this.state.name,
                organization: this.state.organization
              });
            }}
          >
            <span>Update profile</span>
          </Button>
        </div>
      </div>
    );
  }
}

MyAccount.propTypes = {
  user: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired
};

export default MyAccount;
