import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar'
import Cart from './Cart';

export default function WebOrderContent(props) {
    const [visibleData, setVisibleData] = useState([]);
    const [entriesToShow, setEntriesToShow] = useState(5);
    const [selectedItems, setSelectedItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const data = props.data;

    // Function to handle "Load More" button click
    // const handleLoadMore = () => {
    //     setEntriesToShow(prev => {
    //         const newEntriesToShow = prev + 5;
    //         if (newEntriesToShow >= data.length) {
    //             return data.length;
    //         } else {
    //             return newEntriesToShow;
    //         }
    //     });
    // };

    // Function to handle "Buy Again" button click
    //Finction to save details of row whoose buy again button is pressed
    const saveSelectedItemsAsJSON = () => {
        const jsonSelectedItems = JSON.stringify(selectedItems);
        console.log("Selected Items JSON:", jsonSelectedItems);
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
        saveSelectedItemsAsJSON();
    };


    const [searchOption, setSearchOption] = useState('All');
    const [searchText, setSearchText] = useState('');
    const [status, setStatus] = useState('Status');

    const handleSearch = (option, text, status) => {
        setSearchOption(option);
        setSearchText(text);
        setStatus(status);
    };

    useEffect(() => {
        //Filter and slice functions only work for arrays
        const filteredData = props.data.filter(item => {
            return (
                ((item["Style"] && item["Style"].toString().includes(searchText || '')) &&
                    (item["Status"] && item["Status"].toLowerCase().includes((status || '').toLowerCase()))) ||

                ((item["WebOrderID"] && item["WebOrderID"].toString() === searchText) &&
                    (item["Status"] && item["Status"].toLowerCase().includes((status || '').toLowerCase())))
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

            <SearchBar onSearch={handleSearch} searchCriteria={{ searchOption: searchOption, searchText: searchText, status: status }} showWebOrderParam={true} />
            <Cart selectedItems={selectedItems} />
            <div className="ContentWebOrderActive">
                <h2 className='mb-10 ml-10 text-4xl'>Your WebOrders...</h2>

                <table className='portal-table' id="invoiceTable">
                    <thead>
                        <tr className="portal-tr">
                            <th className="portal-th" scope="col">Buy Again</th>
                            <th className="portal-th" scope="col">WebOrderID</th>
                            <th className="portal-th" scope="col">Style</th>
                            <th className="portal-th" scope="col">Metal</th>
                            <th className="portal-th" scope="col">Version</th>
                            <th className="portal-th" scope="col">Ring Size</th>
                            <th className="portal-th" scope="col">Quality</th>
                            <th className="portal-th" scope="col">Center Size</th>
                            <th className="portal-th" scope="col">Center Quality</th>
                            <th className="portal-th" scope="col">Customer Center</th>
                            <th className="portal-th" scope="col">Center</th>
                            <th className="portal-th" scope="col">Images</th>
                            <th className="portal-th" scope="col">Notes</th>
                            <th className="portal-th" scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleData.map((item, index) => (
                            <tr key={index}>
                                <td className="center-checkbox portal-td" style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                    <input className="form-check-input" style={{ width: '50%', height: '2.5vh' }} type="checkbox" onChange={() => handleBuyAgain(item)} />
                                </td>
                                <td className="portal-td">{item.WebOrderID}</td>
                                <td className="portal-td">{item.Style}</td>
                                <td className="portal-td">{item.Metal}</td>
                                <td className="portal-td">{item.Version}</td>
                                <td className="portal-td">{item.RingSize}</td>
                                <td className="portal-td">{item.Quality}</td>
                                <td className="portal-td">{item.CenterSize}</td>
                                <td className="portal-td">{item.CenterQuality}</td>
                                <td className="portal-td">{item.CustomerCenter}</td>
                                <td className="portal-td">{item.Center}</td>
                                <td className="portal-td">{item.Image}</td>
                                <td className="portal-td">{item.Note}</td>
                                <td className="portal-td">{item.Date}</td>
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