import React, { useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import SingleOrderSummary from './SingleOrderSummary'
import { Link } from 'react-router-dom'
import './OrderHome.css'
const OrderHome = ({ auth, orders }) => {

  return (
    <div className="orders">
        <Link to="/">Back to Home</Link>
      <h2 className='header'>Order History</h2>
      {orders.length > 0 && 
        (
          orders.map((order, index) => (
            <SingleOrderSummary key={index} order={order} />
          ))
        )
      } 
      {
       orders.length < 1 && <p>Sorry, you don't have any orders.</p>   
      }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
    let orders = []

  let uid = state.firebase.auth.uid
  if (state.firestore.ordered.orders && uid) {
    orders = state.firestore.ordered.orders.filter(order => order.userId === uid).map(order => ({
        ...order, 
        vendor: state.firestore.ordered.vendors.find(e => e.id === order.vendorId)
        }))
}
  return {
    orders: orders,
    auth: state.firebase.auth,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(() => ['vendors', 'orders'])
)(OrderHome)
