import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from 'components/icon';
import ToolsNav from 'components/tools-nav';
import CountriesSelect from 'components/countries-select';
import ClickOutside from 'react-click-outside';

import cwLogo from 'assets/icons/cw-logo.svg';
import layout from 'styles/layout.scss';
import styles from './nav-styles.scss';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCountries: false
    };
  }

  setCountriesVisibility(status) {
    this.setState({
      showCountries: status
    });
  }

  render() {
    return (
      <div className={layout.content}>
        <div className={styles.navbar}>
          <NavLink exact className={styles.link} to="/">
            <Icon className={styles.logo} icon={cwLogo} />
          </NavLink>
          <div
            className={styles.linkWrapper}
            onMouseEnter={() => this.setCountriesVisibility(true)}
            onMouseLeave={() => this.setCountriesVisibility(false)}
          >
            <NavLink
              className={styles.link}
              activeClassName={styles.linkActive}
              to="/countries"
            >
              COUNTRIES
            </NavLink>
            {this.state.showCountries &&
              <ClickOutside
                onClickOutside={() => this.setCountriesVisibility(false)}
              >
                <CountriesSelect
                  onLeave={() => this.setCountriesVisibility(false)}
                />
              </ClickOutside>}
          </div>
          <NavLink
            className={styles.link}
            activeClassName={styles.linkActive}
            to="/sectors"
          >
            SECTORS
          </NavLink>
          <NavLink
            className={styles.link}
            activeClassName={styles.linkActive}
            to="/ndcs"
          >
            NDCs
          </NavLink>
          <NavLink
            className={styles.link}
            activeClassName={styles.linkActive}
            to="/hgh"
          >
            GHG EMISSIONS
          </NavLink>
          <NavLink
            className={styles.link}
            activeClassName={styles.linkActive}
            to="/stories"
          >
            STORIES
          </NavLink>
          <NavLink
            className={styles.link}
            activeClassName={styles.linkActive}
            to="/about"
          >
            ABOUT
          </NavLink>
          <ToolsNav />
        </div>
      </div>
    );
  }
}

export default NavBar;
