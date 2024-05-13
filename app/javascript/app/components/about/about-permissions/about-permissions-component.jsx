import React from 'react';
import cx from 'classnames';
import layout from 'styles/layout';
import { SEO_PAGES } from 'data/seo';
import SEOTags from 'components/seo-tags';
import AbbrReplace from 'components/abbr-replace';
import { PropTypes } from 'prop-types';
import styles from './about-permissions-styles.scss';

const AboutPermissions = ({ location }) => (
  <div className={cx(layout.content, styles.aboutPermissions)}>
    <SEOTags page={SEO_PAGES.aboutPermissions} href={location.href} />
    <AbbrReplace>
      <p>
        Climate Watch has an open data commitment and provides information free
        of constraints and restrictions on use.
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
        download, share and adapt the data, maps, graphics, charts and other
        representations of the data for non-commercial or commercial uses.
      </p>
      <p>
        Some data displayed on Climate Watch was developed by other
        organizations and may carry other open licenses or permissions. For data
        sets not produced by Climate Watch, we provide links to download data
        from the original source when they are available. Please refer to the
        original licensing and cite the original data sources for these data
        sets.
      </p>
      <p>
        You must not imply that Climate Watch, World Resources Institute, NDC
        Partnership or any other partner organizations endorse your use of the
        data.
      </p>
      <h3>Citation of Climate Watch platform and data:</h3>
      <p>
        Climate Watch. 2024. Washington, DC: World Resources Institute.
        Available online at:{' '}
        <a href="https://www.climatewatchdata.org">
          https://www.climatewatchdata.org
        </a>
        .
      </p>
      <p>
        Please refer to the metadata information by clicking on the {'"i"'}{' '}
        button for each module for original data sources.
      </p>
      <p>
        In addition to Climate Watch, please also cite original data sources
        when used:
      </p>
      <h4>NDC Text in HTML:</h4>
      <ul>
        <li>
          INDCs: UNFCCC. 2017. INDCs as communicated by Parties. Available at:{' '}
          <a href="https://www4.unfccc.int/sites/submissions/INDC/Submission%20Pages/submissions.aspx">
            https://www4.unfccc.int/sites/submissions/INDC/Submission%20Pages/submissions.aspx
          </a>
          .
        </li>
        <li>
          NDCs: UNFCCC. 2024. NDC Registry. Available at:{' '}
          <a href="ttps://unfccc.int/NDCREG">
            ttps://unfccc.int/NDCREG
          </a>
          .
        </li>
      </ul>

      <h4>National Laws and Policies:</h4>
      <ul>
        <li>
          Climate Change Laws of the World database. 2020. Grantham Research
          Institute on Climate Change and the Environment and Sabin Center for
          Climate Change Law. Available at:{' '}
          <a href="https://climate-laws.org/">https://climate-laws.org/</a>.
        </li>
      </ul>

      <h4>Net-Zero Tracker:</h4>
      <ul>
        <li>
          Levin, K., D. Rich, K. Ross, T. Fransen, and C. Elliott. 2020.
          “Designing and Communicating Net-Zero Targets.” Working Paper.
          Washington, DC: World Resources Institute. Available at:{' '}
          <a href="www.wri.org/design-net-zero">www.wri.org/design-net-zero</a>.
        </li>
      </ul>
      <h4>GHG Emissions:</h4>
      <ul>
        <li>
          Climate Watch data: Climate Watch. 2024. GHG Emissions. Washington,
          DC: World Resources Institute. Available at:{' '}
          <a href="https://www.climatewatchdata.org/ghg-emissions">
            https://www.climatewatchdata.org/ghg-emissions
          </a>
          .
          <ul>
            <li>
              Please note that for the Land-Use Change and Forestry indicator in
              the Country GHG Emissions data collection, WRI has been granted a
              non-exclusive, non-transferrable right to publish these data by
              the Food and Agriculture Organization of the United Nations.
              Therefore, if users wish to republish this dataset in whole or in
              part, they should contact FAO directly at copyright@fao.org.
            </li>
            <li>
              Climate Watch data are derived from several sources. Any use of
              the Land-Use Change and Forestry or Agriculture indicator should
              be cited as FAO 2023, FAOSTAT Emissions Database. Any use of
              emissions from fuel combustion data should be cited as GHG
              Emissions from Fuel Combustion, OECD/IEA, 2023
            </li>
          </ul>
        </li>
        <li>
          PIK data: Gütschow, J.; Pflüger, M. (2023): The PRIMAP-hist national historical emissions time series v2.5 (1750-2022). zenodo. doi:10.5281/zenodo.10006301.
          <ul>
            <li>
              When using this dataset or one of its updates, please also cite
              the data description article (Gutschow et al., 2016,
              http://doi.org/10.5194/essd-8-571-2016) to which this data are
              supplement to. Please consider also citing the relevant original
              sources.
            </li>
            <li>Gütschow, J.; Jeffery, L.; Gieseke, R.; Gebel, R.; Stevens, D.; Krapp, M.; Rocha, M. (2016): The PRIMAP-hist national historical emissions time series, Earth Syst. Sci. Data, 8, 571-603, doi:10.5194/essd-8-571-2016 
            </li>
          </ul>
        </li>
        <li>
          UNFCCC data: UNFCCC. 2022. Greenhouse Gas Inventory Data.{' '}
          <a href="http://di.unfccc.int/">http://di.unfccc.int/</a>.
        </li>
        <li>
          GCP data: Global Carbon Project. (2023). Supplemental data of Global Carbon Budget 2023 (Version 1.1) [Data set]. Global Carbon Project.{' '}
          <a href="https://doi.org/10.18160/gcp-2023">
            https://doi.org/10.18160/gcp-2023
          </a>.
          <ul>
            <li>
              The use of data is conditional on citing the original data
              sources. Full details on how to cite the data are given at the top
              of each page in the accompanying database. The Global Carbon
              Project facilitates access to data to encourage its use and
              promote a good understanding of the carbon cycle. Respecting
              original data sources is key to help secure the support of data
              providers to enhance, maintain and update valuable data.
            </li>
          </ul>
        </li>
      </ul>
      <h4>NDC-SDG Linkages Methodology:</h4>
      <ul>
        <li>
          Northrop, E., H. Biru, S. Lima, M. Bouye, and R. Song. 2016.
          “Examining the Alignment Between the Intended Nationally Determined
          Contributions and Sustainable Development Goals.” Working Paper.
          Washington, DC: World Resources Institute. Available at:{' '}
          <a href="http://www.wri.org/sites/default/files/WRI_INDCs_v5.pdf">
            http://www.wri.org/sites/default/files/WRI_INDCs_v5.pdf
          </a>
          .
        </li>
      </ul>
      <h4>Pathways:</h4>
      <ul>
        <li>
          Please refer to the methodology and source documentation for each
          model to find the citation of the original data source
        </li>
      </ul>

      <h4>World Development Indicators:</h4>
      <ul>
        <li>
          World Development Indicators. 2023. The World Bank. Available at:{' '}
          <a href="http://databank.worldbank.org/data/reports.aspx?source=world-development-indicators">
            http://databank.worldbank.org/data/reports.aspx?source=world-development-indicators
          </a>
          .
        </li>
      </ul>

      <p>
        Most of the photographs featured on this site have either been licensed
        under nontransferable terms or have been acquired from photo-sharing
        sites such as Flickr that have their own policies for public use. Unless
        indicated otherwise, the Creative Commons CC BY 4.0 license described
        above does not apply to photographs and images used on this site.
      </p>
    </AbbrReplace>
  </div>
);
AboutPermissions.propTypes = {
  location: PropTypes.object
};

export default AboutPermissions;
