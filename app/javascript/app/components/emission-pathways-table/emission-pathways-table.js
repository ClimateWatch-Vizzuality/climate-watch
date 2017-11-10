import { connect } from 'react-redux';
import { filteredModelData } from './emission-pathways-table-selectors';
import Component from './emission-pathways-table-component';

const mapStateToProps = (state, { model }) => ({
  data: filteredModelData({ state, model })
});

export default connect(mapStateToProps, null)(Component);
