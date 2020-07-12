import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect, populate } from 'react-redux-firebase'
import { compose } from 'redux'
import SingleOrderSummary from './SingleOrderSummary'
import { Link } from 'react-router-dom'
import './OrderHome.scss'
import CurrentOrder from './CurrentOrder'
import BotNavbar from '../navigation/BotNavbar'

const populates = [
  { child: 'vendor', root: 'vendors' }
]

const OrderHome = ({ auth, currentOrders, historyOrders }) => {

  const [isCurrent, setIsCurrent] = useState(false)
  useEffect(() => {
    if (currentOrders && currentOrders.length > 0) {
      setIsCurrent(true)
    }
    else {
      setIsCurrent(false)
    }
  }, [currentOrders])

  const styles = {
    borderBottom: '2px solid #1cb9b6',
  }

  const orderHistory = () => {
    if (historyOrders.length === 0) {
      return <div>no orders</div>
    }
    else {
      return historyOrders.map((order) => {
        return <SingleOrderSummary key={order.id} order={order} />
      });
    }
  }
  const orderCurrent = () => {
    if (currentOrders.length === 0) {
      return <div>no current order</div>
    }
    else {
      return currentOrders.map((order) => {
        return <CurrentOrder key={order.id} order={order} />
      });
    }
  }

  return (
    <div className='orders'>
      <div className="header">
        <span onClick={() => setIsCurrent(false)} style={!isCurrent ? styles : {}}> History </span>
        <span onClick={() => setIsCurrent(true)} style={isCurrent ? styles : {}}> Current </span>
      </div>
      <div className="content">
        {isCurrent ? (
          orderCurrent()
        ) : orderHistory()}
      </div>
      <BotNavbar />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {

  const orders = populate(state.firestore, 'orders', populates)
  let newOrders = []
  let currentOrders = []
  let historyOrders = []

  if (orders) {
    newOrders = Object.keys(orders).map((key) => {
      return {
        ...orders[key],
        id: key
      }
    });
    currentOrders = newOrders.filter(order => order.status !== 4)
    historyOrders = newOrders.filter(order => order.status === 4)
  }

  return {
    currentOrders: currentOrders,
    historyOrders: historyOrders,
    auth: state.auth ? state.auth : null
  }

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
