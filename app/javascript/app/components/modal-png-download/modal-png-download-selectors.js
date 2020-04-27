import { createSelector, createStructuredSelector } from 'reselect';

const getIsModalOpen = ({ modalPngDownload }) => modalPngDownload.isOpen;
const getModalHeader = ({ modalPngDownload }) => modalPngDownload.header;
const getModalTitle = ({ modalPngDownload }) => modalPngDownload.title;

const getChartParams = (state, { chartParams }) => chartParams || null;

const createChartParamsString = chartParam =>
  chartParam && chartParam.map(r => r.label).join(', ');

const selectChartParams = createSelector([getChartParams], chartParams => {
  if (!chartParams) return null;
  const {
    sourcesSelected,
    regionsSelected,
    sectorsSelected,
    gasesSelected,
    breakBySelected
  } = chartParams;
  const source = `Data source: ${sourcesSelected && sourcesSelected.label}`;
  const regions = createChartParamsString(regionsSelected);
  const sectors = createChartParamsString(sectorsSelected);
  const gases = createChartParamsString(gasesSelected);
  const dataBy = `Show data by ${breakBySelected && breakBySelected.label}`;
  return `${source}; ${regions}; ${sectors}; ${gases}; ${dataBy}.`;
});

export default createStructuredSelector({
  isOpen: getIsModalOpen,
  header: getModalHeader,
  title: getModalTitle,
  selectionSubtitle: selectChartParams
});
