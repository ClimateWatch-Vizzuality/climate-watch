import React from 'react';
import Header from 'components/header';
import Intro from 'components/intro';
import Accordion from 'components/accordion';

const NDCCountry = () =>
  (<div>
    <Header>
      <Intro title="Country name" />
    </Header>
    <Accordion />
  </div>);
export default NDCCountry;
