import React from 'react'
import TopNav from '../navigation/TopNavbar'
import Banner from './Banner'
import Categories from './Categories'
import Special from './Special'
import Vendors from './Vendors'
export default function Homepage() {
  return (
    <div className='homepageContainer'>
      <TopNav />
      <Banner />
      <Categories />
      <Special />
      <Vendors />
    </div>
  )
}
