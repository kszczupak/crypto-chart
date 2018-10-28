import React, { Component } from 'react';
import './index.css';
import NewsCard from '../NewsCard';
import PropTypes from 'prop-types';
// import NewsStore from '../../stores/NewsStore';
// import { Container } from 'flux/utils';

class NewsList extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const newsList = this.props.news.map(news => {
      return (
        <NewsCard
          title={news.title}
          source={news.source}
          source_url={news.source_url}
          date={news.date}
          summary={news.summary}
          image_url={news.image_url}
        />
      );
    });

    return <div>{newsList}</div>;
  }
}

NewsList.propTypes = {
  news: PropTypes.object.isRequired
};
// NewsList.getStores = () => [NewsStore];
// NewsList.calculateState = prevState => ({
//   news: NewsStore.getState()
// });

// const NewsListContainer = Container.create(NewsList);

export default NewsList;
