import isFunction from 'lodash/isFunction';
import { update } from 'js-lenses';

export const assign = (o, payload) => Object.assign({}, o, payload);

export const log = state => {
  console.log(state); // eslint-disable-line
  return state;
};

export const flatMapVis = vis =>
  vis.reduce((vv, v) => vv.concat(v.visualisations), []);

export const updateIn = (l, payload, state) =>
  update(l, s => assign(s, isFunction(payload) ? payload(s) : payload), state);
