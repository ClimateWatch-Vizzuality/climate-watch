import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'components/modal-metadata';
import Component from './country-employment-and-costs-component';
import { getSectionData } from './country-employment-and-costs-selectors';

const mapStateToProps = state => ({
  sectionData: getSectionData(state)
});

export default withRouter(connect(mapStateToProps, actions)(Component));
