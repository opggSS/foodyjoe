import React, { useEffect } from 'react'
import BackIcon from '../../assets/icons/back.svg'
import SearchIcon from '../../assets/icons/search.svg'
import LikeIcon from '../../assets/icons/like.svg'
import { Link } from 'react-router-dom'
import { Tabs } from 'antd';
import Menu from './Menu.component'
import About from './About.component'
import Ratings from './Ratings.component'
import ShortCart from '../cart/shortCart'
import { connect } from 'react-redux'
import { setLastVisitedVendor } from '../../actions/vendor/vendorActions'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const { TabPane } = Tabs;

const SingleVendor = ({ setLastVisitedVendor, vendor }) => {

  console.log(vendor)
  useEffect(() => {
    if (vendor) setLastVisitedVendor(vendor.id)
  }, [setLastVisitedVendor, vendor])

  return (
    vendor ? (
      <div className='singleVendor'>
        <div className='banner' style={{ backgroundImage: `url(${vendor.logo})` }}>
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
            <div className="title">{vendor.name}</div>
            <div className="rating">{vendor.rating}</div>
            <div className="tags">
              {vendor.tags.map((tag, index) => (<span key={index} className="tag">{tag}</span>))}
            </div>

          </div>
          <div className="divider"></div>
          <div className="tabs">
            <Tabs
              defaultActiveKey="1"
            // onChange={callback}
            >
              <TabPane tab="Menu" key="1">
                <Menu
                  categoryLength={vendor.category_length}
                  vendor = {vendor}
                />
              </TabPane>
              <TabPane tab="Ratings" key="2">
                <Ratings />
              </TabPane>
              <TabPane tab="About" key="3">
                <About
                  address={vendor.address}
                  city={vendor.city}
                  province={vendor.province}
                  mobile={vendor.mobile}
                  business_hours={vendor.business_hours}
                  longitude={vendor.longitude}
                  latitude={vendor.latitude}
                  name={vendor.name}
                />
              </TabPane>
            </Tabs>
          </div>
        </div>
        <ShortCart vendorId={vendor.id} />
      </div>
    ) :
      (<div> loading </div>)

  )
}

const mapStateToProps = (state, ownProps) => {
  let vendors = null
  let vendor = null
  console.log(state.firestore)
  if (state.firestore.ordered.vendors) {
    vendors = state.firestore.ordered.vendors
    vendor = vendors.find(vendor => vendor.id === ownProps.match.params.id)
  }
  return {
    vendor
  }
}

export default compose(
  firestoreConnect(() => ['vendors']), // sync todos collection from Firestore into redux
  connect(mapStateToProps, {setLastVisitedVendor})
)(SingleVendor)

