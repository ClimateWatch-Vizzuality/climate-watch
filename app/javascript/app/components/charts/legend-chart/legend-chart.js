import { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import { getLocationParamUpdated } from 'utils/navigation';
import { withRouter } from 'react-router';

import LegendChartComponent from './legend-chart-component';

class LegendChartContainer extends PureComponent {
  handleRemove = data => {
    const { dataSelected, targetParam } = this.props;
    const newFilters = [];
    dataSelected.forEach(d => {
      if (d.label !== data) {
        newFilters.push(d.value);
      }
    });
    this.updateUrlParam({ name: targetParam, value: newFilters.toString() });
  };

  handleAdd = selected => {
    const { targetParam } = this.props;
    this.updateUrlParam({
      name: targetParam,
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
  dataSelected: PropTypes.array,
  targetParam: PropTypes.string.isRequired
};

LegendChartContainer.defaultProps = {
  targetParam: 'filter'
};

export default withRouter(LegendChartContainer);
