import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import routes from './routes/routes';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {createBrowserRouter, RouterProvider} from "react-router-dom";


const router = createBrowserRouter(routes)
ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
reportWebVitals();
