import React, { useEffect, useState } from 'react'
import backDark from '../../assets/icons/back_dark.svg'
import { Link } from 'react-router-dom'
import SingleDishAddButton from '../vendor/SingleDishAddButton'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import ShortCart from '../cart/shortCart'

const SingleDish = ({ cart, dish, vendor }) => {
  console.log(vendor)
  const [cartItemId, setCartItemId] = useState(null)
  useEffect(() => {
    if (dish) {
      const itemInCart = cart[dish.vendor] ? cart[dish.vendor].dishes.find((singleDish) => {
        return singleDish.id === dish.id
      }) : null
      itemInCart && setCartItemId(itemInCart.cartItemId)
    }
  }, [cart, dish])

  return (dish ?
    <div className='singleDish'>
      <Link to={`/vendor/${dish.vendor}`}>
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
            dish={{ ...dish, cartItemId: Number(cartItemId) }}
            isVendorMenu={cartItemId ? false : true}
            vendor={dish.vendor}
          >
          </SingleDishAddButton>
        </div>
      </div>

      <div className="divider"></div>
      <div className="productDescription">
        <div>Product Description</div>
        <p>{dish.description}</p>
      </div>
      <ShortCart vendorId={dish.vendor} />
    </div> : <div>Loading</div>)
}

const mapStateToProps = (state, ownProps) => {
  const dishes = state.firestore.ordered.dishes
  return {
    cart: state.cartState,
    dish: dishes ? dishes[0] : null,
    vendor: dishes ? state.vendors.find(vendor => vendor.id === dishes[0].vendor ) : null
  }
}

export default compose(
  connect(mapStateToProps, {}),
  firestoreConnect(props => {
   return [{
      collection: 'dishes',
      doc: props.match.params.id
    }]
  }

  )
)(SingleDish)