import ActionTypes from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  data: []
};

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

export const news = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_NEWS_START:
      return {
        isLoading: true,
        data: []
      };
    case ActionTypes.FETCH_NEWS_SUCCESS:
      // return {
      //   isLoading: false,
      //   data: testingNews
      // };
      return {
        isLoading: false,
        data: action.news
      };
    default:
      return state;
  }
};
