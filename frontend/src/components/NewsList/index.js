import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import NewsCard from '../NewsCard';

const styles = theme => ({
  newsList: {
    maxHeight: 500,
    overflow: 'auto'
  }
});

function NewsList(props) {
  const newsList = props.news.map(news => {
    return (
      <ListItem>
        <NewsCard
          title={news.title}
          source={news.source}
          source_url={news.source_url}
          date={news.date}
          summary={news.summary}
          image_url={news.image_url}
        />
      </ListItem>
    );
  });

  return (
    <Grid container justify="center">
      <List className={props.classes.newsList}>{newsList}</List>
    </Grid>
  );
}

NewsList.propTypes = {
  news: PropTypes.array.isRequired
};

export default withStyles(styles)(NewsList);
