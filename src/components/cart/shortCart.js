import React from 'react'
import { connect } from 'react-redux'
import { ReactComponent as Cart } from '../../assets/icons/cart.svg'
import { Link } from 'react-router-dom'

const ShortCart = ({ totalPrice, totalQuantity, isCompleteCart }) => {
  // const handleCloseCompleteCart = () => {
  //   setCompleteCartOpen(false)
  // }

  // const [completeCartOpen, setCompleteCartOpen] = useState(false)

  return (
    <div className='shortCart'>
      {isCompleteCart ? (
        <div className="cartIcon" >
          <Cart />
          <span className='cartAmount'>{totalQuantity}</span>
        </div> ) :
        (
          <Link to='/cart'>
            <div className="cartIcon" >
              <Cart />
              <span className='cartAmount'>{totalQuantity}</span>
            </div>
          </Link>
        )}

      <div className="checkoutContainer">
        <div className="cartValue">${totalPrice} <span>不含配送费</span></div>
        <div className="checkOutButton">Check Out</div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  totalQuantity: state.cartState.totalQuantity,
  totalPrice: state.cartState.totalPrice,
})

export default connect(mapStateToProps)(ShortCart)
