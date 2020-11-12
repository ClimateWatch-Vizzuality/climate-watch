import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { TITLE } from 'data/SEO';

export const SEO = ({ descriptionContext, dynamicTitlePart = '', href }) => (
  <Helmet
    title={`${TITLE} | ${dynamicTitlePart} | Climate Watch Data`}
    meta={[
      {
        name: 'name',
        content: TITLE
      },
      {
        name: 'description',
        content: descriptionContext
      },
      {
        name: 'twitter:title',
        content: TITLE
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
        content: TITLE
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

SEO.propTypes = {
  descriptionContext: PropTypes.string,
  dynamicTitlePart: PropTypes.string,
  href: PropTypes.string
};
