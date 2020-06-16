import React from 'react'
import BackIcon from '../../assets/icons/back.svg'
import SearchIcon from '../../assets/icons/search.svg'
import LikeIcon from '../../assets/icons/like.svg'
import { Link } from 'react-router-dom'
import { Tabs } from 'antd';
import Menu from './Menu.component'
import About from './About.component'
import Ratings from './Ratings.component'
import ShortCart from '../cart/shortCart'
import {SingleVendorData} from '../../datas'
import firebase from 'firebase'

const { TabPane } = Tabs;

const SingleVendor = () => {
  return (
    <div className='singleVendor'>
      <div className='banner' style={{ backgroundImage: `url(${SingleVendorData.logo})` }}>
        <div className='topbar'>
          <Link to="/">
            <img src={BackIcon} alt='sdf' />
          </Link>
          <Link to="/">
            <img src={SearchIcon} alt='sdf' />
          </Link>
          <Link to="/">
            <img src={LikeIcon} alt='sdf' />
          </Link>
        </div>
      </div>
      <div className="overlay"></div>
      <div className="mainContainer">
        <div className="topContainer">
          <div className="title">{SingleVendorData.name}</div>
          <div className="rating">{SingleVendorData.rating}</div>
          <div className="tags">
            {SingleVendorData.tags.map((tag, index) => (<span key={index} className="tag">{tag}</span>))}
          </div>

        </div>
        <div className="divider"></div>
        <div className="tabs">
          <Tabs
            defaultActiveKey="1"
          // onChange={callback}
          >
              <TabPane tab="Menu" key="1">
                <Menu />
              </TabPane>
              <TabPane tab="Ratings" key="2">
                <Ratings />
              </TabPane>
              <TabPane tab="About" key="3">
                <About
                  address={SingleVendorData.address}
                  city={SingleVendorData.city}
                  province={SingleVendorData.province}
                  mobile={SingleVendorData.mobile}
                  business_hours={SingleVendorData.business_hours}
                  longitude={SingleVendorData.longitude}
                  latitude={SingleVendorData.latitude}
                />
              </TabPane>
          </Tabs>
        </div>
      </div>
      <ShortCart vendorId={SingleVendorData.id}/>
    </div>
  )
}

export default SingleVendor
