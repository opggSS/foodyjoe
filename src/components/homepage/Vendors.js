import React from 'react'
import { Link } from 'react-router-dom'
// import { SingleVendorData } from '../../datas'
import { connect } from 'react-redux'
const Vendors = ({ vendors }) => {
  console.log(vendors)
  return (
  
    vendors ? vendors.map((vendor, index) => (
      <div key={index} className="vendors">
        <Link to={`/vendor/${vendor.id}`}>
          <img src={vendor.logo} alt={vendor.name} width="100%" />
          <div className="vendorName">
            {vendor.name}
            <div>{/*about 1km*/}</div>
          </div>
          <div className="deliveryFee">Devlivery Fee ${vendor.delivery_fee}+</div>
        </Link>
      </div>
    )) : 
    <div>loading...</div>
  )

}

const mapStateToProps = (state) => {
  return {
    vendors: state.vendors.length > 0 ? state.vendors :null
  }
}

export default connect(mapStateToProps)(Vendors)