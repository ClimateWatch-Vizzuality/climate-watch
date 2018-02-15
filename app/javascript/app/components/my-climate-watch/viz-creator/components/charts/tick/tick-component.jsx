import React from 'react';

const Tick = tick => <text {...tick}>{tick.payload.value}</text>;

export default Tick;
