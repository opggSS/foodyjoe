import React from 'react'
import { Carousel } from 'antd-mobile';
import banner1 from '../../assets/images/banner1.jpg'
import banner2 from '../../assets/images/banner2.jpg'
import banner3 from '../../assets/images/banner3.jpg'

export default Banner => {
  return (
    <Carousel autoplay className='banner'>
      <div>
        <img src={"https://firebasestorage.googleapis.com/v0/b/foodyjoe-3a05d.appspot.com/o/3J8G9mrpO9f9u4Qv77e7JnKIv4z2%2Flogo.png?alt=media&token=8037db99-756d-4ec8-813d-32ffb001bac2"} alt='sdf' style={{width: '100%' }}/>
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
