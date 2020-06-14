import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Homepage from './components/homepage/Homepage'
import Default from './components/Default'
import Vendor from './components/vendor/SingleVendor'
import SingleDish from './components/dish/SingleDish'
import Cart from './components/cart/CompleteCart'
import 'antd/dist/antd.css'
import 'antd-mobile/dist/antd-mobile.css';

export default App => {
  return (
    <Provider store={store}>
      <div>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/vendor/:id" component={Vendor} />
          <Route path="/singleDish/:id" component={SingleDish} />
          <Route path="/cart" component={Cart} />
          <Route component={Default} />
        </Switch>
      </div>
    </Provider>

  )
}
