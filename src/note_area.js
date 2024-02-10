import React, { useState, useEffect } from 'react';

const NoteTextArea = (props) => {
    const collapseId = props.rowId;
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [localInputValue, setLocalInputValue] = useState('');

    useEffect(() => {
        setLocalInputValue(props.value || '');
    }, [props.noteInputValue]);

    const handleAddNote = (e) => {
        setIsCollapsed(true);
        props.onChange(collapseId, localInputValue);
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setLocalInputValue(inputValue);
        props.onChange(collapseId, inputValue);
    };

    const handleToggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div id={collapseId}>
            <button type="button" className="btn btn-sm d-inline-flex gap-1" onClick={handleToggleCollapse}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                </svg>
                {isCollapsed ? 'Add Note' : ''}
            </button>
            {!isCollapsed && (
                <div className='my-2 mx-2'>
                    <textarea
                        rows="4"
                        cols="20"
                        placeholder="Enter your note here..."
                        value={localInputValue}
                        onChange={handleInputChange}
                    />
                    <br />
                    <button className="btn btn-secondary d-inline-flex gap-1" onClick={handleAddNote} >Add Note</button>
                </div>
            )}
        </div>
    );
};

export default NoteTextArea;
