import React, { useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import SingleOrderSummary from './SingleOrderSummary'

const OrderHome = ({ auth, orders }) => {

  return (
    <div className="orders">
      <div className='header'>Order History</div>
      {orders.length > 0 && 
        (
          orders.map(order => (
            <SingleOrderSummary order={order} />
          ))
        )
      }

    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  let orders = []

  let uid = state.firebase.auth.uid
  if (state.firestore.ordered.orders && uid) {
    orders = state.firestore.ordered.orders.filter(order => order.userId === uid)
  }
  return {
    orders: orders,
    auth: state.firebase.auth,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(() => ['orders', 'vendors'])
)(OrderHome)


