import React from 'react'
import TopNav from '../navigation/TopNavbar'
import Banner from './Banner'
import Categories from './Categories'
import Special from './Special'
import Vendors from './Vendors'
import BotNavbar from '../navigation/BotNavbar'
export default function Homepage() {
  return (
    <div className='homepageContainer'>
      please use mobile phone or change inspection device to mobile phone
      <TopNav />
      {/* <Banner /> */}
      {/* <Categories /> */}
      {/* <Special /> */}
      <Vendors />
      <BotNavbar />
    </div>
  )
}
