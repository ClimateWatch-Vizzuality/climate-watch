import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import {
  STATIC_TITLE_PARTS,
  SEO_PAGES,
  getCanonicalUrl,
  getDescription
} from 'data/seo';

// This file is complementary to seo-helper.rb
// that will start the seo on the first page load

const SEOTags = ({
  dynamicTitlePart = '',
  href,
  page,
  countryName,
  canonicalAttribute
}) => {
  if (!STATIC_TITLE_PARTS[page]) {
    console.warn('Missing page SEO title. Check SEO.js');
  }
  const title = `
    ${dynamicTitlePart ? `${dynamicTitlePart} ` : ''}
    ${STATIC_TITLE_PARTS[page]}
    ${page === SEO_PAGES.home ? '' : ' | Climate Watch'}
  `;
  const descriptionContext = getDescription({ page, countryName });
  const canonicalUrl = getCanonicalUrl(page, canonicalAttribute);
  return (
    <Helmet
      title={title}
      meta={[
        {
          name: 'name',
          content: title
        },
        {
          name: 'description',
          content: descriptionContext
        },
        {
          name: 'twitter:title',
          content: title
        },
        {
          name: 'twitter:creator',
          content: '@vizzuality'
        },
        {
          name: 'twitter:description',
          content: descriptionContext
        },
        {
          name: 'og:title',
          content: title
        },
        {
          name: 'og:description',
          content: descriptionContext
        },
        {
          name: 'og:type',
          content: 'website'
        },
        {
          name: 'og:url',
          content: href
        }
      ]}
    >
      {(canonicalUrl || page === SEO_PAGES.home) && (
        <link
          rel="canonical"
          href={`https://www.climatewatchdata.org${canonicalUrl}${
            canonicalAttribute ? `/${canonicalAttribute}` : ''
          }`}
        />
      )}
    </Helmet>
  );
};

SEOTags.propTypes = {
  dynamicTitlePart: PropTypes.string,
  href: PropTypes.string,
  page: PropTypes.string,
  countryName: PropTypes.string,
  canonicalAttribute: PropTypes.string
};

export default memo(SEOTags);
