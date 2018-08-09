const FEATURE_DATA_SURVEY = process.env.FEATURE_DATA_SURVEY === 'true';

export const isEnabled = () => FEATURE_DATA_SURVEY;
