export const includeTotalData = (data, config) =>
  data.map(d => {
    let total = null;
    config.columns.y.forEach(key => {
      if (d[key.value]) {
        if (!total) total = 0;
        total += d[key.value];
      }
    });
    return {
      ...d,
      total
    };
  });

export const getMaxValue = data => {
  const lastData = data[data.length - 1];
  return {
    x: lastData.x,
    y: lastData.total
  };
};

export default { includeTotalData, getMaxValue };
