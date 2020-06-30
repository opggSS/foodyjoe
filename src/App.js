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
import DeliveryInfo from './components/checkout/DeliveryInfo'
import CreateDeliveryInfo from './components/checkout/CreateDeliveryInfo'
import SignUp from './components/sign/SignUp.js'
import SignIn from './components/sign/SignIn.js'
import SearchResult from './components/search/SearchResult'
import SignHome from './components/sign/SignHome.js'
import { createBrowserHistory } from "history"
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { getAllVendors } from './actions/vendor/vendorActions'
import { setUserInfo } from './actions/auth/authAction'
import 'antd/dist/antd.css'
import 'antd-mobile/dist/antd-mobile.css'
const history = createBrowserHistory()

const App = ({ getAllVendors, vendors, user, setUserInfo, }) => {
  useEffect(() => {
    if (vendors) {
      getAllVendors(vendors)
    }

    if (user) {
      setUserInfo(user)
    }

  }, [ getAllVendors, setUserInfo, user, vendors])

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

          <Route path="/deliveryinfo/create" component={CreateDeliveryInfo} />
          <Route path="/deliveryinfo" component={DeliveryInfo} />

          <Route path="/orderDetail/:orderId" component={OrderDetail} />
          <Route path="/search-result/:keyword" component={SearchResult} />
          <Route path="/checkout/:vendorId" component={Checkout} />
          <Route component={Default} />
        </Switch>
      </div>
    </Router>
  )
}

const mapStateToProps = (state) => {
  console.log(state.firestore.ordered)
  return {
    vendors: state.firestore.ordered.vendors,
    user: state.firestore.ordered.users ? state.firestore.ordered.users[0] : null ,
    uid: state.firebase.auth.uid,
  }
}
export default compose(
  connect(mapStateToProps, { getAllVendors, setUserInfo }),
  firestoreConnect((props) => {
    const uid = props.uid ? props.uid : ''
    return [
      { collection: 'vendors' },
      {
        collection: 'users',
        doc: uid
      }
    ]
  })
)(App)
