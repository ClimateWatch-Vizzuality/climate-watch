import { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import { getLocationParamUpdated } from 'utils/navigation';
import { withRouter } from 'react-router';

import LegendChartComponent from './legend-chart-component';

class LegendChartContainer extends PureComponent {
  handleRemove = data => {
    const { dataSelected } = this.props;
    const newFilters = [];
    dataSelected.forEach(filter => {
      if (filter.label !== data.label) {
        newFilters.push(filter.value);
      }
    });
    this.updateUrlParam({ name: 'filter', value: newFilters.toString() });
  };

  handleAdd = selected => {
    this.updateUrlParam({
      name: 'filter',
      value: selected.map(s => s.value).toString()
    });
  };

  updateUrlParam(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  render() {
    return createElement(LegendChartComponent, {
      ...this.props,
      handleRemove: this.handleRemove,
      handleAdd: this.handleAdd
    });
  }
}

LegendChartContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dataSelected: PropTypes.array
};

export default withRouter(LegendChartContainer);
