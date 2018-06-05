import isEmpty from 'lodash/isEmpty';
import findIndex from 'lodash/findIndex';

export let visCreatorCache = {}; // eslint-disable-line import/no-mutable-exports

export function updateCacheItem(item, data) {
  visCreatorCache[`${item}`] = data;
}

export function updateCacheItemValue(field) {
  if (field.multi) {
    visCreatorCache[`${field.type}`].selected = field.values;
  } else {
    visCreatorCache[`${field.type}`].selected = {
      label: field.label,
      value: field.value
    };
  }
  if (isEmpty(visCreatorCache.locations.selected)) {
    clearCache();
  }
}

export function clearCache(arg = null) {
  if (arg) {
    visCreatorCache[arg] = {
      ...visCreatorCache[arg],
      loaded: true,
      data: [],
      selected: []
    };
    if (arg !== 'timeseries') {
      clearCache(visCreatorCache[arg].child);
    }
  } else {
    visCreatorCache = {};
  }
}

export function updateTimeseriesCache(data) {
  visCreatorCache.timeseries = data;
}

export function filterCache(type) {
  const isMulti = visCreatorCache[type].multi;
  const availableData = visCreatorCache[type].data;
  const selectedData = visCreatorCache[type].selected;
  if (isMulti) {
    if (!isEmpty(availableData) && !isEmpty(selectedData)) {
      if (
        selectedData.forEach(
          element =>
            findIndex(availableData, item => item.value === element.value) ===
            -1
        )
      ) {
        clearCache(type);
        return true;
      }
    }
  } else if (
    !isEmpty(availableData) &&
    !isEmpty(selectedData) &&
    findIndex(availableData, item => item.value === selectedData.value) === -1
  ) {
    clearCache(type);
    return true;
  }
  return false;
}
