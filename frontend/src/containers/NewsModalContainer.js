import { connect } from 'react-redux';

import NewsModal from '../components/NewsModal';

const mapStateToProps = state => ({
  isNewsLoading: state.news.isLoading,
  news: state.news.data
});

export const NewsModalContainer = connect(mapStateToProps)(NewsModal);
