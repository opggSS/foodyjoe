import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {Link} from 'react-router-dom'

const SingleOrderSummary = ({ order, vendor }) => {
  console.log(vendor)
  console.log(order)
  return (
    <div>
      <img src={vendor.logo} alt="" />
      <Link to={`/orderDetail/${order.id}`}>
        <span className="first"> {vendor.name}</span>
        <span className="second" >X{order.createdAt}</span>
        <span className="third">${order.priceInfo.orderTotal}</span>
      </Link>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {

  
  let vendor = null
  const vendors = state.firestore.ordered.vendors
  console.log(state)
  if(vendors) {
    
    vendor = vendors.find((vendor) => vendor.id === ownProps.order.vendorId)
  }
  return {
    vendor: vendor
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'vendors' }
  ])
)(SingleOrderSummary)

