import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import { STATIC_TITLE_PARTS, getDescription } from 'data/SEO';

const SEOTags = ({ dynamicTitlePart = '', href, page, countryName }) => {
  if (!STATIC_TITLE_PARTS[page]) {
    console.warn('Missing page SEO title. Check SEO.js');
  }
  const title = `${dynamicTitlePart ? `${dynamicTitlePart} | ` : ''}${
    STATIC_TITLE_PARTS[page]
  } | Climate Watch Data`;
  const descriptionContext = getDescription({ page, countryName });
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
    />
  );
};

SEOTags.propTypes = {
  dynamicTitlePart: PropTypes.string,
  href: PropTypes.string,
  page: PropTypes.string,
  countryName: PropTypes.string
};

export default memo(SEOTags);
