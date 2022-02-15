export const handleInfoMetadataClick = (
  slug,
  category,
  indicators,
  setModalMetadata
) => {
  const metadataSlug =
    indicators &&
    indicators[slug] &&
    indicators[slug].metadata_source.toLowerCase();
  if (!metadataSlug) return;

  setModalMetadata({
    category,
    slugs: metadataSlug,
    open: true
  });
};
