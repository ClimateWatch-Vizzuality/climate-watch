import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { Card } from 'cw-components';
import DataLabel from './data-label-component';
import * as styles from './card-pie-chart-styles.scss';

class CardPieChart extends PureComponent {
  render() {
    // eslint-disable-next-line react/prop-types
    const { cardSubTitleText, theme, pieChartData } = this.props;
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

    const agricultureEmissionRow = pieChartData && pieChartData.sectorEmissions.find(({ name }) => name === 'Agriculture');
    console.log(agricultureEmissionRow);
    // const { value = '', percentageValue = '' } = pieChartData ? pieChartData.sectorEmissions.find(({ location }) => location === 'Agriculture') : { value: '', percentageValue: '' };
    return (
      <Card theme={theme} subtitle={cardSubTitleText}>
        <div className={styles.cardContent}>
          <p className={styles.description}>
            {pieChartData && pieChartData.location} in {pieChartData && pieChartData.year}, the Agriculture sector contributed to {agricultureEmissionRow && agricultureEmissionRow.value} MtCO2e
            GHG emissions, which represented {agricultureEmissionRow && agricultureEmissionRow.percentageValue}% of all emissions.
          </p>
          <div className={styles.labels}>
            {/* {DATA.map(({ name, value }, index) => ( */}
            <DataLabel
              name='Agriculture'
              value={`${agricultureEmissionRow && agricultureEmissionRow.percentageValue}% (${agricultureEmissionRow && agricultureEmissionRow.value})`}
              color="#808184"
            />
            {/* ))} */}
          </div>
          <PieChart width={200} height={200} className={styles.pieChart}>
            <Pie
              data={pieChartData ? pieChartData.sectorEmissions : []}
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
