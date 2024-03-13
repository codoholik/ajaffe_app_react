import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar'
import Cart from './Cart';

export default function ArchivedContent(props) {
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
            <SearchBar onSearch={handleSearch} searchCriteria={{ searchOption: searchOption, searchText: searchText, status: status }} showARBAndSalesType={true} showOrderParam={true} />
            <Cart selectedItems={selectedItems} />
            <div className="content Invoice active">
                <h2 className='mb-10 ml-10 text-4xl'>Your Available Invoice Data...</h2>

                <table className='portal-table' id="invoiceTable">
                    <thead>
                        <tr className="portal-tr">
                            <th className="portal-th" scope="col">Buy Again</th>
                            <th className="portal-th" scope="col">Sales ID</th>
                            <th className="portal-th" scope="col">Item ID</th>
                            <th className="portal-th" scope="col" style={{ Width: '15%' }}>Config Name</th>
                            <th className="portal-th" scope="col">QTY</th>
                            <th className="portal-th" scope="col">Sales Price</th>
                            <th className="portal-th" scope="col">Line Amt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleData.map((item, index) => (
                            <tr key={index} className="portal-tr">
                                <td className="center-checkbox portal-td" style={{ varticalAlign: 'middle', textAlign: 'center' }}>
                                    <input className="form-check-input" style={{ width: '50%', height: '2.5vh' }} type="checkbox" onChange={() => handleBuyAgain(item)} />
                                </td>
                                <td className="portal-td">{item["SALESID"]}</td>
                                <td className="portal-td">{item["ITEMID"]}</td>
                                <td className="portal-td">{item["CONFIGNAME"]}</td>
                                <td className="portal-td">{item["QTY"]}</td>
                                <td className="portal-td">{item["SALESPRICE"]}</td>
                                <td className="portal-td">{item["LINEAMOUNT"]}</td>
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
