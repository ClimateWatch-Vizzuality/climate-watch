import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'components/modal-metadata';
import Component from './country-employment-and-costs-component';
import {
  getSectionData,
  getLoading
} from './country-employment-and-costs-selectors';

const mapStateToProps = state => ({
  sectionData: getSectionData(state),
  loading: getLoading(state)
});

export default withRouter(connect(mapStateToProps, actions)(Component));
