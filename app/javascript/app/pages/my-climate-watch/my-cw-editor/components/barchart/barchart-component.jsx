import React from 'react';
import PropTypes from 'prop-types';

import RenderChart from 'components/my-climate-watch/viz-creator/components/render-chart';

// const Bar = ({ data, ...props }) => (
//   <div
//     {...props}
//     style={{
//       position: 'relative',
//       backgroundColor: 'rgba(0, 0, 0, 0.2)',
//       width: '100px',
//       height: '20px'
//     }}
//   >
//     {data.map((d, i) => (
//       <div
//         key={`bar-${d}`}
//         style={{
//           height: `${d}px`,
//           width: '10px',
//           backgroundColor: 'red',
//           position: 'absolute',
//           left: `${i * 10}px`,
//           bottom: 0
//         }}
//       />
//     ))}
//   </div>
// );
const visualisationType = 'LineChart';
const styles = {};

const Bar = (props) => console.log(props) || (
  <RenderChart
    className={styles.chart}
    chart={props.data.vizType}
    config={props.data}
    width="90%"
    height={300}
  />
);

export default Bar;
