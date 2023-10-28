import { useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Chatbot from "./chatbot";


export default function LoadAllOrders() {
    const {orderno} = useParams();

    const [salesData, setsalesData] = useState(null);
    const [orders, setorders] = useState(null);

    useEffect(_ => {
        axios.get(`http://192.168.168.14:8085/get_all_orders?order_num=${orderno}`)
        .then(resp => {
            const result = resp.data;
            setsalesData({
                'sales_id': result.sales_id,
                'customer': result.customer,
                'sale_status': result.sale_status
            });
            setorders(result.orders);
        }).catch(_ => {
        //   chatUserState('Unable to fetch the results, Please reach out at csd@ajaffe.com');
        });
    }, [orderno]);

    return (
        <>
            <div className="row" style={{ margin: '0' }}>
                <div className="col-md-12">
                    <p>Sales Id - {salesData.sales_id}</p>
                    <p>Customer - {salesData.customer}</p>
                    <p>Sales Status - {salesData.sale_status}</p>
                </div>
        
                <div className="col-md-12">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ItemId</th>
                                <th scope="col">Sales QTY</th>
                                <th scope="col">Price</th>
                                <th scope="col">Stone Receipt Status</th>
                                <th scope="col">Confirmed Delivery Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.Item_no}</td>
                                    <td>{order.Sales_Quantity}</td>
                                    <td>{order.Price}</td>
                                    <td>{order.Stone_Receipt_Status}</td>
                                    <td>{order.Shipping_date_confirmed}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Chatbot />
        </>
    );
}