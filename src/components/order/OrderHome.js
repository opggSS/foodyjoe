import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect, populate } from 'react-redux-firebase'
import { compose } from 'redux'
import SingleOrderSummary from './SingleOrderSummary'
import { Link } from 'react-router-dom'
import './OrderHome.css'
import { orderBy } from 'lodash'

const populates = [
  { child: 'vendor', root: 'vendors' }
]



const OrderHome = ({ auth, orders }) => {

  const singleOrder = () => {
    for (const [orderId, order] of Object.entries(orders)) {
      return <SingleOrderSummary key={orderId} order={order} orderId = {orderId}/>
    }
  }

  if (orders) {
    return (<div className="orders">
      <Link to="/">Back to Home</Link>
      <h2 className='header'>Order History</h2>
      {singleOrder()}
    </div>)
  } else {
    return <div>loading..</div>
  }
}

const mapStateToProps = (state, ownProps) => {

  const orders = populate(state.firestore, 'orders', populates)

  console.log(orders)
  console.log(state)
  return {
    orders: orders,
    auth: state.auth ? state.auth : null
  }
  // let orders = []

  // let uid = state.firebase.auth.uid
  // if (state.firestore.ordered.orders && uid) {
  //   console.log(state.firestore.ordered.orders)
  //   orders = state.firestore.ordered.orders.filter(order => order.userId === uid).map(order => ({
  //     ...order,
  //     vendor: state.firestore.ordered.vendors.find(e => e.id === order.vendorId)
  //   }))
  // }
  // return {
  //   orders: orders,
  //   auth: state.firebase.auth,
  // }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    console.log(props)
    return [
      {
        collection: 'orders',
        where: [
          ['userId', '==', props.auth.id ? props.auth.id : null],
        ],
        populates: populates,
      },
    ]

  }
  )
)(OrderHome)
