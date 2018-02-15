import { createElement } from 'react';
import charts from '../charts';

const RenderChart = ({ chart, ...props }) =>
  createElement(charts[chart], props);

export default RenderChart;
