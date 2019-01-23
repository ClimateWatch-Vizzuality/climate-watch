import { createSelector, createStructuredSelector } from 'reselect';

import { sectionsData } from './about-faq-data';

const getQuery = state => state.query;

const getSections = () => sectionsData;

const defaultSectionSlug = 'general_questions';

const getSideNavigationSections = createSelector(getSections, sections => {
  if (!sections) return null;
  return sections.reduce(
    (acc, section) => [
      ...acc,
      {
        label: section.label,
        slug: section.slug,
        link: section.path,
        selected: section.slug === defaultSectionSlug
      }
    ],
    []
  );
});

export default createStructuredSelector({
  query: getQuery,
  sections: getSections,
  sideNavigationSections: getSideNavigationSections
});
