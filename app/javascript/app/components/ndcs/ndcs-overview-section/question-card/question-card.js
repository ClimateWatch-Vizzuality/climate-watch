import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import QuestionCardComponent from './question-card-component';
import { getQuestionStats } from './question-card-selectors';

const mapStateToProps = (state, props) => ({
  questionStats: getQuestionStats(state, props)
});

export default withRouter(
  connect(mapStateToProps, null)(QuestionCardComponent)
);
