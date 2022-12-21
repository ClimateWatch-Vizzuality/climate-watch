---
layout: default
title: State Management
parent: General architecture
grand_parent: Developers
nav_order: 2
permalink: /_docs/dev/architecture/router
---

## Router
This application is using [react-router](https://reactrouter.com/) for the frontend routing. Is important to notice that we also have the backend serving the page and the assets.

- routes are defined as a data-structure instead of using `jsx` inside the `routes.js` file.
- Instead of connecting the routes to the reducer via middleware we decided to use `withRouter` [HOC](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e) instead, which means whenever you need access to the router information you will have to wrap your component with `withRouter`.
