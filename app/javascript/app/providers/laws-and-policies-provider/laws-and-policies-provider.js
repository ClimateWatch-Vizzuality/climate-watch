import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import actions from './laws-and-policies-provider-actions';
import reducers, { initialState } from './laws-and-policies-provider-reducers';

class LawsAndPoliciesProvider extends PureComponent {
  componentDidMount() {
    const { fetchLawsAndPolicies, match } = this.props;
    fetchLawsAndPolicies({ iso: match.params.iso });
  }

  render() {
    return null;
  }
}

LawsAndPoliciesProvider.propTypes = {
  fetchLawsAndPolicies: PropTypes.func.isRequired,
  match: PropTypes.object
};

export { actions, reducers, initialState };
export default withRouter(connect(null, actions)(LawsAndPoliciesProvider));
