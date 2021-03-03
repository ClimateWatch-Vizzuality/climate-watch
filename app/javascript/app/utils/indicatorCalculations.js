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
