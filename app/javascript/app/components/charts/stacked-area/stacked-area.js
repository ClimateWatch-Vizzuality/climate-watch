import { PureComponent, createElement } from 'react';
import { getMaxValue } from 'utils/stacked-area';
import PropTypes from 'prop-types';
import {
  getDataWithTotal,
  getDomain,
  getDataMaxMin
} from './stacked-area-selectors';
import stackedAreaComponent from './stacked-area-component';

class StackedAreaContainer extends PureComponent {
  render() {
    const { points, data, config } = this.props;
    const stackedAreaState = {
      points,
      data,
      config
    };

    const dataWithTotal = getDataWithTotal(stackedAreaState);
    return createElement(stackedAreaComponent, {
      ...this.props,
      dataWithTotal,
      domain: getDomain(stackedAreaState),
      dataMaxMin: getDataMaxMin(stackedAreaState),
      lastData: getMaxValue(dataWithTotal)
    });
  }
}

StackedAreaContainer.propTypes = {
  points: PropTypes.array,
  data: PropTypes.array,
  config: PropTypes.object
};

export default StackedAreaContainer;
