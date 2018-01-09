import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import Header from 'components/header';
import Intro from 'components/intro';
import Button from 'components/button';
import Search from 'components/search';
import cx from 'classnames';
import Sticky from 'react-stickynode';
import AnchorNav from 'components/anchor-nav';
import NdcsDocumentsMetaProvider from 'providers/ndcs-documents-meta-provider';
import Dropdown from 'components/dropdown';
import { Helmet } from 'react-helmet';

import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import theme from 'styles/themes/dropdown/dropdown-links.scss';
import lightSearch from 'styles/themes/search/search-light.scss';
import layout from 'styles/layout.scss';
import styles from './ndc-country-styles.scss';

class NDCCountry extends PureComponent {
  render() {
    const {
      country,
      match,
      onSearchChange,
      search,
      route,
      anchorLinks,
      documentsOptions,
      handleDropDownChange
    } = this.props;
    const META_TITLE = `Climate Watch: Data for Climate Action - ${country.name}`;
    const countryName = country && `made by ${country.name}`;
    const META_DESCRIPTION = `Explore the Commitments (NDCs) ${countryName} to act on climate change, as part of the Paris Agreement`;
    return (
      <div>
        <Helmet>
          <title>{META_TITLE}</title>
          <meta name="description" content={META_DESCRIPTION} />
        </Helmet>
        <NdcsDocumentsMetaProvider />
        {country && (
          <Header route={route}>
            <div
              className={cx(layout.content, styles.doubleFold, styles.header)}
            >
              <div className={styles.title}>
                <Intro title={country.wri_standard_name} />
              </div>
              <div className={styles.threeFold}>
                <div>
                  {documentsOptions && (
                    <div>
                      {documentsOptions.length > 1 ? (
                        <Dropdown
                          className={theme.dropdownOptionWithArrow}
                          placeholder="Select a document"
                          options={documentsOptions}
                          onValueChange={handleDropDownChange}
                          white
                          hideResetButton
                        />
                      ) : (
                        <Button
                          color="yellow"
                          link={`/ndcs/country/${match.params.iso}/full`}
                        >
                          {`View ${documentsOptions[0].label} Document`}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
                <Button
                  color="yellow"
                  link={`/ndcs/compare/mitigation?locations=${match.params
                    .iso}`}
                >
                  Compare
                </Button>
                <Search
                  theme={lightSearch}
                  placeholder="Search"
                  input={search}
                  onChange={onSearchChange}
                />
              </div>
            </div>
            <Sticky activeClass="sticky">
              <AnchorNav
                useRoutes
                links={anchorLinks}
                className={layout.content}
                theme={anchorNavRegularTheme}
              />
            </Sticky>
          </Header>
        )}
        <div className={styles.wrapper}>{renderRoutes(route.routes)}</div>
      </div>
    );
  }
}

NDCCountry.propTypes = {
  route: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  country: PropTypes.object,
  onSearchChange: PropTypes.func.isRequired,
  search: PropTypes.string,
  anchorLinks: PropTypes.array,
  documentsOptions: PropTypes.array,
  handleDropDownChange: PropTypes.func
};

export default NDCCountry;
