import React from 'react'
import backDark from '../../assets/icons/back_dark.svg'
import banner2 from '../../assets/images/banner2.jpg'
import { Link } from 'react-router-dom'
import SingleDishAddButton from '../vendor/SingleDishAddButton'
import Logo from '../../assets/images/haidilao.jpg'
import ShortCart from '../cart/shortCart'


const data = {
  id: 0,
  vendor: {
    id: 1,
    logo: Logo,
    name: "海底捞火锅 | 全场七折",
  },
  category: {
    name: '一人精品套餐'
  },
  name: '一人精品套餐/单人套餐',
  photo: banner2,
  price: 18,
  description: '商品详细描述',
  selectables: [
    {
      max: 1,
      min: 1,
      name: '锅类选择',
      values: [
        {
          name: '生',
          price: 18,
          selected: false
        },
        {
          name: '熟',
          price: 20,
          selected: false
        },
      ]
    },

    {
      max: 1,
      min: 1,
      name: '饮品',
      values: [
        {
          name: '健怡可乐（常温)',
          price: 0,
          selected: false
        },
        {
          name: '可口可乐（冰镇)',
          price: 4,
          selected: false
        },
        {
          name: '雪碧（常温)',
          price: 5,
          selected: false
        },

      ]
    },

    {
      max: 3,
      min: 0,
      name: '可选搭配小料',
      values: [
        {
          name: '生芝麻酱',
          price: 2,
          selected: false
        },
        {
          name: '香葱',
          price: 1,
          selected: false
        },
        {
          name: '菌王酱',
          price: 2,
          selected: false
        },
      ]
    },
  ]
}

export default function SingleDish() {

  const vendorInfo = {
    vendorImage: data.vendor.logo,
    vendorName: data.vendor.name,
    vendoId: data.vendor.id
  }

  return (
    <div className='singleDish'>
      <Link to={`/vendor/${data.vendor.id}`}>
        <div className="bannerImage" style={{ backgroundImage: `url(${banner2})` }}>
          <img src={backDark} alt='sdf' />
        </div>
      </Link>

      <div className="dishTitle">
        {data.name}
      </div>
      <div className="divider"></div>
      <div className="priceContainer">
        <div style={{position:'relative'}}>
          <span className='price'>${data.price}</span>
          <SingleDishAddButton
            dish={{
              dishId: data.id,
              dishName: data.name,
              dishPrice: data.price,
              dishImage: data.photo,
              selectables: data.selectables
            }}
            vendorInfo={vendorInfo}>
          </SingleDishAddButton>
        </div>
      </div>

      <div className="divider"></div>
      <div className="productDescription">
        <div>Product Description</div>
        <p>{data.description}</p>
      </div>

      <ShortCart />
    </div>
  )
}
