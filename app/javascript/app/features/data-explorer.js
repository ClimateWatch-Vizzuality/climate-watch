const FEATURE_DATA_EXPLORER = process.env.FEATURE_DATA_EXPLORER === 'true';

export const isEnabled = () => FEATURE_DATA_EXPLORER;
