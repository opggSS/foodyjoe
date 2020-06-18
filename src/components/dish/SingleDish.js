import React , {useEffect, useState}from 'react'
import backDark from '../../assets/icons/back_dark.svg'
import { Link } from 'react-router-dom'
import SingleDishAddButton from '../vendor/SingleDishAddButton'
import ShortCart from '../cart/shortCart'
import {MyDishes} from '../../datas'
import _ from 'lodash'
import {connect} from 'react-redux'

const SingleDish = ({match : {params:{id:singleDishId = 0}} ,cart } ) => {
  const [singleDishData , setSingleDishData]= useState({})
  const [dishVendorId , setDishVendorId] = useState(null)
  const [cartItemId , setCartItemId] = useState(null)
  singleDishId = Number(singleDishId)
  useEffect(() => {
    const data = MyDishes.find(dish => {
      return dish.id === Number(singleDishId)
    })
    setSingleDishData(data)
  }, [setSingleDishData, singleDishId])

  useEffect(()=>{
    if(!_.isEmpty(singleDishData)) {
      const vendorId = singleDishData.vendor.id
      setDishVendorId(vendorId)
      console.log(cart[vendorId])
      const itemInCart = cart[vendorId] ? cart[vendorId].dishes.find((dish) => {
        return dish.id = singleDishId
      }) : null
      itemInCart && setCartItemId(itemInCart.cartItemId)
    }
  },[cart, singleDishData, singleDishId])

  return ( !_.isEmpty(singleDishData) ? 
    <div className='singleDish'>
      <Link to={`/vendor/${dishVendorId}`}>
        <div className="bannerImage" style={{ backgroundImage: `url(${singleDishData.photo})` }}>
          <img src={backDark} alt='sdf' />
        </div>
      </Link>

      <div className="dishTitle">
        {singleDishData.name}
      </div>
      <div className="divider"></div>
      <div className="priceContainer">
        <div style={{ position: 'relative' }}>
          <span className='price'>${singleDishData.price}</span>
          <SingleDishAddButton
            dish={ {...singleDishData , cartItemId: Number(cartItemId)}}
            isVendorMenu= {cartItemId ? false : true }
           >
          </SingleDishAddButton>
        </div>
      </div>

      <div className="divider"></div>
      <div className="productDescription">
        <div>Product Description</div>
        <p>{singleDishData.description}</p>
      </div>
      <ShortCart vendorId={dishVendorId} />
    </div> : null) 
}

const mapStateToProps = (state) => {
  return { cart : state.cartState }
}

export default connect(mapStateToProps, {}) (SingleDish)