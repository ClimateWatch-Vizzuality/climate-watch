import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

import image1 from 'assets/news/1.jpg';
import image2 from 'assets/news/2.jpg';
import image3 from 'assets/news/3.jpg';
import image4 from 'assets/news/4.jpg';
import image5 from 'assets/news/5.jpg';

const fetchStoriesInit = createAction('fetchStoriesInit');
const fetchStoriesReady = createAction('fetchStoriesReady');
const fetchStoriesFail = createAction('fetchStoriesFail');

const stories = [
  {
    id: 1,
    title: '8 Interactive Graphics Answer Top Climate Change Questions',
    image: image1,
    link:
      'http://www.wri.org/blog/2015/09/8-interactive-graphics-answer-top-climate-change-questions'
  },
  {
    id: 2,
    title: 'Designing the Rules of the Climate Action Game',
    image: image2,
    link:
      'http://www.wri.org/blog/2017/07/insider-designing-rules-climate-action-game'
  },
  {
    id: 3,
    title:
      'White House Abandoning Paris Agreement Harms the U.S. As Other Countries Step Up',
    image: image3,
    link:
      'http://www.wri.org/blog/2017/06/white-house-abandoning-paris-agreement-harms-us-other-countries-step'
  },
  {
    id: 4,
    title:
      'Achieving India’s Ambitious Renewable Energy Goals: A Progress Report',
    image: image4,
    link:
      'http://www.wri.org/blog/2017/05/achieving-indias-ambitious-renewable-energy-goals-progress-report'
  },
  {
    id: 5,
    title: 'Climate Negotiations in Bonn: The Countdown to 2018 Starts',
    image: image5,
    link:
      'http://www.wri.org/blog/2017/05/climate-negotiations-bonn-countdown-2018-starts'
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
