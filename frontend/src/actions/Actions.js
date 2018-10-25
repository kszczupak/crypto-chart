import ActionTypes from './ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import BackendAPI from '../api/BackendAPI';

const testingNews = [
  {
    title: 'Why Bitcoin Price Changes?',
    summary:
      'Both Bitcoin buyers and sellers attention on the market is always focused on the cryptocurrency price. This is a defining factor that empowers traders to makes ...',
    date: 'Jan 2, 2016',
    source: 'CoinTelegraph',
    source_url: 'https://cointelegraph.com/news/why-bitcoin-price-changes',
    image_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9hGxOctlvqSfpb5VcdBmbZBQvKPiCSL2tSnjpfGKM7lXveP19DzTeoEhoUyTij0QS2D7Nu7g'
  },
  {
    title:
      'Nasdaq Linq claims to have issued first securities over a blockchain',
    summary:
      'Byrne recently confirmed that the U.S. Securities and Exchange Commission (SEC) has approved the company to issue public securities using the',
    date: 'Jan 1, 2016',
    source: 'Brave New Coin',
    source_url:
      'https://bravenewcoin.com/news/nasdaq-linq-claims-to-have-issued-first-securities-over-a-blockchain/',
    image_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLK3u5cYOaLK-39kp1dnit7CV0zc-oisrTszSor9MM-PRK7W4whMtAmjr8uUXQ9xZiMufDSvLq'
  }
];

const Actions = {
  fetchNews(query, startDate, endDate) {
    // Maybe change this logic to function/decorator if it will be often repeated
    if (BackendAPI.backendReady()) {
      AppDispatcher.dispatchAsync(
        BackendAPI.fetchNews(query, startDate, endDate),
        {
          request: ActionTypes.FETCH_NEWS_START,
          success: ActionTypes.FETCH_NEWS_SUCCESS,
          failure: ActionTypes.FETCH_NEWS_ERROR
        }
      );
    } else {
      // Need to add some kind of a limit to prevent infinite calls
      setTimeout(() => {
        this.fetchNews(query, startDate, endDate);
      }, 200);
    }
  },
  testing_fetchNews() {
    AppDispatcher.dispatch({
      type: ActionTypes.FETCH_NEWS_START
    });
    AppDispatcher.dispatch({
      type: ActionTypes.FETCH_NEWS_SUCCESS,
      payload: JSON.stringify(testingNews)
    });
  },
  selectStartDate(date) {
    AppDispatcher.dispatch({
      type: ActionTypes.START_DATE_SELECTED,
      payload: date
    });
  },
  selectEndDate(date) {
    AppDispatcher.dispatch({
      type: ActionTypes.END_DATE_SELECTED,
      payload: date
    });
  }
};

export default Actions;
