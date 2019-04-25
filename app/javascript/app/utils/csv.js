export function encodeAsCSVContent(data, sortOrder) {
  let csvContent = 'data:text/csv;charset=utf-8,';

  const escapeForCSV = value => (value && String(value).includes(',') ? `"${value}"` : value);

  const headers = Object.keys(data[0]).sort(sortOrder);
  const rows = [headers.join(',')];

  data.forEach(row => {
    rows.push(headers.map(header => escapeForCSV(row[header])).join(','));
  });

  csvContent += rows.join('\r\n');
  return encodeURI(csvContent);
}

export function invokeCSVDownload(csvContentEncoded) {
  const link = document.createElement('a');
  link.setAttribute('href', csvContentEncoded);
  link.setAttribute('download', 'ghg-emissions.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link); // Required for FF
  link.click();
  document.body.removeChild(link);
}
