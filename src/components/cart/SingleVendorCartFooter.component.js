import React from 'react'
import { Link } from 'react-router-dom'

export default function SingleVendorCartFooter({ totalPrice, vendorId }) {
  return (
    <div className='singleVendorCartFooter'>
      <span className='singleCartFooterPrice'>$ {totalPrice}</span>
      <Link to={`/checkout/${vendorId}`}>
        <div className='singleCartFooterCheckOut'>Check Out</div>
      </Link>
    </div>
  )
}
