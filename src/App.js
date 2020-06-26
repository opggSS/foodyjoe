import React, { useEffect } from 'react';
import { Switch, Route, HashRouter as Router } from 'react-router-dom'
import Homepage from './components/homepage/Homepage'
import Default from './components/Default'
import Vendor from './components/vendor/SingleVendor'
import SingleDish from './components/dish/SingleDish'
import Cart from './components/cart/CompleteCart'
import OrderHome from './components/order/OrderHome'
import Account from './components/account/Account'
import Checkout from './components/checkout/Checkout'
import { createBrowserHistory } from "history"
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import { getAllVendors } from './actions/vendor/vendorActions'
import 'antd/dist/antd.css'
import 'antd-mobile/dist/antd-mobile.css'
const history = createBrowserHistory()

const App = ({ getAllVendors, vendors }) => {

  useEffect(() => {
    console.log(vendors)
    if (vendors) {
      getAllVendors(vendors)
    }

  }, [getAllVendors, vendors])

  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/vendor/:id" component={Vendor} />
          <Route path="/singleDish/:id" component={SingleDish} />
          <Route path="/cart" component={Cart} />
          <Route path="/orders" component={OrderHome} />
          <Route path="/account" component={Account} />
          <Route path="/checkout/:vendorId" component={Checkout} />
          <Route component={Default} />
        </Switch>
      </div>
    </Router>
  )
}

const mapStateToProps = (state) => {

  return {
    vendors: state.firestore.ordered.vendors
  }
}
export default compose(
  connect(mapStateToProps, { getAllVendors }),
  firestoreConnect(() => ['vendors'])
)(App)
