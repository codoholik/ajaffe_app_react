import React, { useState } from 'react'
import '../Styles/SearchBar.css'

export default function SearchBar({ onSearch, searchCriteria, showStatusDropdown, showARBAndSalesType, showWebOrderParam, showOrderParam }) {

    const [Status, setStatus] = useState(searchCriteria.status || 'Status');
    const [searchOption, setSearchOption] = useState(searchCriteria.searchOption || 'All');
    const [searchText, setSearchText] = useState(searchCriteria.searchText || '');

    // Function to update the selected search concept
    const handleSearchConceptChange = (value) => {
        setSearchOption(value);
        onSearch(value, searchText, Status);
    };

    // Function to update the selected status
    const handleStatusChange = (value) => {
        setStatus(value);
        onSearch(searchOption, searchText, value);
    };

    // Function to handle changes in the search text
    const handleSearchInputChange = (event) => {
        const value = event.target.value;
        setSearchText(value);
        // Trigger search with the updated search text
        onSearch(searchOption, value, Status);
    };

    const handleSearch = () => {
        const statusToUse = Status === 'Status' ? '' : Status;
        onSearch(searchOption, searchText, statusToUse);
    };

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handle30DaysClick = () => {
        const today = new Date();
        const endDate = today.toISOString().split('T')[0];
        today.setDate(today.getDate() - 30);
        const startDate = today.toISOString().split('T')[0];
        setStartDate(startDate);
        setEndDate(endDate);
    };

    const handle90DaysClick = () => {
        const today = new Date();
        const endDate = today.toISOString().split('T')[0];
        today.setDate(today.getDate() - 90);
        const startDate = today.toISOString().split('T')[0];
        setStartDate(startDate);
        setEndDate(endDate);
    };

    const handleDateChangeStart = (event) => {
        setStartDate(event.target.value);
    };

    const handleDateChangeEnd = (event) => {
        setEndDate(event.target.value);
    };

    return (
        <div className="SearchContainer" style={{ marginBottom: '5%' }}>
            <div className="row mt-10">
                <div className="flex" style={{marginLeft:'20%'}}>
                    {/* <div className="input-group-append"> */}
                    <button className="btn btn-outline-secondary dropdown-toggle" type="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        {searchOption}
                    </button>
                    <ul className="dropdown-menu scrollable-dropdown" role="menu">
                        {showOrderParam && (
                            <>
                                <li><a className="dropdown-item" href="#" onClick={() => handleSearchConceptChange('Item ID')}>Item ID</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => handleSearchConceptChange('Customer No.')}>Customer No.</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => handleSearchConceptChange('Customer PO #')}>Customer PO #</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => handleSearchConceptChange('Sales Order')}>Sales Order #</a></li>
                                {showARBAndSalesType && (
                                    <>
                                        <li><a className="dropdown-item" href="#" onClick={() => handleSearchConceptChange('SalesType')}>SalesType</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={() => handleSearchConceptChange('SalesOrder_ARB_Flag')}>SalesOrder_ARB_Flag</a></li>
                                    </>
                                )}
                            </>
                        )}
                        {showWebOrderParam && (
                            <>
                                <li><a className="dropdown-item" href="#" onClick={() => handleSearchConceptChange('Style')}>Style</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => handleSearchConceptChange('Date')}>Date</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => handleSearchConceptChange('WebOrderID')}>WebOrderID</a></li>
                            </>
                        )}
                    </ul>
                    {/* </div> */}
                    {/* <input className='' type="hidden" name="search_param" value="all" id="search_param" /> */}
                    {/* <input type="text" className="form-control" name="x" id="search" placeholder="Search" onChange={handleSearchInputChange}/> */}
                    <input
                        type="text"
                        className="form-control w-1/3"
                        name="x"
                        id="search"
                        placeholder="Search"
                        onChange={(e) => handleSearchInputChange(e)}
                    />
                    <button className="btn btn-outline-secondary" type="button" onClick={() => handleSearch()}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                    {showStatusDropdown && (
                        <div className="dropdown ml-20">
                            <button id="dropdownButton" className="btn btn-secondary dropdown-toggle" type="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                {Status}
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#"
                                    onClick={() => handleStatusChange('Open Order')}>Open Order</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => handleStatusChange('Invoiced')}>
                                    Invoiced</a></li>
                                <li><a className="dropdown-item" href="#"
                                    onClick={() => handleStatusChange('Cancelled')}>Cancelled</a></li>
                            </ul>
                        </div>
                    )}

                </div>

                <button type="button" style={{ width: '10%', marginLeft: '16%', marginTop: '5%', backgroundColor: '#6c757d', color: 'white' }} onClick={handle30DaysClick} class="btn portal-btn">30 Days</button>

                <button type="button" style={{ width: '10%', marginLeft: '5%', marginTop: '5%', backgroundColor: '#6c757d', color: 'white' }} onClick={handle90DaysClick} class="btn portal-btn">90 Days</button>

                <input type="date" className="form-control" style={{ width: '10%', marginLeft: '5%', marginTop: '5%' }} value={startDate} onChange={handleDateChangeStart} placeholder="Enter a date" />

                <input type="date" className="form-control" style={{ width: '10%', marginLeft: '5%', marginTop: '5%' }} value={endDate} onChange={handleDateChangeEnd} placeholder="Enter a date" />
            </div>
        </div >
    )
}