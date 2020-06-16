import React from 'react'
import backDark from '../../assets/icons/back_dark.svg'
import banner2 from '../../assets/images/banner2.jpg'
import { Link } from 'react-router-dom'
import SingleDishAddButton from '../vendor/SingleDishAddButton'
import ShortCart from '../cart/shortCart'
import {SingleDishData} from '../../datas'


export default function SingleDish() {

  return (
    <div className='singleDish'>
      <Link to={`/vendor/${SingleDishData.vendor.id}`}>
        <div className="bannerImage" style={{ backgroundImage: `url(${banner2})` }}>
          <img src={backDark} alt='sdf' />
        </div>
      </Link>

      <div className="dishTitle">
        {SingleDishData.name}
      </div>
      <div className="divider"></div>
      <div className="priceContainer">
        <div style={{ position: 'relative' }}>
          <span className='price'>${SingleDishData.price}</span>
          <SingleDishAddButton
            dish={SingleDishData}
           >
          </SingleDishAddButton>
        </div>
      </div>

      <div className="divider"></div>
      <div className="productDescription">
        <div>Product Description</div>
        <p>{SingleDishData.description}</p>
      </div>

      <ShortCart vendorId={SingleDishData.vendor.id} />
    </div>
  )
}
