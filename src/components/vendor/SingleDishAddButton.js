import React, { useState } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import SelectOptionModal from './SelectOptionModal'
import { increment } from '../../actions/increment'
import { decrement } from '../../actions/decrement'
import { removeItem } from '../../actions/removeItem'
import { addToCart } from '../../actions/addToCart'

const SingleDishAddButton = ({ increment, decrement, removeItem, addToCart, dishQuantity = 0, dish, isCompleteCart, isVendorMenu }) => {
  console.log(dishQuantity)
  const [modalOpen, setModalOpen] = useState(false)
  const [cartItemId, setCartItemId] = useState(null)
  const handleAddtoCart = () => {
    let itemId = Date.now()
    setCartItemId(itemId)
    const newDish = {...dish , cartItemId: itemId , quantity: 1}
    const cartObj = {
      quantity: 1,
      vendor: dish.vendor,
      dish: newDish,
    }
    addToCart(cartObj)
    handleCloseModal()
  }

  const handleIncrement = () => {
    if (dishQuantity === 0) {
      handleAddtoCart()
    }
    else {
      increment({
        cartItemId: dish.cartItemId || cartItemId,
        quantity: 1,
        vendor:dish.vendor
      })
    }
  }

  const handleDecrement = () => {
    if (dishQuantity === 1) {
      removeItem({
        cartItemId: dish.cartItemId || cartItemId,
        vendor:dish.vendor
      })
    }
    else {
      decrement({
        cartItemId: dish.cartItemId || cartItemId,
        vendor:dish.vendor
      })
    }
  }
  const handleCloseModal = () => {

    setModalOpen(false)

  }
  const handleOpenModal = () => {
    setModalOpen(true)
  }

  return (
    <>
      {dish.selectables.length > 0 ?
        dishQuantity > 0 && isCompleteCart ? (
          <div>
            <div className="decrement" onClick={handleDecrement}> <span>-</span> </div>
            <div className='SingleItemQuantity'> {dishQuantity} </div>
            <div className="increment" onClick={handleIncrement}> <span>+</span> </div>
          </div>
        ) :
          (<div className="option"
            onClick={handleOpenModal}
          >
            Option
          </div>)

        : (
          <div>
            {dishQuantity > 0 && (
              <>
                <div className="decrement" onClick={handleDecrement}> <span>-</span> </div>
                <div className='SingleItemQuantity'> {dishQuantity} </div>
              </>
            )}

            <div className="increment" onClick={handleIncrement}> <span>+</span> </div>


          </div>
        )}

      {modalOpen &&
        <SelectOptionModal
          handleCloseModal={handleCloseModal}
          dish={dish}
        />
      }
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  const singleVendorCart = state.cartState[ownProps.dish.vendor.id]

  if (ownProps.isVendorMenu) {
    return {
      dishQuantity: singleVendorCart ? _.result(_.find(singleVendorCart.dishes, { id: ownProps.dish.id }), 'quantity') : 0
    }

  }
  else {
    return {
      dishQuantity: singleVendorCart ? _.result(_.find(singleVendorCart.dishes, { cartItemId: ownProps.dish.cartItemId }), 'quantity') : 0
    }
  }
}

export default connect(mapStateToProps, { increment, decrement, removeItem, addToCart })(SingleDishAddButton)



