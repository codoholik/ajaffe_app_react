import React, { useState, useEffect } from 'react';
import truck from "../images/shipped.png"
import archive from '../images/folders_1494956.png'
import invoice from '../images/advice_10926280.png'
import orders from '../images/clipboard_755802.png'
import quote from '../images/financial-advisor_2182964.png'
import InvoiceContent from './InvoiceContent';
import WebOrderContent from './WebOrderContent';
import OrderContent from './OrderContent';
import ArchivedContent from './ArchivedContent';

function Table_with_data(props) {
    const [activeContent, setActiveContent] = useState('Orders');
    const [Lpayload, setLpayload] = useState([]);
    const [dataTrans, setDataTrans] = useState([]);


    const handleSidebarClick = (contentId) => {
        setActiveContent(contentId);
    };

    const [jsonData, setJsonData] = useState([]);


    useEffect(() => {
        const statuses = ['Invoiced', 'Cancelled', 'Open Order'];
        const salesGroups = ['Group A', 'Group B', 'Group C'];
        const orderedBy = ['John Doe', 'Jane Smith', 'Alice Johnson'];
        const userDetails = ['User1', 'User2', 'User3'];

        function getRandomElement(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        const dataArray = [];
        const Ldata = [];

        for (let i = 0; i < 10; i++) {
            const data = {
                //"Buy Again": Math.random() < 0.5,
                "Order": Math.floor(Math.random() * 1000),
                "Item ID": Math.floor(Math.random() * 100),
                "Status": getRandomElement(statuses),
                "Config Name": "Random Config",
                "Customer ID": Math.floor(Math.random() * 10000),
                "Customer PO #": "PO" + Math.floor(Math.random() * 100),
                "Customer Reference": "Ref" + Math.floor(Math.random() * 100),
                "Sales Group": getRandomElement(salesGroups),
                "Ordered By": getRandomElement(orderedBy),
                "Invoice ID": Math.floor(Math.random() * 1000),
                "Invoice Date": "2024-02-22",
                "Center Shape": "Shape Circle",
                "Metal": "Rose/Gold/Silver",
                "Date": "18-09-1999",
                "User ID": getRandomElement(userDetails),
                "Details": "Details"
            };
            dataArray.push(data);
        }

        const payload1 = {
            "Row": 1,
            "Style": "mes017",
            "Version": "AA",
            "Metal": "9K Rose",
            "RingSize": "10",
            "Quality": "VS2GH",
            "CenterSize": "2",
            "CenterQuality": "SI2GH",
            "CustomerCenter": "No",
            "Center": "Yes",
            "Image": "",
            "Note": "Rachit Saksena",
            "WebOrderID": 1708089591343,
            "Date": "18-09-2023"
        }
        const payload2 = {
            "Row": 1,
            "Style": "mes020",
            "Version": "AB",
            "Metal": "18K White",
            "RingSize": "9",
            "Quality": "VS2GH",
            "CenterSize": "3",
            "CenterQuality": "SI2GH",
            "CustomerCenter": "No",
            "Center": "Yes",
            "Image": "",
            "Note": "Rachit Saksena",
            "WebOrderID": 1708089595432,
            "Date": "19-09-2023"
        }
        const payload3 = {
            "Row": 1,
            "Style": "mes025",
            "Version": "Abb",
            "Metal": "22K Yellow",
            "RingSize": "11",
            "Quality": "VS2GH",
            "CenterSize": "2",
            "CenterQuality": "SI2GH",
            "CustomerCenter": "No",
            "Center": "Yes",
            "Image": "",
            "Note": "Rachit Saksena",
            "WebOrderID": 1708089591985,
            "Date": "20-09-2023"
        }
        const payload4 = {
            "Row": 1,
            "Style": "mes050",
            "Version": "CAA",
            "Metal": "18K White",
            "RingSize": "12",
            "Quality": "VS2GH",
            "CenterSize": "3",
            "CenterQuality": "SI2GH",
            "CustomerCenter": "No",
            "Center": "Yes",
            "Image": "",
            "Note": "Rachit Saksena",
            "WebOrderID": 1708089591093,
            "Date": "21-09-2023"
        }
        Ldata.push(payload1);
        Ldata.push(payload2);
        Ldata.push(payload3);
        Ldata.push(payload4);

        setLpayload(Ldata);

        setJsonData(dataArray);

        const archieve = {
            "success": true,
            "data_trans": [
                {
                    "INVOICEID": "INV-100044",
                    "ITEMID": "WRECB1210T",
                    "INVENTTRANSID": "ILI-2834981",
                    "INVOICEDATE": "2021-05-05T00:00:00",
                    "LINEAMOUNT": 1820.0,
                    "QTY": 1.0,
                    "SALESPRICE": 1820.0,
                    "XTGTAGGEDCARATWT": "150",
                    "SALESID": "SO184426",
                    "CONFIGID": "6.00_00356747BM",
                    "CONFIGNAME": "150/18WP\"/6/\"ALL dia EC C\"\"",
                    "CENTERSTONEWEIGHT": 0.0,
                    "CENTERSTONEQUALITY": "",
                    "TAGGEDCARATWT": "150",
                    "TOTSTONEWEIGHT": 1.5,
                    "STONECONTENTS": 1.5,
                    "METALDESC": "18WP\"\"",
                    "CENTERSTONESHAPE": "",
                    "ITEMNAME": "0.10ct Emerald East west 3/4 way Ring Without Gallery"
                },
                {
                    "INVOICEID": "INV-100045",
                    "ITEMID": "ME1733",
                    "INVENTTRANSID": "ILI-2814645",
                    "INVOICEDATE": "2021-05-05T00:00:00",
                    "LINEAMOUNT": 635.0,
                    "QTY": 1.0,
                    "SALESPRICE": 635.0,
                    "XTGTAGGEDCARATWT": "203",
                    "SALESID": "SO183329",
                    "CONFIGID": "6.00_00280375BM",
                    "CONFIGNAME": "203/Z_RD/14W\"/6/\"ALL dia RD C\"/No\"RD\"4/NoADJ\"",
                    "CENTERSTONEWEIGHT": 2.0,
                    "CENTERSTONEQUALITY": "Z",
                    "TAGGEDCARATWT": "203",
                    "TOTSTONEWEIGHT": 0.03,
                    "STONECONTENTS": 2.03,
                    "METALDESC": "14W\"\"",
                    "CENTERSTONESHAPE": "RD",
                    "ITEMNAME": "4 RD ENGAGEMENT RING"
                },
                {
                    "INVOICEID": "INV-100045",
                    "ITEMID": "ME1754",
                    "INVENTTRANSID": "ILI-2814646",
                    "INVOICEDATE": "2021-05-05T00:00:00",
                    "LINEAMOUNT": 520.0,
                    "QTY": 1.0,
                    "SALESPRICE": 520.0,
                    "XTGTAGGEDCARATWT": "110",
                    "SALESID": "SO183329",
                    "CONFIGID": "6.00_00242870BM",
                    "CONFIGNAME": "110/Z_RD/14W\"/6/\"ALL dia RD C\"/No\"RD\"10/NoADJ\"",
                    "CENTERSTONEWEIGHT": 1.0,
                    "CENTERSTONEQUALITY": "Z",
                    "TAGGEDCARATWT": "110",
                    "TOTSTONEWEIGHT": 0.104,
                    "STONECONTENTS": 1.104,
                    "METALDESC": "14W\"\"",
                    "CENTERSTONESHAPE": "RD",
                    "ITEMNAME": "RD CTR OF ME1712"
                },
                {
                    "INVOICEID": "INV-100045",
                    "ITEMID": "ME1754",
                    "INVENTTRANSID": "ILI-2814648",
                    "INVOICEDATE": "2021-05-05T00:00:00",
                    "LINEAMOUNT": 520.0,
                    "QTY": 1.0,
                    "SALESPRICE": 520.0,
                    "XTGTAGGEDCARATWT": "110",
                    "SALESID": "SO183329",
                    "CONFIGID": "6.00_00243256BM",
                    "CONFIGNAME": "110/Z_RD/14R\"/6/\"ALL dia RD C\"/No\"RD\"10/NoADJ\"",
                    "CENTERSTONEWEIGHT": 1.0,
                    "CENTERSTONEQUALITY": "Z",
                    "TAGGEDCARATWT": "110",
                    "TOTSTONEWEIGHT": 0.104,
                    "STONECONTENTS": 1.104,
                    "METALDESC": "14R\"\"",
                    "CENTERSTONESHAPE": "RD",
                    "ITEMNAME": "RD CTR OF ME1712"
                },
                {
                    "INVOICEID": "INV-100045",
                    "ITEMID": "ME1754",
                    "INVENTTRANSID": "ILI-2814649",
                    "INVOICEDATE": "2021-05-05T00:00:00",
                    "LINEAMOUNT": 520.0,
                    "QTY": 1.0,
                    "SALESPRICE": 520.0,
                    "XTGTAGGEDCARATWT": "110",
                    "SALESID": "SO183329",
                    "CONFIGID": "6.00_00243257BM",
                    "CONFIGNAME": "110/Z_RD/14Y\"/6/\"ALL dia RD C\"/No\"RD\"10/NoADJ\"",
                    "CENTERSTONEWEIGHT": 1.0,
                    "CENTERSTONEQUALITY": "Z",
                    "TAGGEDCARATWT": "110",
                    "TOTSTONEWEIGHT": 0.104,
                    "STONECONTENTS": 1.104,
                    "METALDESC": "14Y\"\"",
                    "CENTERSTONESHAPE": "RD",
                    "ITEMNAME": "RD CTR OF ME1712"
                },
                {
                    "INVOICEID": "INV-100045",
                    "ITEMID": "ME1754",
                    "INVENTTRANSID": "ILI-2814650",
                    "INVOICEDATE": "2021-05-05T00:00:00",
                    "LINEAMOUNT": 500.0,
                    "QTY": 1.0,
                    "SALESPRICE": 500.0,
                    "XTGTAGGEDCARATWT": "85",
                    "SALESID": "SO183329",
                    "CONFIGID": "6.00_00243255BM",
                    "CONFIGNAME": "85/Z_RD/14R\"/6/\"ALL dia RD C\"/No\"RD\"10/NoADJ\"",
                    "CENTERSTONEWEIGHT": 0.75,
                    "CENTERSTONEQUALITY": "Z",
                    "TAGGEDCARATWT": "85",
                    "TOTSTONEWEIGHT": 0.104,
                    "STONECONTENTS": 0.85,
                    "METALDESC": "14R\"\"",
                    "CENTERSTONESHAPE": "RD",
                    "ITEMNAME": "RD CTR OF ME1712"
                }
            ]
        }

        setDataTrans(archieve.data_trans);
    }, []);

    console.log('Lpayload', Lpayload);

    const handleCreateOrderClick = () => {
        window.open('/orders/create', '_blank');
    };

    return (
        <div className='flex overflow-auto'>
            <aside className='w-10'>
                <h1 className='mb-20 text-5xl text-center mt-10' style={{ color: '#343434' }}>Menu</h1>
                <h2 className='mb-20 text-3xl text-center mt-10' style={{ color: '#343434' }}>Hi, {props.customerName ? props.customerName : props.customerEmail}</h2>
                {/* <button type="button" class="btn btn-light" onClick={handleCreateOrderClick} style={{ marginBottom: '30%', fontSize: '20px', marginLeft: '10%', color: '#343434' }}>Create New Order</button> */}
                <button className="button-91" role="button" onClick={handleCreateOrderClick} style={{ marginBottom: '30%', fontSize: '20px', marginLeft: '10%', color: '#343434' }}>Create New Order</button>
                <a className={activeContent === 'Orders' ? 'active' : ''} href="#" onClick={() => handleSidebarClick('Orders')} style={{ fontSize: '20px', marginBottom: '10%' }}>
                    {/* <i className="fa-regular fa-user"></i> */}
                    <img src={orders} style={{ width: '40px', height: '40px', marginRight: '5%' }} alt=""/>
                    Orders
                </a>
                <a className={activeContent === 'WebOrders' ? 'active' : ''} href="#" onClick={() => handleSidebarClick('WebOrders')} style={{ fontSize: '20px', marginBottom: '10%' }}>
                    {/* <i class="fa-solid fa-truck"></i> */}
                    <img src={truck} style={{ width: '40px', height: '40px', marginRight: '5%' }} />
                    WebOrders
                </a>
                <a className={activeContent === 'Invoice' ? 'active' : ''} href="#" onClick={() => handleSidebarClick('Invoice')} style={{ fontSize: '20px', marginBottom: '10%' }}>
                    {/* <i className="fa-regular fa-file-lines"></i> */}
                    <img src={invoice} style={{ width: '40px', height: '40px', marginRight: '5%' }} />
                    Invoice
                </a>
                <a className={activeContent === 'Archived Invoices' ? 'active' : ''} href="#" onClick={() => handleSidebarClick('Archived Invoices')} style={{ fontSize: '20px', marginBottom: '10%' }}>
                    {/* <i class="fa-solid fa-box-archive"></i> */}
                    <img src={archive} style={{ width: '40px', height: '40px', marginRight: '5%' }} />
                    Archived Invoices
                </a>
                <a className={activeContent === 'Quotation' ? 'active' : ''} href="#" onClick={() => handleSidebarClick('Quotation')} style={{ fontSize: '20px', marginBottom: '10%' }}>
                    {/* <i className="fa fa-clone" aria-hidden="true"></i> */}
                    <img src={quote} style={{ width: '40px', height: '40px', marginRight: '5%' }} />
                    Quotation
                </a>
            </aside>
            {/* </div> */}
            <div className='ml-20' id="matter" style={{ display: 'inline-table',minWidth:'100%' ,gridTemplateColumns: '1fr 2fr'}}>
                {activeContent === 'Orders' && <OrderContent data={jsonData} />}
                {activeContent === 'Invoice' && <InvoiceContent data={jsonData} />}
                {activeContent === 'Quotation'}
                {activeContent === 'Archived Invoices' && <ArchivedContent data={dataTrans} />}
                {activeContent === 'WebOrders' && <WebOrderContent data={Lpayload} />}
            </div>
        </div>
    );
}

export default Table_with_data;