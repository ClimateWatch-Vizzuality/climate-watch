export function setStorageWithExpiration(key, data, expirationDays) {
  const expirationInMS = expirationDays * 24 * 60 * 60 * 1000;
  const record = {
    value: JSON.stringify(data),
    timestamp: new Date().getTime() + expirationInMS
  };
  localStorage.setItem(key, JSON.stringify(record));
  return data;
}

export function getStorageWithExpiration(key) {
  const record = JSON.parse(localStorage.getItem(key));
  if (!record) {
    return false;
  }
  return new Date().getTime() < record.timestamp;
}

export default {
  setStorageWithExpiration,
  getStorageWithExpiration
};
