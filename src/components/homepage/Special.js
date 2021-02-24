import React from 'react'
import { Carousel, WingBlank } from 'antd-mobile';

// import banner1 from '../../assets/images/banner1.jpg'
// import banner2 from '../../assets/images/banner2.jpg'
// import banner3 from '../../assets/images/banner3.jpg'

export default function Special() {
  return (
    <div className="special">
      <h5 className='title'>
        | 特惠商品 |
      </h5>
      <WingBlank>
        <Carousel
          // frameOverflow="visible"
          cellSpacing={10}
          slideWidth={0.8}
          autoplay
          infinite
        >
          {/* <div>
            <img src={banner1} alt='sdf' />
            <img src={banner2} alt='sdf' />
            <img src={banner3} alt='sdf' />
          </div>
          <div>
            <img src={banner1} alt='sdf' />
            <img src={banner2} alt='sdf' />
            <img src={banner3} alt='sdf' />
          </div>
          <div>
            <img src={banner1} alt='sdf' />
            <img src={banner2} alt='sdf' />
            <img src={banner3} alt='sdf' />
          </div> */}

        </Carousel>
      </WingBlank>
    </div>
  )
}
