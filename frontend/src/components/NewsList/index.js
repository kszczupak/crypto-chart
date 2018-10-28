import React from 'react';
import PropTypes from 'prop-types';

import NewsCard from '../NewsCard';
import './index.css';

function NewsList(props) {
  const newsList = props.news.map(news => {
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

NewsList.propTypes = {
  news: PropTypes.object.isRequired
};

export default NewsList;
