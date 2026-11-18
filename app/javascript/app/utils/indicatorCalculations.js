import { NDC_2025_LABEL_SLUGS } from 'data/constants';

export const getSubmitted2020Isos = submittedIndicator => {
  if (!submittedIndicator) return null;
  // Enhanced mitigation are a subset of submitted 2020
  const submittedIsos = Object.keys(submittedIndicator.locations).filter(
    iso =>
      submittedIndicator.locations[iso].label_slug === 'submitted_2020' ||
      submittedIndicator.locations[iso].label_slug === 'enhanced_migitation'
  );
  return submittedIsos;
};

export const getSubmitted2025Isos = submittedIndicator => {
  if (!submittedIndicator) return null;
  // Exact match leaves out withdrawn NDCs and NDCs from non-Parties to the Paris Agreement
  return Object.keys(submittedIndicator.locations).filter(
    iso =>
      submittedIndicator.locations[iso].value ===
      NDC_2025_LABEL_SLUGS.SUBMITTED_2025
  );
};
