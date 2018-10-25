import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import './index.css';

class NewsCard extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const bullet = <span className="News-bullet">•</span>;

    return (
      <Card
        className="News-card"
        onClick={() => (window.location.href = this.props.source_url)}
      >
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
          wrap="nowarp"
          spacing={8}
        >
          <Grid item>
            <CardMedia
              component="img"
              className="News-image"
              height="100"
              image={this.props.image_url}
              title="News Image"
            />
          </Grid>
          <Grid item xs={8}>
            <CardContent>
              <Typography
                className="News-title"
                variant="title"
                color="textPrimary"
              >
                {this.props.title}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {this.props.source} {bullet} {this.props.date}
              </Typography>
              <Typography className="News-summary" component="p">
                {this.props.summary}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

NewsCard.propTypes = {
  title: PropTypes.string.isRequired,
  image_url: PropTypes.string,
  source: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  source_url: PropTypes.string.isRequired
};

export default NewsCard;
