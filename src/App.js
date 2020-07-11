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
import CardPayment from './components/checkout/CardPayment'
import SignUp from './components/sign/SignUp.js'
import SignIn from './components/sign/SignIn.js'
import SearchResult from './components/search/SearchResult'
import SignHome from './components/sign/SignHome.js'
import { createBrowserHistory } from "history"
import 'antd/dist/antd.css'
import 'antd-mobile/dist/antd-mobile.css'
import { loadStripe } from '@stripe/stripe-js';
import { firestoreConnect } from 'react-redux-firebase'
import {
  Elements,
} from '@stripe/react-stripe-js';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { setUserInfo } from './actions/auth/authAction'

const stripePromise = loadStripe('pk_test_51H0nNoICCUsuYjgJrZHuVZJYPBNWgawMgWkb8OZx8XgjHv6zrOZUxbjTvKgTU5rTA62Dtw5rS1lGKFRxrMlVu4LF00eM9xoBx0');

export const history = createBrowserHistory()
const App =  ({user,setUserInfo}) => {
  useEffect(() => {
    if (user) {
      setUserInfo(user)
    }
  }, [setUserInfo, user])

  return (
    <Router history={history}>
      <Elements stripe={stripePromise}>
        <Switch>
          <Route
            exact
            path="/"
            component={Homepage}
          />
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
          <Route path="/cardpayment" component={CardPayment} />
          <Route path="/orderDetail/:orderId" component={OrderDetail} />
          <Route path="/search-result/:keyword" component={SearchResult} />
          <Route path="/checkout/:vendorId" component={Checkout} />
          <Route component={Default} />
        </Switch>
      </Elements>
    </Router>
  )
}

const mapStateToProps = (state) => {
  console.log(state.firestore.ordered)
  return {
    user: state.firestore.ordered.users ? state.firestore.ordered.users[0] : null,
    uid: state.firebase.auth.uid,
  }
}

export default compose(
  connect(mapStateToProps, { setUserInfo }),
  firestoreConnect((props) => {
    const uid = props.uid ? props.uid : ''
    if(uid) {
      return [
        {
          collection: 'vendors',
          orderByKey:true,
        },
        {
          collection:'users',
          doc: uid
        }
      ]
    }
    else {
      return [
        {
          collection: 'vendors',
          orderByKey:true,
        }
      ]
    }
   
  }))
(App)



