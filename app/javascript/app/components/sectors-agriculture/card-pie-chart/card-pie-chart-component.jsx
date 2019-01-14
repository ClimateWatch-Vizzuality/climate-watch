import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { Card } from 'cw-components';
import DataLabel from './data-label-component';
import * as styles from './card-pie-chart-styles.scss';

class CardPieChart extends PureComponent {
  render() {
    // eslint-disable-next-line react/prop-types
    const { cardSubTitleText, theme } = this.props;
    const DATA = [
      { name: 'Group A', value: 2400 },
      { name: 'Group B', value: 4567 },
      { name: 'Group C', value: 1398 },
      { name: 'Group D', value: 9800 },
      { name: 'Group E', value: 3908 },
      { name: 'Group F', value: 4800 }
    ];
    const COLORS = [
      '#0677B3',
      '#68696B',
      '#808184',
      '#E3E5EA',
      '#ACACB7',
      '#999B9E'
    ];
    return (
      <Card theme={theme} subtitle={cardSubTitleText}>
        <div className={styles.cardContent}>
          <p className={styles.description}>
            Worldwide in 2014, the Agriculture sector contributed to 3k MtCO2e
            GHG emissions, which represented 24.3% of all emissions.
          </p>
          <div className={styles.labels}>
            {/* {DATA.map(({ name, value }, index) => ( */}
            <DataLabel
              name={DATA[0].name}
              value={DATA[0].value}
              color="#808184"
            />
            {/* ))} */}
          </div>
          <PieChart width={200} height={200} className={styles.pieChart}>
            <Pie
              data={DATA}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              fill="#82ca9d"
              paddingAngle={0}
            >
              {DATA.map((entry, index) => (
                <Cell fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </Card>
    );
  }
}

export default CardPieChart;
