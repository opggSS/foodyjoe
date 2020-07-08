import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect, populate } from 'react-redux-firebase'
import { compose } from 'redux'
import SingleOrderSummary from './SingleOrderSummary'
import { Link } from 'react-router-dom'
import './OrderHome.css'

const populates = [
  { child: 'vendor', root: 'vendors' }
]


const OrderHome = ({ auth, orders }) => {
console.log(orders)
  const singleOrder = () => {
    return Object.keys(orders).map((key, index) => {
      console.log(key, index)
      console.log(orders[key])
       return <SingleOrderSummary key={key} order={orders[key]} orderId = {key}/>
    });

    // for (const [orderId, order] of Object.entries(orders)) {
    //    <SingleOrderSummary key={orderId} order={order} orderId = {orderId}/>
    // }
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

    return [
      {
        collection: 'orders',
        orderBy: ["createdAt", "desc"],
        where: [
          ['userId', '==', props.auth.id ? props.auth.id : null]
          
        ],
        populates: populates,
      },
    ]

  }
  )
)(OrderHome)
