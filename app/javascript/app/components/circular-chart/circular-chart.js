import { withProps } from 'recompose';
import Component from './circular-chart-component';

const setRadius = index => (100 + index * 20) / (3.14159 * 2); // eslint-disable-line no-mixed-operators
const setDiameter = index => setRadius(index) * 2;
const normalizeCircunference = index => 3.14159 * setDiameter(index);
const setArcLength = (value, index) =>
  360 * value / 100 / 360 * normalizeCircunference(index); // eslint-disable-line no-mixed-operators

const withCircleUtils = withProps({
  setRadius,
  normalizeCircunference,
  setArcLength
});

export default withCircleUtils(Component);
