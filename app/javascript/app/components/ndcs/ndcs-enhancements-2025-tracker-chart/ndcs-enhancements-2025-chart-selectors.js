export const getMetadata = state =>
    !state.metadata.loading ? state.metadata.data : null;