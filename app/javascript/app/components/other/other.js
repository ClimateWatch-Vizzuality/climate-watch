import { connect } from 'react-redux';
import Component from './other-component';
import actions from './other-actions';

const TEST_SEARCH_DATA = [
  {
    label: 'Brazil full text',
    value: 'brazil_full',
    path: '/country/bra'
  },
  {
    label: 'Brazil summary',
    value: 'brazil_sum',
    path: '/country/bra/summary'
  }
];

const mapStateToProps = state => ({
  ...state.other,
  searchList: TEST_SEARCH_DATA.filter(
    item =>
      item.label.toLowerCase().indexOf(state.other.search.toLowerCase()) !== -1
  )
});

// export { default as component } from './other-component'
export { default as reducers } from './other-reducers';
export { default as actions } from './other-actions';

export default connect(mapStateToProps, actions)(Component);
