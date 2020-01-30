import { createSelector } from 'reselect';
import { scaleLinear } from 'd3-scale';
import worldPaths from 'app/data/world-50m-paths';
import { generateLinkToDataExplorer } from 'utils/data-explorer';
import { shouldShowPath } from 'utils/map';

const getSearch = state => state.search || null;
const getNdcsSdgsGoalsData = state => state.goalsData || null;
const getGoalSelected = state => state.goalSelected || null;
const getGoalHover = state => state.goalHover || null;
const getTargetHover = state => state.targetHover || null;

const initialStep = '#d3d3dc';
let colorScale;
function setScaleBuckets(range) {
  colorScale = scaleLinear()
    .domain([0, 1])
    .range(range);
}

export const getNdcsSdgsGoalsDataSelected = createSelector(
  [getNdcsSdgsGoalsData, getGoalSelected, getGoalHover],
  (data, goalSelected, goalHover) => {
    if (!data) return null;
    if (goalSelected) return data[goalSelected - 1];
    return goalHover ? data[goalHover - 1] : data[0];
  }
);

export const getPathsWithStyles = createSelector(
  [getNdcsSdgsGoalsDataSelected, getTargetHover],
  (data, targetHover) => {
    if (!data) {
      return worldPaths.filter(path => shouldShowPath(path));
    }
    setScaleBuckets([initialStep, data.colour]);
    const paths = [];
    worldPaths.forEach(path => {
      if (shouldShowPath(path)) {
        let color = '#E5E5EB'; // default color
        let clickAllowed = false;
        const iso = path.properties && path.properties.id;
        if (
          data &&
          data.locations &&
          data.locations[iso] &&
          data.locations[iso].numbers
        ) {
          let percentage =
            data.locations[iso].numbers.length / data.targets.length;
          clickAllowed = true;
          if (targetHover) {
            const isIncluded = data.locations[iso].numbers.includes(
              targetHover
            );
            clickAllowed = isIncluded;
            percentage = isIncluded ? 1 : 0;
          }
          color = colorScale(percentage);
        }
        const style = {
          default: {
            fill: color,
            stroke: '#000',
            strokeWidth: 0.05,
            outline: 'none'
          },
          hover: {
            fill: color,
            stroke: '#000',
            strokeWidth: 0.05,
            outline: 'none'
          },
          pressed: {
            fill: color,
            stroke: '#000',
            strokeWidth: 0.5,
            outline: 'none'
          }
        };

        return paths.push({
          ...path,
          style,
          clickAllowed
        });
      }
      return null;
    });
    return paths;
  }
);

export const getLinkToDataExplorer = createSelector([getSearch], search => {
  const section = 'ndc-sdg-linkages';
  return generateLinkToDataExplorer(search, section);
});

export default {
  getPathsWithStyles
};
