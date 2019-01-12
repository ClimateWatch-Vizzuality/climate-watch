import { createSelector, createStructuredSelector } from 'reselect';

import { sections } from './about-faq-data';


const getQuery = state => state.query;

const getSections = () => sections;

const selectedSectionSlug = 'general_questions';

const getSelectedSection = createSelector(getSections, sect => sect.filter(s => s.slug === selectedSectionSlug)[0]);

const getSideNavigationSections = createSelector(
  [getSections, getSelectedSection],
  (sectionss, selectedSection) => {
    if (!sectionss || !selectedSection) return null;
    return sectionss.reduce((acc, section) => (
      [...acc, {
        label: section.label,
        slug: section.slug,
        link: section.path,
        selected: section.slug === selectedSection.slug
      }]
    ), []);
  }
);

export default createStructuredSelector({
  query: getQuery,
  sections: getSections,
  selectedSection: getSelectedSection,
  sideNavigationSections: getSideNavigationSections
});
