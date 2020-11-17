import React from 'react';
import cx from 'classnames';
import layout from 'styles/layout';
import { SEO_PAGES } from 'data/seo';
import SEOTags from 'components/seo-tags';
import { PropTypes } from 'prop-types';
import styles from './about-permissions-styles.scss';

const AboutPermissions = ({ location }) => (
  <div className={cx(layout.content, styles.aboutPermissions)}>
    <SEOTags page={SEO_PAGES.aboutPermissions} href={location.href} />
    <p>
      Climate Watch has an open data commitment and provides information free of
      constraints and restrictions on use.
    </p>
    <p>
      Except as noted below, data and visualizations on this site carry a{' '}
      <a
        href="//creativecommons.org/licenses/by/4.0/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Creative Commons CC BY 4.0
      </a>{' '}
      license, which permits unrestricted reuse of Climate Watch content when
      proper attribution is provided (see below). This means you are able to
      download, share and adapt the data, maps, graphics, charts, and other
      representations of the data for non-commercial or commercial uses.
    </p>
    <p>
      Some data displayed on Climate Watch was developed by other organizations
      and may carry other open licenses or permissions. For data sets not
      produced by Climate Watch, we provide links to download data from the
      original source when they are available. Please refer to the original
      licensing and cite the original data sources for these data sets.
    </p>
    <p>
      You must not imply that Climate Watch, World Resources Institute, NDC
      Partnership or any other partner organizations endorse your use of the
      data.
    </p>
    <h3>Citation of the Climate Watch platform and data:</h3>
    <p>
      Climate Watch. 2018. Washington, DC: World Resources Institute. Available
      online at:{' '}
      <a href="https://www.climatewatchdata.org">
        https://www.climatewatchdata.org
      </a>
    </p>
    <p>
      In addition to Climate Watch, please also cite original data sources when
      used:
    </p>
    <h4>NDC Contents:</h4>
    <ul>
      <li>
        Pauw, W.P, Cassanmagnano, D., Mbeva, K., Hein, J., Guarin, A., Brandi,
        C., Dzebo, A., Canales, N., Adams, K.M., Atteridge, A., Bock, T., Helms,
        J., Zalewski, A., Frommé. E., Lindener, A., Muhammad, D. (2016). NDC
        Explorer. German Development Institute / Deutsches Institut für
        Entwicklungspolitik (DIE), African Centre for Technology Studies (ACTS),
        Stockholm Environment Institute (SEI). DOI:
        10.23661/ndc_explorer_2017_2.0
      </li>
    </ul>
    <h4>NDC Targets:</h4>
    <ul>
      <li>
        Fenhann, Joergen. 2018. Pledge Pipeline | Climate Change. Available
        online at:{' '}
        <a href="http://www.unep.org/climatechange/resources/pledge-pipeline">
          http://www.unep.org/climatechange/resources/pledge-pipeline
        </a>
        .
      </li>
    </ul>
    <h4>NDC Text in HTML:</h4>
    <ul>
      <li>
        UNFCCC. NDC Registry (interim). 2018. Available online at:{' '}
        <a href="http://www4.unfccc.int/ndcregistry/Pages/All.aspx">
          http://www4.unfccc.int/ndcregistry/Pages/All.aspx
        </a>
        .
      </li>
    </ul>
    <h4>GHG Emissions:</h4>
    <ul>
      <li>
        PIK data: Gtschow, Johannes; Jeffery, Louise; Gieseke, Robert; Gebel,
        Ronja (2017): The PRIMAP-hist national historical emissions time series
        (1850-2014). V. 1.1. GFZ Data Services.{' '}
        <a href="http://doi.org/10.5880/PIK.2017.001">
          http://doi.org/10.5880/PIK.2017.001
        </a>
        .
      </li>
      <li>
        UNFCCC data: UNFCCC. 2017. Greenhouse Gas Inventory Data - Detailed data
        by Party. Available online at:{' '}
        <a href="http://di.unfccc.int/detailed_data_by_party">
          http://di.unfccc.int/detailed_data_by_party
        </a>
        .
      </li>
    </ul>
    <h4>NDC-SDG Linkages Methodology:</h4>
    <ul>
      <li>
        Northrop, E., H. Biru, S. Lima, M. Bouye, and R. Song. 2016. “Examining
        the Alignment Between the Intended Nationally Determined Contributions
        and Sustainable Development Goals.” Working Paper. Washington, DC: World
        Resources Institute. Available online at:{' '}
        <a href="http://www.wri.org/sites/default/files/WRI_INDCs_v5.pdf">
          http://www.wri.org/sites/default/files/WRI_INDCs_v5.pdf
        </a>
        .
      </li>
    </ul>
    <h4>Pathways:</h4>
    <ul>
      <li>
        Please refer to the methodology and source documentation for each model
        to find the citation of the original data source
      </li>
    </ul>
    <p>
      Most of the photographs featured on this site have either been licensed
      under nontransferable terms or have been acquired from photo-sharing sites
      such as Flickr that have their own policies for public use. Unless
      indicated otherwise, the Creative Commons CC BY 4.0 license described
      above does not apply to photographs and images used on this site.
    </p>
  </div>
);
AboutPermissions.propTypes = {
  location: PropTypes.object
};

export default AboutPermissions;
