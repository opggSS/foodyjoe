import React from 'react'
import { connect } from 'react-redux'
import { ReactComponent as Cart } from '../../assets/icons/cart.svg'
import { Link } from 'react-router-dom'
import { Modal } from 'antd-mobile';
const alert = Modal.alert;
const ShortCart = ({ totalPrice, totalQuantity, vendorId }) => {

  const handleClick = () => {
    alert('Cart is empty' ,'nothing to checkout', [
      { text: 'Ok', onPress: () =>console.log('ok') },
    ])
  }
  return (
    <div className='shortCart'>

      <Link to='/cart'>
        <div className="cartIcon" >
          <Cart />
          <span className='cartAmount'>{totalQuantity}</span>
        </div>
      </Link>

      <div className="checkoutContainer">
        <div className="cartValue">${totalPrice} </div>
        {totalQuantity > 0 ? (
          <Link to={`/checkout/${vendorId}`}>
            <div className="checkOutButton">Check Out</div>
          </Link>
        ) :
          <div className="checkOutButton" onClick={handleClick}>Check Out</div>
        }

      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const singleVendorCart = state.cartState[ownProps.vendorId]
  return {
    totalQuantity: singleVendorCart ? singleVendorCart.quantity : 0,
    totalPrice: singleVendorCart ? singleVendorCart.totalPrice : 0,
  }
}

export default connect(mapStateToProps)(ShortCart)
