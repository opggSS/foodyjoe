import React from 'react'
import TopNav from '../navigation/TopNavbar'
import Banner from './Banner'
import Categories from './Categories'
import Special from './Special'
import Vendors from './Vendors'

import BotNavbar from '../navigation/BotNavbar'
const Homepage = () => {
  return (
    <div className='homepageContainer'>
      <TopNav />
      <Banner />
      <div style={{
          marginBottom: '20px'
      }}></div>
      {/*  */}
      {/* <Categories /> */}
      {/* <Special /> */}
      <Vendors />
      <div style={{
        paddingBottom: '20px'
    }}></div>
      <BotNavbar />
    </div>
  )
}


export default Homepage
