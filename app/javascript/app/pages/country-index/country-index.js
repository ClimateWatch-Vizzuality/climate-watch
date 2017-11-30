import { connect } from 'react-redux';
import { actions as menuActions } from 'components/countries-menu';
import Component from './country-index-component';

export default connect(null, menuActions)(Component);
