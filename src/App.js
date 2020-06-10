import React from 'react';
import {Switch, Route} from 'react-router-dom'
import BotNavbar from './components/navigation/BotNavbar'
import Homepage from './components/homepage/Homepage'
import Default from './components/Default'
import Dish from './components/dish/SingleDish'
import Vendor from './components/vendor/SingleVendor'
import 'antd/dist/antd.css'

export default App => {
  return (
    <div>  
    
    <Switch>
      <Route exact path="/" component={Homepage}/>
      <Route path="/dish/:id" component={Dish}/>
      <Route path="/vendor/:id" component={Vendor}/>
      <Route component={Default}/>
    </Switch>
    <BotNavbar/>
  </div>
  )
}
