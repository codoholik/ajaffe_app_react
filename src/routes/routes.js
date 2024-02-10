import App from '../App';
import ItemSearch from '../item_search';
import LoadAllOrders from '../loadallorders';
import OrderPage from '../order_page';


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
  },
  {
    path: '/order/create',
    element: <OrderPage />
  }
];

export default routes;
