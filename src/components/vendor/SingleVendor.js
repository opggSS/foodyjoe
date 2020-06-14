import React from 'react'
import Logo from '../../assets/images/haidilao.jpg'
import BackIcon from '../../assets/icons/back.svg'
import SearchIcon from '../../assets/icons/search.svg'
import LikeIcon from '../../assets/icons/like.svg'
import { Link } from 'react-router-dom'
import { Tabs } from 'antd';
import Menu from './Menu.component'
import About from './About.component'
import Ratings from './Ratings.component'
import ShortCart from '../cart/shortCart'

const { TabPane } = Tabs;

const SingleVendor = () => {
  const data = {
    id: 1,
    shipping_cost: '0.0',
    shipping_cost_percent: '0.0',
    address: '5890 no3 road',
    area_id: 4,
    business_hours: [
      { from: null, to: null },
      { from: "11:00", to: '23:28' },
      { from: "11:00", to: '23:28' },
      { from: "11:00", to: '23:28' },
      { from: "11:00", to: '23:28' },
      { from: "11:00", to: '23:28' },
      { from: null, to: null },
    ],
    city: 'richmond',
    isClosed: true,
    coupon_tags: ["全场7折", '满100减10'],
    latitude: 49.1708,
    longitude: -123.136,
    logo: Logo,
    mobile: "6043706665",
    name: "海底捞火锅 | 全场七折",
    pickup_discount: 88,
    province: 'BC',
    rating: 4.8,
    notes_tags: [
      "无接触配送，请把商品留在门外，如有问题与我联系",
      "不要葱",
      "不要香菜",
      "少点辣",
      "多点辣",
      "带餐具",
    ],
    tags: ["川湘麻辣", "沪港澳汇"],
    tip_lists: [0.1, 0.15, 0.2, 0.25],
    
  }

  const vendorInfo = {
    vendorId: data.id,
    vendorImage:data.logo,
    vendorName: data.name
  }

  return (
    <div className='singleVendor'>
      <div className='banner' style={{ backgroundImage: `url(${data.logo})` }}>
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
          <div className="title">{data.name}</div>
          <div className="rating">{data.rating}</div>
          <div className="tags">
            {data.tags.map((tag, index) => (<span key={index} className="tag">{tag}</span>))}
          </div>

        </div>
        <div className="divider"></div>
        <div className="tabs">
          <Tabs
            defaultActiveKey="1"
          // onChange={callback}
          >
              <TabPane tab="Menu" key="1">
                <Menu  vendorInfo={vendorInfo} />
              </TabPane>
              <TabPane tab="Ratings" key="2">
                <Ratings />
              </TabPane>
              <TabPane tab="About" key="3">
                <About
                  address={data.address}
                  city={data.city}
                  province={data.province}
                  mobile={data.mobile}
                  business_hours={data.business_hours}
                  longitude={data.longitude}
                  latitude={data.latitude}
                />
              </TabPane>
          </Tabs>
        </div>
      </div>
      <ShortCart />
    </div>
  )
}

export default SingleVendor
