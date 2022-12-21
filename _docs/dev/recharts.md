---
layout: default
title: Components
has_children: false
has_toc: true
parent: Developers
permalink: /_docs/dev/recharts
nav_order: 5
---

# Recharts default config

We are using [recharts](https://recharts.org/en-US/) library to build the data visualizations inside Climate Watch and this are the defaults that we use as a reference.

## AXES

```js
{
  xTop:
  yRight:
  xBottom:
  yLeft: { // min data required
    name:
    unit:
    format:
  }
}
```

## TYPE

// type of the chart

## TOOLTIP

```js
{
  x:
  yWater:
  ySample: {
    label: ''
    prefix: '' // optional
    format: // just in case you want to show it in a different axes way
    sufix: '' // optional
    type: number | date ...
  }
}
```

## LEGEND

legendConfig <https://github.com/resource-watch/notebooks/blob/develop/ResourceWatch/Api_definition/layer_definition.ipynb>

## COLUMNS

```js
{
  x: [{ label: 'Year', value: 'x' }],
  y: [
    { label: 'Water', value: 'yWater' },
    { label: 'Sample', value: 'ySample' }
  ]
}
```

## DATA

```js
[
  {
    x: "1990-01-01 00:00:00+00",
    yWater: 1, // column name as a sufix with y prefixed
    ySample: 2
  }
]
```

## THEME

```js
    {
      // review recharts documentation to get more info
      yWater: {fill, stroke... }
    }
```

## CONFIG EXAMPLE

```js
{
  axes: {
    xBottom: {
      name: 'Year',
      unit: 'date',
      format: 'YYYY'
    },
    yLeft: {
      name: 'Emissions',
      unit: 'MtCO2e',
      format: ''
    }
  },
  type: 'stackedArea',
  columns: {
    x: ['x'],
    y: ['yRussia', 'yChina', 'yEUR28']
  }
}
```

## DATA EXAMPLE

```js
[
  { x: 1990, yRussia: 4000, yChina: 2400, yEUR28: 2400 },
  { x: 1995, yRussia: 3000, yChina: 1398, yEUR28: 2210 },
  { x: 2000, yRussia: 2000, yChina: 9800, yEUR28: 2290 },
  { x: 2005, yRussia: 2780, yChina: 3908, yEUR28: 2000 },
  { x: 2010, yRussia: 1890, yChina: 4800, yEUR28: 2181 },
  { x: 2015, yRussia: 2390, yChina: 3800, yEUR28: 2500 },
  { x: 2020, yRussia: 3490, yChina: 4300, yEUR28: 2100 }
]
```
