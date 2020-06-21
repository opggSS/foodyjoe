import React from 'react';
import { Switch, Route, HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Homepage from './components/homepage/Homepage'
import Default from './components/Default'
import Vendor from './components/vendor/SingleVendor'
import SingleDish from './components/dish/SingleDish'
import Cart from './components/cart/CompleteCart'
import Checkout from './components/checkout/Checkout'

import 'antd/dist/antd.css'
import 'antd-mobile/dist/antd-mobile.css';

export default App => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/vendor/:id" component={Vendor} />
            <Route path="/singleDish/:id" component={SingleDish} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout/:vendorId" component={Checkout} />
            {/* <Route component={Default} /> */}
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}
