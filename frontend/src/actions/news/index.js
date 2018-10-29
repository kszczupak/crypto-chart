import ActionTypes from '../../constants/actionTypes';
import BackendAPI from '../../api/backendAPI';

// const testingNews = [
//   {
//     title: 'Why Bitcoin Price Changes?',
//     summary:
//       'Both Bitcoin buyers and sellers attention on the market is always focused on the cryptocurrency price. This is a defining factor that empowers traders to makes ...',
//     date: 'Jan 2, 2016',
//     source: 'CoinTelegraph',
//     source_url: 'https://cointelegraph.com/news/why-bitcoin-price-changes',
//     image_url:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9hGxOctlvqSfpb5VcdBmbZBQvKPiCSL2tSnjpfGKM7lXveP19DzTeoEhoUyTij0QS2D7Nu7g'
//   },
//   {
//     title:
//       'Nasdaq Linq claims to have issued first securities over a blockchain',
//     summary:
//       'Byrne recently confirmed that the U.S. Securities and Exchange Commission (SEC) has approved the company to issue public securities using the',
//     date: 'Jan 1, 2016',
//     source: 'Brave New Coin',
//     source_url:
//       'https://bravenewcoin.com/news/nasdaq-linq-claims-to-have-issued-first-securities-over-a-blockchain/',
//     image_url:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLK3u5cYOaLK-39kp1dnit7CV0zc-oisrTszSor9MM-PRK7W4whMtAmjr8uUXQ9xZiMufDSvLq'
//   }
// ];

export const selectStartDate = startDate => ({
  type: ActionTypes.START_DATE_SELECTED,
  startDate
});

export const selectEndDate = endDate => ({
  type: ActionTypes.END_DATE_SELECTED,
  endDate
});

const startFetchingNews = () => ({
  type: ActionTypes.FETCH_NEWS_START
});

const newsFetched = news => ({
  type: ActionTypes.FETCH_NEWS_SUCCESS,
  news
});

const errorOnNewsFetching = error => ({
  type: ActionTypes.FETCH_NEWS_ERROR,
  error
});

export const fetchNews = () => (dispatch, getState) => {
  const query = 'bitcoin';

  if (!BackendAPI.backendReady())
    return dispatch(
      errorOnNewsFetching('Backend not ready yet! Operation failed')
    );

  dispatch(startFetchingNews());

  const { startDate, endDate } = getState().dataRange;

  // Conversion to Json may be done here
  return BackendAPI.fetchNews(query, startDate, endDate).then(response =>
    dispatch(newsFetched(response), error =>
      dispatch(errorOnNewsFetching(error))
    )
  );
};
