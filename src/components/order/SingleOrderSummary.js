import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom'

import './SingleOrderSummary.css'

const SingleOrderSummary = ({ order, vendor , orderId}) => {
  return (
    <div className="flexie">
      <div className="image-container">
        <img src={order.vendor.logo} alt={order.vendor.name} />
      </div>
      <Link to={{
        pathname: `/orderDetail/${orderId}`,
        order: order
      }}>
        <span className="first">Ordered from: {order.vendor.name}</span>
        <span className="second" >Purchased at: {order.createdAt.toDate().toDateString()}</span>
        <span className="third">Order total: ${order.priceInfo.subtotal}</span>
      </Link>
    </div>
  )
}

export default SingleOrderSummary

