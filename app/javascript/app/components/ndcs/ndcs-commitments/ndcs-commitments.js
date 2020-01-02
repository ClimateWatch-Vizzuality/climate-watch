import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import actions from 'pages/ndcs/ndcs-actions';
import PropTypes from 'prop-types';

import Component from './ndcs-commitments-component';
import { commitmentsData } from './ndcs-commitments-data';

class NdcsCommitments extends PureComponent {
  componentWillMount() {
    this.props.fetchNDCS();
  }

  render() {
    return <Component data={commitmentsData} />;
  }
}

NdcsCommitments.propTypes = {
  fetchNDCS: PropTypes.func.isRequired
};
export default connect(null, actions)(NdcsCommitments);
