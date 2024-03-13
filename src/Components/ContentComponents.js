import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar'
import Cart from './Cart';

function OrdersContent(props) {

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
            <SearchBar onSearch={handleSearch} searchCriteria={{ searchOption: searchOption, searchText: searchText, status: status }} showStatusDropdown={true} showOrderParam={true} />

            <Cart selectedItems={selectedItems} />
            <div className="content Orders active">
                <h2 style={{ marginBottom: '5%' }}>Your past orders with us ....</h2>
                <table id="ordersTable">
                    <thead>
                        <tr>
                            <th scope="col">Buy Again</th>
                            <th scope="col">Order</th>
                            <th scope="col">Item ID</th>
                            <th scope="col">Status</th>
                            <th scope="col" style={{ width: '15%' }}>Config Name</th>
                            <th scope="col">Customer ID</th>
                            <th scope="col">Customer PO #</th>
                            <th scope="col">Customer Reference</th>
                            <th scope="col">Sales Group</th>
                            <th scope="col">Ordered By</th>
                            <th scope="col">Center Shape</th>
                            <th scope="col">Metal</th>
                            <th scope="col">Date</th>
                            <th scope="col">User ID</th>
                            <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleData.map((item, index) => (
                            <tr key={index}>
                                {/* <td>{item["Buy Again"].toString()}</td> */}
                                {/* <input type="checkbox" checked={item["Buy Again"]} onChange={() => handleBuyAgain(item)}/> */}
                                <td className="center-checkbox" style={{ varticalAlign: 'middle', textAlign: 'center' }}>
                                    <input className="form-check-input" style={{ width: '40%', height: '2.5vh' }} type="checkbox" onChange={() => handleBuyAgain(item)} />
                                </td>
                                <td>{item["Order"]}</td>
                                <td>{item["Item ID"]}</td>
                                <td>{item["Status"]}</td>
                                <td>{item["Config Name"]}</td>
                                <td>{item["Customer ID"]}</td>
                                <td>{item["Customer PO #"]}</td>
                                <td>{item["Customer Reference"]}</td>
                                <td>{item["Sales Group"]}</td>
                                <td>{item["Ordered By"]}</td>
                                <td>{item["Center Shape"]}</td>
                                <td>{item["Metal"]}</td>
                                <td>{item["Date"]}</td>
                                <td>{item["User ID"]}</td>
                                <td>{item["Details"]}</td>
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

function InvoiceContent(props) {

    const [visibleData, setVisibleData] = useState([]);
    const [entriesToShow, setEntriesToShow] = useState(5);
    const [selectedItems, setSelectedItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const data = props.data;

    // Function to handle "Load More" button click
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
    };

    useEffect(() => {
        const filteredData = props.data.filter(item => {
            return (
                ((item["Item ID"] && item["Item ID"].toString().includes(searchText || '')) &&
                    (item["Status"] && item["Status"].toLowerCase().includes((status || '').toLowerCase()))) ||

                ((item["Customer PO #"] && item["Customer PO #"].toString() === searchText) &&
                    (item["Status"] && item["Status"].toLowerCase().includes((status || '').toLowerCase())))
                // Add more conditions as needed
            );
        });

        // if (searchOption === 'All' && searchText === null || status === 'Status') {
        //     setVisibleData(data.slice(0, entriesToShow));
        // }

        // else {
        //     setVisibleData(filteredData);
        // }
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
            <SearchBar onSearch={handleSearch} searchCriteria={{ searchOption: searchOption, searchText: searchText, status: status }} showARBAndSalesType={true} showOrderParam={true} />
            <Cart selectedItems={selectedItems} />
            <div className="content Invoice active">
                <h2 style={{ marginBottom: '5%' }}>Your Available Invoice Data...</h2>

                <table id="invoiceTable">
                    <thead>
                        <tr>
                            <th scope="col">Buy Again</th>
                            <th scope="col">Order</th>
                            <th scope="col">Item ID</th>
                            <th scope="col" style={{ Width: '15%' }}>Config Name</th>
                            <th scope="col">Customer ID</th>
                            <th scope="col">Customer PO #</th>
                            <th scope="col">Customer Reference</th>
                            <th scope="col">Sales Group</th>
                            <th scope="col">Ordered By</th>
                            <th scope="col">Invoice ID</th>
                            <th scope="col">Invoice Date</th>
                            <th scope="col">Center Shape</th>
                            <th scope="col">Metal</th>
                            <th scope="col">Date</th>
                            <th scope="col">User ID</th>
                            <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleData.map((item, index) => (
                            <tr key={index}>
                                <td className="center-checkbox" style={{ varticalAlign: 'middle', textAlign: 'center' }}>
                                    <input className="form-check-input" style={{ width: '50%', height: '2.5vh' }} type="checkbox" onChange={() => handleBuyAgain(item)} />
                                </td>
                                <td>{item["Order"]}</td>
                                <td>{item["Item ID"]}</td>
                                <td>{item["Config Name"]}</td>
                                <td>{item["Customer ID"]}</td>
                                <td>{item["Customer PO #"]}</td>
                                <td>{item["Customer Reference"]}</td>
                                <td>{item["Sales Group"]}</td>
                                <td>{item["Ordered By"]}</td>
                                <td>{item["Invoice ID"]}</td>
                                <td>{item["Invoice Date"]}</td>
                                <td>{item["Center Shape"]}</td>
                                <td>{item["Metal"]}</td>
                                <td>{item["Date"]}</td>
                                <td>{item["User ID"]}</td>
                                <td>{item["Details"]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* <div id="loadMoreBtn" style={{ width: 'fit-content', display: entriesToShow >= data.length ? 'none' : 'block' }}>
                    <button className="btn btn-secondary" onClick={handleLoadMore}>Load More</button>
                </div> */}
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

function WebOrderContent(props) {
    const [visibleData, setVisibleData] = useState([]);
    const [entriesToShow, setEntriesToShow] = useState(5);
    const [selectedItems, setSelectedItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const data = props.data;

    // Function to handle "Load More" button click
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
    };

    useEffect(() => {
        const filteredData = props.data.filter(item => {
            return (
                ((item["Item ID"] && item["Item ID"].toString().includes(searchText || '')) &&
                    (item["Status"] && item["Status"].toLowerCase().includes((status || '').toLowerCase()))) ||

                (item["Status"] && item["Status"].toLowerCase().includes((status || '').toLowerCase())) ||

                ((item["Customer PO #"] && item["Customer PO #"].toString() === searchText) &&
                    (item["Status"] && item["Status"].toLowerCase().includes((status || '').toLowerCase())))
                // Add more conditions as needed
            );
        });

        // if (searchOption === 'All' && searchText === null || status === 'Status') {
        //     setVisibleData(data.slice(0, entriesToShow));
        // }

        // else {
        //     setVisibleData(filteredData);
        // }
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
            <SearchBar onSearch={handleSearch} searchCriteria={{ searchOption: searchOption, searchText: searchText, status: status }} showWebOrderParam={true} />
            <Cart selectedItems={selectedItems} />
            <div className="content Invoice active">
                <h2 style={{ marginBottom: '5%' }}>Your WebOrders...</h2>

                <table id="invoiceTable">
                    <thead>
                        <tr>
                            <th scope="col">Buy Again</th>
                            <th scope="col">WebOrderID</th>
                            <th scope="col">Style</th>
                            <th scope="col">Metal</th>
                            <th scope="col">Version</th>
                            <th scope="col">Ring Size</th>
                            <th scope="col">Quality</th>
                            <th scope="col">Center Size</th>
                            <th scope="col">Center Quality</th>
                            <th scope="col">Customer Center</th>
                            <th scope="col">Center</th>
                            <th scope="col">Images</th>
                            <th scope="col">Notes</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleData.map((item, index) => (
                            <tr key={index}>
                                <td className="center-checkbox" style={{ varticalAlign: 'middle', textAlign: 'center' }}>
                                    <input className="form-check-input" style={{ width: '50%', height: '2.5vh' }} type="checkbox" onChange={() => handleBuyAgain(item)} />
                                </td>
                                <td>{item["Order"]}</td>
                                <td>{item["Item ID"]}</td>
                                <td>{item["Config Name"]}</td>
                                <td>{item["Customer ID"]}</td>
                                <td>{item["Customer PO #"]}</td>
                                <td>{item["Customer Reference"]}</td>
                                <td>{item["Sales Group"]}</td>
                                <td>{item["Ordered By"]}</td>
                                <td>{item["Invoice ID"]}</td>
                                <td>{item["Invoice Date"]}</td>
                                <td>{item["Center Shape"]}</td>
                                <td>{item["Metal"]}</td>
                                <td>{item["Date"]}</td>
                                <td>{item["User ID"]}</td>
                                <td>{item["Details"]}</td>
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

export { OrdersContent, InvoiceContent, WebOrderContent };