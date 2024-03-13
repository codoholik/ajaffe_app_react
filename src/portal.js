import './portal.css';
import React from 'react';
import './Styles/aside.css'
import './Styles/index.css'
import './Styles/Table.css'
import './Styles/SearchBar.css'
import TableContent from './Components/TableContent'


function Portal() {
  return (
      <React.Fragment>
        <TableContent customerEmail={'rachitsaksena009@gmail.com'} customerName={'Rachit Saksena'} />
      </React.Fragment>
  )
}

export default Portal;
