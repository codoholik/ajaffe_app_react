import React from 'react'
import cart from '../images/shopping-cart_3750627.png'

export default function Cart(props) {
    return (
        <React.Fragment>
            <div style={{ position: 'relative' }}>
            <span className='w-20 flex flex-wrap' style={{ position: 'absolute', right: '10px', backgroundColor: 'white', color: 'black', borderRadius: '50%', padding: '5px', marginRight: '10px' }}>
                    {/* <i class="fa-solid fa-cart-shopping" style={{fontSize : '27px'}}></i> */}
                    {/* {props.selectedItems.length} */}
                    <img src={cart} style={{width : '40px', height : '40px'}} />
                    <span style={{ marginLeft: '10px', fontSize: '27px' }}>{props.selectedItems.length}</span> {/* Counter */}
                </span>
            </div>
        </React.Fragment>
    )
}
