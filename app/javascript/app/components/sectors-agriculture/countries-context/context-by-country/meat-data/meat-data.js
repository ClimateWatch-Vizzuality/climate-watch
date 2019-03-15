import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';
import Component from './meat-data-component';
import { meatData, CATEGORY_KEY, BREAK_BY_KEY } from './meat-data-selectors';

const mapStateToProps = (state, { location }) => {
  const search = qs.parse(location.search);
  const cc = { ...state, search };
  return {
    ...meatData(cc)
  };
};

class MeatDataContainer extends PureComponent {
  updateUrlParam = params => {
    const { history } = this.props;
    const { location } = history;
    history.replace(getLocationParamUpdated(location, params));
  };

  handleInfoBtnClick = () => {
    // TODO: Implement info button click
  };

  updateCategoryFilter = category =>
    this.updateUrlParam({ name: CATEGORY_KEY, value: category.value });

  updateBreakByFilter = option =>
    this.updateUrlParam({ name: BREAK_BY_KEY, value: option.value });

  handleLegendChange = selected => {
    const others = selected.filter(v => v.value === 'others');
    const value = others.length && others[0].value;
    this.updateUrlParam({ name: 'tradeChart', value });
  };

  render() {
    return (
      <Component
        {...this.props}
        updateCategoryFilter={this.updateCategoryFilter}
        updateBreakByFilter={this.updateBreakByFilter}
        handleLegendChange={this.handleLegendChange}
      />
    );
  }
}

MeatDataContainer.propTypes = {
  history: PropTypes.shape({})
};

export default withRouter(connect(mapStateToProps, null)(MeatDataContainer));
