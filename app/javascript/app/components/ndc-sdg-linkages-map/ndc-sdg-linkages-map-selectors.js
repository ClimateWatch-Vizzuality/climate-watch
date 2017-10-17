import { createSelector } from 'reselect';
import { scaleLinear } from 'd3-scale';
import worldPaths from 'app/data/world-50m-paths';

const getNdcsSdgsGoalsData = state => state.goalsData || null;
const getGoalSelected = state => state.goalSelected || null;

const buckets = ['#d3d3dc', '#a11a42'];
const colorScale = scaleLinear()
  .domain([0, 1])
  .range(buckets);

export const getNdcsSdgsGoalsDataSelected = createSelector(
  [getNdcsSdgsGoalsData, getGoalSelected],
  (data, goalSelected) => data[goalSelected] || null
);

export const getPathsWithStyles = createSelector(
  [getNdcsSdgsGoalsDataSelected],
  data => {
    if (!data) return worldPaths;

    return worldPaths.map(path => {
      let color = '#E5E5EB'; // default color
      if (data && data.locations && data.locations[path.id]) {
        const percentage = data.locations[path.id].length / data.targets.length;
        color = colorScale(percentage);
      }
      const style = {
        default: {
          fill: color,
          stroke: '#000',
          strokeWidth: 0.1,
          outline: 'none'
        },
        hover: {
          fill: color,
          stroke: '#000',
          strokeWidth: 0.1,
          outline: 'none'
        },
        pressed: {
          fill: color,
          stroke: '#000',
          strokeWidth: 0.5,
          outline: 'none'
        }
      };

      return {
        ...path,
        style
      };
    });
  }
);

export default {
  getPathsWithStyles
};
