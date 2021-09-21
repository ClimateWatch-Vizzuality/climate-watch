import {
  DOCUMENT_COLUMNS_SLUGS,
  SUBMISSION_ICON_VALUE
} from 'data/country-documents';

const getIconValue = (slug, countryDocuments) => {
  const countryDocument =
    countryDocuments && countryDocuments.find(d => d.slug === slug);
  // Intend to submit documents are only Second NDC without submitted date
  if (
    slug === 'second_ndc' &&
    countryDocument &&
    !countryDocument.submission_date
  ) {
    return SUBMISSION_ICON_VALUE.intends;
  }
  return countryDocument ? SUBMISSION_ICON_VALUE.yes : SUBMISSION_ICON_VALUE.no;
};

export const getDocumentsColumns = (
  countryDocuments,
  documentSlugs = DOCUMENT_COLUMNS_SLUGS
) =>
  Object.keys(documentSlugs).reduce((acc, nextColumn) => {
    const slug = documentSlugs[nextColumn];
    return { ...acc, [nextColumn]: getIconValue(slug, countryDocuments) };
  }, {});
