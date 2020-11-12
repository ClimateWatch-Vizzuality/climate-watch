import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { STATIC_TITLE_PARTS, getDescription } from 'data/SEO';

const SEO = ({ dynamicTitlePart = '', href, page, pageData }) => {
  const { countryName } = pageData || {};
  const title = `${dynamicTitlePart ? `${dynamicTitlePart} |` : ''}${
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

SEO.propTypes = {
  dynamicTitlePart: PropTypes.string,
  href: PropTypes.string,
  page: PropTypes.string,
  pageData: PropTypes.object
};

export default memo(SEO);
