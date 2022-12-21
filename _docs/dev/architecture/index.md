---
layout: default
title: General architecture
nav_order: 1
parent: Developers
has_children: true
has_toc: true
permalink: /_docs/dev/architecture
---

## Frontend Architectural choices

The frontend is a [react](https://reactjs.org/) application with a [ruby on rails](https://rubyonrails.org/) backend.

We use [redux](https://redux.js.org/) as a state manager with [redux actions](https://redux-actions.js.org/).

For the router we use [react-router](https://reactrouter.com/).

There are some peculiarities in the architectural choices that we will outline in this section.