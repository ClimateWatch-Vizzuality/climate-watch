import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

import image1 from 'assets/news/1.jpg';
import image2 from 'assets/news/2.png';
import image3 from 'assets/news/3.jpg';
import image4 from 'assets/news/4.jpg';
// import image5 from 'assets/news/5.jpg';
import image6 from 'assets/news/6.jpg';

const fetchStoriesInit = createAction('fetchStoriesInit');
const fetchStoriesReady = createAction('fetchStoriesReady');
const fetchStoriesFail = createAction('fetchStoriesFail');

const stories = [
  {
    id: 1,
    title: 'Got Climate Questions? Climate Watch Has Answers',
    image: image6,
    link:
      '//www.wri.org/blog/2017/11/got-climate-questions-climate-watch-has-answers'
  },
  {
    id: 2,
    title:
      'This Interactive Chart Explains World’s Top 10 Emitters, and How They’ve Changed',
    image: image2,
    link:
      '//www.wri.org/blog/2017/04/interactive-chart-explains-worlds-top-10-emitters-and-how-theyve-changed'
  },
  {
    id: 3,
    title: '6 Charts to Understand U.S. State Greenhouse Gas Emissions',
    image: image1,
    link:
      '//www.wri.org/blog/2017/08/6-charts-understand-us-state-greenhouse-gas-emissions'
  },
  {
    id: 4,
    title:
      '6 Things You Never Knew About Indonesia’s Emissions and Local Climate Action',
    image: image3,
    link:
      '//www.wri.org/blog/2016/06/6-things-you-never-knew-about-indonesias-emissions-and-local-climate-action'
  },
  {
    id: 5,
    title:
      'New Database Can Help Countries Chart a Course for Implementation of NDCs',
    image: image4,
    link:
      '//www.wri.org/blog/2017/09/new-database-can-help-countries-chart-course-implementation-ndcs'
  }
];

const fetchStories = createThunkAction('fetchStories', () => dispatch => {
  dispatch(fetchStoriesInit());
  setTimeout(() => {
    dispatch(fetchStoriesReady(stories));
  }, 400);
});

export default {
  fetchStories,
  fetchStoriesInit,
  fetchStoriesReady,
  fetchStoriesFail
};
