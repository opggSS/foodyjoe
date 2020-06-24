import React , {useEffect, useState}from 'react'
import backDark from '../../assets/icons/back_dark.svg'
import { Link } from 'react-router-dom'
import SingleDishAddButton from '../vendor/SingleDishAddButton'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import ShortCart from '../cart/shortCart'

const SingleDish = ({cart , dish ,vendor}) => {
  const [cartItemId , setCartItemId] = useState(null)  
  useEffect(()=>{
    if(dish) {
      const itemInCart = cart[dish.vendorId] ? cart[dish.vendorId].dishes.find((singleDish) => {
        return singleDish.id === dish.id
      }) : null
      itemInCart && setCartItemId(itemInCart.cartItemId)
    }
  },[cart, dish])

  return ( dish ? 
    <div className='singleDish'>
      <Link to={`/vendor/${dish.vendorId}`}>
        <div className="bannerImage" style={{ backgroundImage: `url(${dish.photo})` }}>
          <img src={backDark} alt='sdf' />
        </div>
      </Link>

      <div className="dishTitle">
        {dish.name}
      </div>
      <div className="divider"></div>
      <div className="priceContainer">
        <div style={{ position: 'relative' }}>
          <span className='price'>${dish.price}</span>
          <SingleDishAddButton
            dish={ {...dish , cartItemId: Number(cartItemId) }}
            isVendorMenu= {cartItemId ? false : true }
            vendor={vendor}
           >
          </SingleDishAddButton>
        </div>
      </div>

      <div className="divider"></div>
      <div className="productDescription">
        <div>Product Description</div>
        <p>{dish.description}</p>
      </div>
      <ShortCart vendorId={dish.vendorId} />
    </div> : <div>Loading</div>) 
}

const mapStateToProps = (state, ownProps) => {
  let dish = null
  let vendor = null
  if (state.firestore.ordered.dishes){
    dish = state.firestore.ordered.dishes.find(dish => ownProps.match.params.id === dish.id)
    vendor = state.firestore.ordered.vendors.find(vendor => dish.vendorId === vendor.id)
  }
  return { 
    cart : state.cartState,
    dish: dish,
    vendor : vendor
  }
}


export default compose(
  connect(mapStateToProps, {}),
  firestoreConnect([
    {
      collection: 'dishes',
    },
    {
      collection: 'vendors'
    }
  ])
)(SingleDish)