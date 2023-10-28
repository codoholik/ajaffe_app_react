import App from '../App';
import ItemSearch from '../item_search';
import LoadAllOrders from '../loadallorders';

const routes = [
  {
    path: '/',
    element: <App />
  },
  {
    path: '/item/search',
    element: <ItemSearch />
  },
  {
    path: '/view/:orderno/allorders',
    element: <LoadAllOrders />
  }
];

export default routes;
