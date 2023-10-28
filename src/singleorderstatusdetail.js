export default function SingleOrderStatusDetail({order, viewmorebtn, loadallorderspage}) {
    return (
        <li className="is-ai animation">
            <div className="is-ai__profile-picture">
                <svg className="icon-avatar" viewBox="0 0 32 32">
                    <use xlinkHref="#avatar"></use>
                </svg>
            </div>
            <div className="chatbot__message" id="single_order_status_detail">
                <p style={{ marginBottom: '0', fontWeight: 'bold' }}>Order Details</p>
                <ul style={{ marginBottom: '0' }}>
                    <li style={{ marginBottom: '0' }}>
                        <b>Order</b> # {order.Sales_Id}
                    </li>
                    <li style={{ marginBottom: '0' }}>
                        <b>Customer</b> # {order.Customer_Name}
                    </li>
                    <li style={{ marginBottom: '0' }}>
                        <b>Account</b># {order.Account_No}
                    </li>
                    <li style={{ marginBottom: '0' }}>
                        <b>Purchase Order</b># {order.Purchase_Order_No}
                    </li>
                    <li style={{ marginBottom: '0' }}>
                        <b>Sales Status</b># {order.Sales_Status}
                    </li>
                    <li style={{ marginBottom: '0' }}>
                        <b>Item_No:</b> {order.Item_no} - {order.CONFIGNAME}
                    </li>
                    <li style={{ marginBottom: '0' }}>
                        <b>Quantity:</b> {order.Sales_Quantity}, <b>Price:</b> {order.Price}
                    </li>
                    <li style={{ marginBottom: '0' }}>
                        <b>Confirmed Delivery Date</b> {order.Shipping_date_confirmed}
                    </li>
                    {(order.productionhold === 1 || order.productionhold === '1') && (
                        <li style={{ marginBottom: '0' }}>
                            <b>Hold</b> {order.productionhold}
                        </li>
                    )}
                    <li style={{ marginBottom: '0' }}>
                        <b>Customer Stone Receipt Status:</b> {order.Stone_Receipt_Status}
                    </li>
                    {viewmorebtn && (
                        <button type="button" className="btn btn-primary" style={{marginTop: '10px'}} onClick={_ => loadallorderspage(order.Sales_Id)}>View More</button>
                    )}
                </ul>
            </div>
      </li>        
    )
}