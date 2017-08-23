import React from 'react';
import { LineChart, Line, XAxis, Tooltip } from 'recharts';
import Header from 'components/header';
import Intro from 'components/intro';
import ButtonGroup from 'components/button-group';
import Button from 'components/button';
import Icon from 'components/icon';
import AutocompleteSearch from 'components/autocomplete-search';

import iconShare from 'assets/icons/share.svg';
import styles from './home-styles.scss';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
];

const animated = false;

const renderTooltip = props =>
  console.info(props) ||
  <div>
    {props.label}
  </div>;

const Home = () =>
  (<div>
    <Header size="large">
      <Intro title="Climate Watch" description="A very useful site" />
      <div className={styles.doubleFold}>
        <ButtonGroup />
        <div>
          <Button className="download-button">
            <span>Compare</span>
          </Button>
          <Button type="icon">
            <Icon icon={iconShare} />
          </Button>
        </div>
      </div>
      <AutocompleteSearch />
    </Header>
    <h1>Home</h1>
    <LineChart width={400} height={400} data={data}>
      <Tooltip
        isAnimationActive={animated}
        cursor={false}
        content={renderTooltip}
      />
      <Line
        isAnimationActive={animated}
        onClick={e => console.info(e)}
        type="monotone"
        dataKey="uv"
        stroke="#8884d8"
      />
      <XAxis isAnimationActive={animated} dataKey="uv" />
    </LineChart>
  </div>);
export default Home;
