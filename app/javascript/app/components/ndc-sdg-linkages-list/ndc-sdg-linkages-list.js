import { withProps } from 'recompose';
import { compareIndexByKey } from 'utils/utils';
import Component from './ndc-sdg-linkages-list-component';

const withSortedTargets = withProps(({ goal }) => ({
  targets: goal.targets.sort(compareIndexByKey('number'))
}));

export default withSortedTargets(Component);
