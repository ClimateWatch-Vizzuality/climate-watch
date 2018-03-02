import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import identity from 'lodash/identity';
import isNil from 'lodash/isNil';
import isUndefined from 'lodash/isUndefined';
import includes from 'lodash/includes';
import invariant from 'invariant';

export default function handleAction(
  symbol,
  reducer = identity,
  defaultState = {}
) {
  const types = [symbol];
  invariant(
    !isUndefined(defaultState),
    `defaultState for reducer handling ${types
      .map(t => t.toString())
      .join(', ')} should be defined`
  );
  invariant(
    isFunction(reducer) || isPlainObject(reducer),
    'Expected reducer to be a function or object with next and throw reducers'
  );

  const [nextReducer, throwReducer] = isFunction(reducer)
    ? [reducer, reducer]
    : [reducer.next, reducer.throw].map(
      aReducer => (isNil(aReducer) ? identity : aReducer)
    );

  return (state = defaultState, action) => {
    const { key: actionType } = action;
    if (!actionType || !includes(types, actionType)) {
      return state;
    }

    return (action.error === true ? throwReducer : nextReducer)(state, action);
  };
}
