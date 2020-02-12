import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { TITLE } from 'data/SEO';

export const MetaDescription = ({ descriptionContext, subtitle = null }) => (
  <Helmet
    title={subtitle ? `${TITLE} - ${subtitle}` : TITLE}
    meta={[
      {
        name: 'name',
        content: TITLE
      },
      {
        name: 'description',
        content: descriptionContext
      }
    ]}
  />
);

export const SocialMetadata = ({ descriptionContext, href }) => (
  <Helmet
    meta={[
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

SocialMetadata.propTypes = {
  descriptionContext: PropTypes.string,
  href: PropTypes.string
};

MetaDescription.propTypes = {
  descriptionContext: PropTypes.string,
  subtitle: PropTypes.string
};
