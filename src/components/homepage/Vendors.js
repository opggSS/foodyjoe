import React from 'react'
import { Link } from 'react-router-dom'
import { SingleVendorData } from '../../datas'

export default function Vendors() {
  return (
    <div className="vendors">
      <Link to={`/vendor/${SingleVendorData.id}`}>
        <img src={SingleVendorData.logo} alt={SingleVendorData.name} width="100%" />
        <div className="vendorName">
          {SingleVendorData.name}
          <div>about 1km</div>
        </div>
        <div className="deliveryFee">Devlivery Fee ${SingleVendorData.delivery_fee}+</div>
      </Link>
    </div>

  )
}