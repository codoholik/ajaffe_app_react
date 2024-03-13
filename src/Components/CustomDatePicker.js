import React, { useState } from 'react'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function CustomDatePicker() {

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const [selectedRange, setSelectedRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const handleSelect = (ranges) => {
        setSelectedRange([ranges.selection]);
    };

    const handleToggleDatePicker = () => {
        setIsDatePickerOpen(!isDatePickerOpen);
    };

    return (
        <React.Fragment>
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Duration
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">30 Days</a></li>
                    <li><a class="dropdown-item" href="#">90 Days</a></li>
                    <li><a className="dropdown-item" href="#" onClick={handleToggleDatePicker}>Select Your Range</a></li>
                </ul>
            </div>
            {/* <DatePicker selected={selectedDate} onChange={handleChange} /> */}
            {isDatePickerOpen && (
                <div>
                    <DateRangePicker
                        ranges={selectedRange}
                        onChange={handleSelect}
                        showSelectionPreview={false}
                    />
                </div>
            )}
        </React.Fragment>
    )
}
