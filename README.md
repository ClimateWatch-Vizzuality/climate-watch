# Climate Watch

Table of Contents:

- [Local Setup](#local-setup)
- [Modules](#modules)
- [API](#api)

## Local setup

### Installing dependencies

```
yarn run js:install
```

and then

```
yarn run rails:install
```

These will satisfy both the frontend and backend's dependency requirements.

#### Setting up the Rails environment

Copy the sample `.env.sample` file to `.env` and modify it as needed to fit the
project's settings. At the very least you'll need to have the `DATABASE_URL`
env variable.

```
DATABASE_URL=postgresql://postgres@localhost/climate-watch_development
```

#### Setting up the database

```
yarn run rails:db:create
```

and then

```
yarn run rails:db:migrate
```

These will create the development database and then run the database migration tasks.

### Launching The App

You'll need to run both the rails server and the webpack server, which will be used internally by rails. Run, separately:

```
yarn run rails:server
```

and

```
yarn run js:server
```

Point your browser to `http://localhost:3000/`. Ta-da!

### Launching the app with docker
```docker-compose up```
Ta-da!

## Frontend Architectural choices

The fronted uses react, redux and react-router.
There are some peculiarities in the architectural choices that we will outline in this section.

## Router
The router version used in the project is `v.4.1.1`.

- routes are defined as a data-structure instead of using `jsx` inside the `routes.js` file.
- Instead of connecting the routes to the reducer via middleware we decided to use `withRouter` [HOC](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e) instead, which means whenever you need access to the router information you will have to wrap your component with `withRouter`.

## Modules

Perhaps the bigger peculiarity is the module based architecture. What a module architecture means is that all the elements that are part of a component are contained inside the same directory.
That includes not only Component and Container, but also styles, reducers and actions.

### Typical module structure:

```
├── my-module/
│   ├── components/
│   ├── my-module-actions.js
│   ├── my-module-component.jsx
│   ├── my-module-reducers.js
│   ├── my-module-styles.scss
│   └── my-module.js
```

### Module entry point

The module entry point, named as the directory containing the module exports every element of the module individually and acts as container (as in [container component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)) if needed.

### Module Component

The module's Component (as in [presentational component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)) only contains the view in `jsx`.
Every state related or action concern will be taken care of in the container in such way that the component will receive it via `props`.
The Component never handles logic.

### Module styles

For all the application styles we are using [css-modules](https://github.com/css-modules/css-modules), this allows for local scope (BEM for free) and theming/styles combination.

If the module we are writing is supposed to be reusable, the styles contained within the module only refer to the particular functioning of that module.
No aesthetic definition belongs in the module styles.

#### Theming

Whenever the module will need to be mounted in the application and given some style, the module will provide the means to be customized using [react-css-themr](https://github.com/javivelasco/react-css-themr)
and the parent will be responsible for styling the component with the app specific styles. This library provides a [HOC](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e) in which we can wrap our component or container and it will take care of merging the passed theme into the local styles.

## State management and connecting Modules

Once we are using the mentioned module architecture we have to gather all the local actions and reducers and glue them together so redux can use them.
For asynchronous actions we use [redux-thunk](https://github.com/gaearon/redux-thunk).

### Module Actions

Actions inside a module are created with [redux-actions createActions](https://github.com/acdlite/redux-actions) and exported individually.
For Thunk actions a slim wrapper around `createActions` is used, this allows us to pass a thunk as the second argument giving us full control of what actions to dispatch on `init` `success` or `fail`.

### Module Reducers

Reducers inside a module are simple pure functions, no switch case is even present.
The reducers file exports an object which keys are the actions constants and the value is the reducer that will react to that dispatched action.

The exported actions are used for the keys since `redux-actions` returns the action constant when calling the `.toString()` method in the action creator.

### App Actions

The application actions file is free to import/export every module's actions individually or merge them into a big object containing all the actions.

### App Reducers

In the app reducers we will import all module's reducers and bind them to a key in the store using a `handleActions` wrapper.
This wrapper uses `redux-actions`'s `handleActions` and glues all the individual reducers together to the matching actions.

## API

### NDC-SDG Linkages

#### Overview page

- `GET /api/v1/ndcs/sdgs_overview` will return a response with the following
format:

```
[
  {
    "id": 35,
    "locations": {
      "AFG": [
        "1.1",
        "1.5"
      ],
      "AGO": [
        "1.1"
      ]
    },
    "number": "1",
    "targets": [
      "1.1",
      "1.2",
      "1.3",
      "1.4",
      "1.5",
      "1.a",
      "1.b"
    ]
  }
]
```

Where:

- `id`: is the Sustainable Development Goal id;
- `number`: is the goal number;
- `locations`: is an array with all the locations that have linkages to targets
of this goal;
- `targets`: is the list of targets available for a given SDG goal;


#### WB (World Bank) Extra Country Data

- `GET /api/v1/wb_extra/:iso` will return a response with the following

extra params:
  startYear: min limit to the year. If its not included will get the closest min year
  endYear: min limit to the year. If its not included will get the closest max year

format:

```
[
    {
        "population": 30739250,
        "gdp": 13834300571,
        "year": 1961
    },
    {
        "population": 31023366,
        "gdp": 16138545209,
        "year": 1962
    }, ...
]
```

Where:

- `population`: is the total population for the year and the iso code of the country;
- `gdp`: is the gross domestic product for the year and the iso code of the country;
- `year`: year
