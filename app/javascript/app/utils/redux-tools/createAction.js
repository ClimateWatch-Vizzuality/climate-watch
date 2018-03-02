import identity from 'lodash/identity';
import isFunction from 'lodash/isFunction';
import isNull from 'lodash/isNull';
import invariant from 'invariant';

const uuidv1 = require('uuid/v1');

export default function createAction(
  name,
  payloadCreator = identity,
  metaCreator
) {
  invariant(
    isFunction(payloadCreator) || isNull(payloadCreator),
    'Expected payloadCreator to be a function, undefined or null'
  );

  const finalPayloadCreator =
    isNull(payloadCreator) || payloadCreator === identity
      ? identity
      : (head, ...args) =>
        (head instanceof Error ? head : payloadCreator(head, ...args));

  const hasMeta = isFunction(metaCreator);
  const typeSymbol = uuidv1() + name;

  const actionCreator = (...args) => {
    const payload = finalPayloadCreator(...args);
    const action = {
      type: name,
      key: typeSymbol
    };

    if (payload instanceof Error) {
      action.error = true;
    }

    if (payload !== undefined) {
      action.payload = payload;
    }

    if (hasMeta) {
      action.meta = metaCreator(...args);
    }

    return action;
  };

  actionCreator.toString = () => typeSymbol;

  return actionCreator;
}
