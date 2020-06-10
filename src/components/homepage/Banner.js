import React from 'react'
import { Carousel } from 'antd-mobile';
import banner1 from '../../assets/banner1.jpg'
import banner2 from '../../assets/banner2.jpg'
import banner3 from '../../assets/banner3.jpg'

export default Banner => {
  return (
    <Carousel autoplay className='banner'>
      <div>
        <img src={banner1} alt='sdf' style={{width: '100%' }}/>
      </div>
      <div>
        <img src={banner2}  alt='sdf' style={{width: '100%' }}/>
      </div>
      <div>
        <img src={banner3}  alt='sdf' style={{width: '100%' }} />
      </div>
    </Carousel>
  )
}
