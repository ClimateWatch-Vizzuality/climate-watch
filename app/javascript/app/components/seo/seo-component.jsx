import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { TITLE } from 'data/SEO';

export const MetaDescription = ({ descriptionContext, subtitle = null }) => (
  <Helmet>
    <title>{subtitle ? `${TITLE} - ${subtitle}` : TITLE}</title>
    <meta itemProp="name" content={TITLE} />
    <meta name="description" content={descriptionContext} />
  </Helmet>
);

export const SocialMetadata = ({ descriptionContext, href }) => (
  <Helmet>
    {/* Twitter Card data */}
    <meta name="twitter:title" content={TITLE} />
    <meta name="twitter:creator" content="@vizzuality" />
    <meta name="twitter:description" content={descriptionContext} />
    {/* Open Graph data */}
    <meta property="og:title" content={TITLE} />
    <meta property="og:description" content={descriptionContext} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={href} />
  </Helmet>
);

SocialMetadata.propTypes = {
  descriptionContext: PropTypes.string,
  href: PropTypes.string
};

MetaDescription.propTypes = {
  descriptionContext: PropTypes.string,
  subtitle: PropTypes.string
};
