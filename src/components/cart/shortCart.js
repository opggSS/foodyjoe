import React from 'react'
import { connect } from 'react-redux'
import { ReactComponent as Cart } from '../../assets/icons/cart.svg'
import { Link } from 'react-router-dom'

const ShortCart = ({ totalPrice, totalQuantity, vendorId }) => {
  // const handleCloseCompleteCart = () => {
  //   setCompleteCartOpen(false)
  // }

  // const [completeCartOpen, setCompleteCartOpen] = useState(false)

  return (
    <div className='shortCart'>

      <Link to='/cart'>
        <div className="cartIcon" >
          <Cart />
          <span className='cartAmount'>{totalQuantity}</span>
        </div>
      </Link>


      <div className="checkoutContainer">
        <div className="cartValue">${totalPrice} <span>不含配送费</span></div>
        <div className="checkOutButton">Check Out</div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const singleVendorCart = state.cartState[ownProps.vendorId]
  return {
    totalQuantity: singleVendorCart ? singleVendorCart.quantity : 0,
    totalPrice: singleVendorCart ? singleVendorCart.totalPrice : 0 ,
  }
}

export default connect(mapStateToProps)(ShortCart)
