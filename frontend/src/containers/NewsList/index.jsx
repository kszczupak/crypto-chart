import React, { Component } from 'react';
import './index.css';
import NewsCard from '../../components/NewsCard/index';
import NewsStore from '../../stores/NewsStore';
import { Container } from 'flux/utils';

class NewsList extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    // if (!this.state.news) {
    //   return <div>Loading...</div>;
    // }

    const newsList = this.state.news.map(news => {
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

NewsList.getStores = () => [NewsStore];
NewsList.calculateState = prevState => ({
  news: NewsStore.getState()
});

const NewsListContainer = Container.create(NewsList);

export default NewsListContainer;
