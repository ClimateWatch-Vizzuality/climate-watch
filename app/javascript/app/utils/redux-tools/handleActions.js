import isPlainObject from 'lodash/isPlainObject';
import reduceReducers from 'reduce-reducers';
import invariant from 'invariant';
import handleAction from './handleAction';
import ownKeys from './ownKeys';

export default function handleActions(handlers, defaultState = {}) {
  invariant(
    isPlainObject(handlers),
    'Expected handlers to be an plain object.'
  );
  const reducers = ownKeys(handlers).reduce(
    (stack, symbol) =>
      stack.concat([handleAction(symbol, handlers[symbol], defaultState)]),
    []
  );

  const reducer = reduceReducers(...reducers);
  return (state, action) => reducer(state || defaultState, action);
}
