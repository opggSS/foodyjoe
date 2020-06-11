import React from 'react';
import {Switch, Route} from 'react-router-dom'

import Homepage from './components/homepage/Homepage'
import Default from './components/Default'
import Vendor from './components/vendor/SingleVendor'
import SingleDish from './components/vendor/SingleDish'
import 'antd/dist/antd.css'
import 'antd-mobile/dist/antd-mobile.css'; 

export default App => {
  return (
    <div>  
    
    <Switch>
      <Route exact path="/" component={Homepage}/>
      <Route path="/vendor/:id" component={Vendor}/>
      <Route component={Default}/>
    </Switch>
    
  </div>
  )
}
