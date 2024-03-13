import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar'
import Cart from './Cart';

export default function OrdersContent(props) {

    const [visibleData, setVisibleData] = useState([]);
    const [entriesToShow, setEntriesToShow] = useState(5);
    const [selectedItems, setSelectedItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const data = props.data;
    console.log("ordersTable11 : ", data);

    const handleLoadMore = () => {
        setEntriesToShow(prev => {
            const newEntriesToShow = prev + 5;
            if (newEntriesToShow >= data.length) {
                return data.length;
            } else {
                return newEntriesToShow;
            }
        });
    };

    // Function to handle "Buy Again" button click

    //Finction to save details of row whoose buy again button is pressed
    const saveSelectedItemsAsJSON = () => {
        const jsonSelectedItems = JSON.stringify(selectedItems);
        console.log("Selected Items JSON:", jsonSelectedItems);
        // Now you can use jsonSelectedItems as needed (e.g., send it to the server, store it in local storage, etc.)
    };

    const handleBuyAgain = (item) => {
        console.log("Buy Again clicked for item:", item);
        // setSelectedItems(prevItems => [...prevItems, item]);
        const selectedIndex = selectedItems.findIndex(selectedItem => selectedItem === item);
        if (selectedIndex === -1) {
            setSelectedItems(prevItems => [...prevItems, item]);
        } else {
            setSelectedItems(prevItems => prevItems.filter(selectedItem => selectedItem !== item));
        }
        saveSelectedItemsAsJSON(); //Create JSON with the selected rows with Buy Again
    };

    const [searchOption, setSearchOption] = useState('All');
    const [searchText, setSearchText] = useState('');
    const [status, setStatus] = useState('Status');

    // Function to handle search
    const handleSearch = (option, text, status) => {
        setSearchOption(option);
        setSearchText(text);
        setStatus(status);
        console.log("Search criteria:", { option, text, status });
        console.log("Search criteria_WHole:", { searchOption, searchText, status });

    };

    useEffect(() => {
        const filteredData = data.filter(item => {
            return (
                (((item["Item ID"] && item["Item ID"].toString().includes(searchText || ''))) &&
                    ((item["Status"] && item["Status"].toLowerCase().includes((status || '').toLowerCase())))) ||

                // (((item["Item ID"] && item["Item ID"].toString().includes(searchText || '')))) ||

                (((item["Customer PO #"] && item["Customer PO #"].toString() === searchText)) &&
                    ((item["Status"] && item["Status"].toLowerCase().includes((status || '').toLowerCase()))))

                // (((item["Customer PO #"] && item["Customer PO #"].toString().includes(searchText || ''))))  

                // (((item["Order"] && item["Order"].toString() === searchText)) &&
                //     ((item["Status"] && item["Status"].toLowerCase().includes((status || '').toLowerCase())))) ||

                // (((item["Order"] && item["Order"].toString().includes(searchText || ''))))
                // Add more conditions as needed
            );
        });

        // Removed status === 'Status' because its not working without status
        // if (searchOption === 'All' && searchText === null || status === 'Status') {
        //     setVisibleData(data.slice(0, entriesToShow));
        // }

        // else {
        //     setVisibleData(filteredData);
        console.log("Filtered Data Length:", filteredData.length);

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        console.log("Index of Last Item:", indexOfLastItem);
        console.log("Index of First Item:", indexOfFirstItem);

        let currentVisibleData;
        if (searchOption === 'All' && searchText === '' || status === 'Status') {
            currentVisibleData = data.slice(indexOfFirstItem, indexOfLastItem);
        } else {
            currentVisibleData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
        }

        console.log("Current Visible Data:", currentVisibleData);

        setVisibleData(currentVisibleData);
    }, [data, searchText, status, currentPage, itemsPerPage]);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <React.Fragment>
            <h1
                style={{
                    fontFamily: 'Lato-Light',
                    fontfStyle: 'normal',
                    fontWeight: '400',
                    WebkitFontSmoothing: 'antialiased',
                    marginLeft : '35%',
                    fontSize: '60px'
                }}>
                A.JAFFE
            </h1>
            <h1 style={{
                marginWidth: 'auto',
                marginLeft : '39%',
                display: 'flex',
                fontSize: '12px'
            }}>EST. 1892
                NEW YORK</h1>

            <SearchBar onSearch={handleSearch} searchCriteria={{ searchOption: searchOption, searchText: searchText, status: status }} showStatusDropdown={true} showOrderParam={true} />

            <Cart selectedItems={selectedItems} />
            <div className="ContentOrderActive">
                <h2 className='mb-10 ml-10 text-4xl'>Your past orders with us ....</h2>
                <table className='portal-table' id="ordersTable">
                    <thead>
                        <tr className='portal-tr'>
                            <th className="portal-th" scope="col">Buy Again</th>
                            <th className="portal-th" scope="col">Order</th>
                            <th className="portal-th" scope="col">Item ID</th>
                            <th className="portal-th" scope="col">Status</th>
                            <th className="portal-th w-60" scope="col">Config Name</th>
                            <th className="portal-th" scope="col">Customer ID</th>
                            <th className="portal-th" scope="col">Customer PO #</th>
                            <th className="portal-th" scope="col">Customer Reference</th>
                            <th className="portal-th" scope="col">Sales Group</th>
                            <th className="portal-th" scope="col">Ordered By</th>
                            <th className="portal-th" scope="col">Center Shape</th>
                            <th className="portal-th" scope="col">Metal</th>
                            <th className="portal-th" scope="col">Date</th>
                            <th className="portal-th" scope="col">User ID</th>
                            <th className="portal-th" scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleData.map((item, index) => (
                            <tr key={index} className='portal-tr'>
                                {/* <td>{item["Buy Again"].toString()}</td> */}
                                {/* <input type="checkbox" checked={item["Buy Again"]} onChange={() => handleBuyAgain(item)}/> */}
                                <td className="center-checkbox portal-td" style={{ varticalAlign: 'middle', textAlign: 'center' }}>
                                    <input className="form-check-input" style={{ width: '40%', height: '2.5vh' }} type="checkbox" onChange={() => handleBuyAgain(item)} />
                                </td>
                                <td className="portal-td">{item["Order"]}</td>
                                <td className="portal-td">{item["Item ID"]}</td>
                                <td className="portal-td">{item["Status"]}</td>
                                <td className="portal-td">{item["Config Name"]}</td>
                                <td className="portal-td">{item["Customer ID"]}</td>
                                <td className="portal-td">{item["Customer PO #"]}</td>
                                <td className="portal-td">{item["Customer Reference"]}</td>
                                <td className="portal-td">{item["Sales Group"]}</td>
                                <td className="portal-td">{item["Ordered By"]}</td>
                                <td className="portal-td">{item["Center Shape"]}</td>
                                <td className="portal-td">{item["Metal"]}</td>
                                <td className="portal-td">{item["Date"]}</td>
                                <td className="portal-td">{item["User ID"]}</td>
                                <td className="portal-td">{item["Details"]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    {data.length > itemsPerPage && (
                        <div className="pagination-buttons" style={{ display: 'inline-block', marginLeft: '45%' }}>
                            {[...Array(Math.ceil(data.length / itemsPerPage))].map((_, index) => (
                                <button key={index} className={`btn ${currentPage === index + 1 ? 'active' : ''}`} onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
}