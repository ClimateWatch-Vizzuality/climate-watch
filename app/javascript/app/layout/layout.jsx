import React from 'react'

import Header from 'components/header'
import styles from './layout-styles.scss'

const Layout = ({ children }) => (
  <div className={styles.root}>
    <Header />
    <div className={styles.content}>
      {children}
    </div>
  </div>
)

export default Layout
