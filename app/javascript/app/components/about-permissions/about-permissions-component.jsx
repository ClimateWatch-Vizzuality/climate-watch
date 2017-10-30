import React from 'react';
import styles from './about-permissions-styles.scss';

const AboutPermissions = () => (
  <div className={styles.aboutPermissions}>
    <p>
      Climate Watch has an open data commitment and intends to provide
      information free of constraints and restrictions on use. Except as noted
      below, data and visualizations on this site carry the Creative Commons CC
      BY 4.0 license, which permits unrestricted reuse of Climate Watch content
      when proper attribution is provided. This means you are able to download,
      share, and adapt the data for any use, including commercial and
      noncommercial uses. You must attribute the data appropriately, using the
      information provided in the data set description.
    </p>
    <p>
      Some data displayed on Climate Watch was developed by other organizations
      and may carry other open licenses or permissions. For data sets not
      produced by Climate Watch, we provide links to download data from the
      original source when they are available. Please refer to the original
      licensing and cite the original data sources for these data sets.
    </p>
    <h3>Permissions & licensing</h3>
    <ul>
      <li>
        You are free to use maps, graphics, charts, and other representations of
        data on the Climate Watch website, with the Creative Commons CC BY 4.0
        license. Where graphs employ data from third parties, we may not be able
        to grant permissions to the original data used in these charts, although
        such permissions may be granted by the owners of the data. In these
        cases, please contact the third-party organizations directly to ask
        about permissions.
      </li>
      <li>
        Source data licensing is determined for each inpidual data set—please
        refer to the original data source for detailed information. You must
        attribute the data as indicated in the metadata or licensing for each
        inpidual data set. Most of the photographs featured on this site have
        either been licensed under nontransferable terms, or have been acquired
        from photo-sharing sites such as Flickr that have their own policies for
        public use. Unless indicated otherwise, the Creative Commons CC BY 4.0
        license described above does not apply to photographs and images used on
        this site.
      </li>
      <li>
        You must not imply that Climate Watch, World Resources Institute, NDC
        Partnership or any other partner organizations endorses your use of the
        data.
      </li>
    </ul>
    <h3>Citations</h3>
    <p>
      For the following data sets, published directly in the Climate Watch
      platform, please use the following citation
    </p>
    <ul>
      <li>
        SDG Linkages Northrop, E., H. Biru, S. Lima, M. Bouye, and R. Song.
        2016. “Examining the Alignment Between the Intended Nationally
        Determined Contributions and Sustainable Development Goals.” Working
        Paper. Washington, DC: World Resources Institute. Available online at:{' '}
        <a href="www.climatewatchdata.org" target="_blank">
          www.climatewatchdata.org
        </a>
      </li>
      <li>
        CAIT emissions data (except PIK or UNFCCC data sets) Climate Watch.
        2017. Washington, DC: World Resources Institute. Available online at:{' '}
        <a href="www.climatewatchdata.org" target="_blank">
          www.climatewatchdata.org
        </a>
      </li>
    </ul>
  </div>
);

export default AboutPermissions;
