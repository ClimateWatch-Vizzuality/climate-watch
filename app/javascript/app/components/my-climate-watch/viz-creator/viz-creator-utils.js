import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import findIndex from 'lodash/findIndex';
import isEmpty from 'lodash/isEmpty';
import _startCase from 'lodash/startCase';
import _ from 'lodash-inflection';
import { update, get } from 'js-lenses';
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
  [];

export const flatMapVis = (vis = []) =>
  vis.reduce((vv, v) => vv.concat(v.visualisations), []);

export const updateIn = (l, payload, state) =>
  update(l, s => assign(s, isFunction(payload) ? payload(s) : payload), state);

export function getCachedSelectedProperty(lense, data) {
  const cachedSelection = lense.selected;
  console.log('PREVIOUS SELECTION', cachedSelection);
  console.log(`DATA ${lense.name}`, data);
  if (cachedSelection) {
    if (isArray(cachedSelection)) {
      console.log(cachedSelection.forEach(element => findIndex(data, item => item.id === element.value) !== -1));
      return cachedSelection.forEach(element => findIndex(data, item => item.id === element.value) !== -1)
        ? cachedSelection
        : [];
    }
    console.log(findIndex(data, item => item.id === cachedSelection.value) === -1);
    return findIndex(data, item => item.id === cachedSelection.value) !== -1 ? cachedSelection : {};
  }
}

export function buildChildLense(childLense, selected, state, initialState) {
  return { ...get(childLense, isEmpty(selected) ? initialState : state), loaded: false, loading: false };
}
