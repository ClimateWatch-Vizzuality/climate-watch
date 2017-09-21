# RECHARTS DEFAULT CONFIG

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

## INTERACTIVITY

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
  xColumns: [x],
  yColumns: [yWater, ySample]
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