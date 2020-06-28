import React, { useEffect } from 'react';
import { Switch, Route, HashRouter as Router } from 'react-router-dom'
import Homepage from './components/homepage/Homepage'
import Default from './components/Default'
import Vendor from './components/vendor/SingleVendor'
import SingleDish from './components/dish/SingleDish'
import Cart from './components/cart/CompleteCart'
import OrderHome from './components/order/OrderHome'
import OrderDetail from './components/order/SingleOrderDetail'
import Account from './components/account/Account'
import Checkout from './components/checkout/Checkout'
import SignUp from './components/sign/SignUp.js'
import SignIn from './components/sign/SignIn.js'
import SignHome from './components/sign/SignHome.js'
import { createBrowserHistory } from "history"
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import { getAllVendors } from './actions/vendor/vendorActions'
import { getAllDishes } from './actions/dish/dishAction'
import 'antd/dist/antd.css'
import 'antd-mobile/dist/antd-mobile.css'
const history = createBrowserHistory()

const App = ({ getAllVendors, vendors, getAllDishes, dishes }) => {

  useEffect(() => {
    if (vendors) {
      getAllVendors(vendors)
    }
    if(dishes) {
      getAllDishes(dishes)
    }
  }, [dishes, getAllDishes, getAllVendors, vendors])

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
          <Route path="/signIn" component={SignIn} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/signhome" component={SignHome} />
          <Route path="/orderDetail/:orderId" component={OrderDetail} />
          <Route path="/checkout/:vendorId" component={Checkout} />
          <Route component={Default} />
        </Switch>
      </div>
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    vendors: state.firestore.ordered.vendors,
    dishes:state.firestore.ordered.dishes
  }
}
export default compose(
  connect(mapStateToProps, { getAllVendors, getAllDishes }),
  firestoreConnect(() => ['vendors', 'dishes'])
)(App)
