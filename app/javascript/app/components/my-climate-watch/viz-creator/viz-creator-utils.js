import isFunction from 'lodash/isFunction';
import _startCase from 'lodash/startCase';
import _ from 'lodash-inflection';
import { update } from 'js-lenses';
import { assign } from 'app/utils';

export const toFetcher = name => `fetch${_.pluralize(_startCase(name))}`;
export const toSelector = name => `select${_.singularize(_startCase(name))}`;

// // maps filters to dropdown/multiselect format
export const mapFilter = data =>
  (data &&
    data.map &&
    data.map(o => ({
      label: o.label || o.name || o.full_name || o.alias,
      value: o.value || o.id
    }))) ||
  null;

export const flatMapVis = (vis = []) =>
  vis.reduce((vv, v) => vv.concat(v.visualisations), []);

export const updateIn = (l, payload, state) =>
  update(l, s => assign(s, isFunction(payload) ? payload(s) : payload), state);

// CHARTS
// --

export const pieChart2Data = () => {
  // console.log(scn, idc); //eslint-disable-line
};
