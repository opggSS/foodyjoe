import React, { useState } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import SelectOptionModal from './SelectOptionModal'
import { increment } from '../../actions/increment'
import { decrement } from '../../actions/decrement'
import { removeItem } from '../../actions/removeItem'
import { addToCart } from '../../actions/addToCart'

const SingleDishAddButton = ({ increment, decrement, removeItem, addToCart, dishQuantity = 0, vendorInfo, dish, isCompleteCart, isVendorMenu }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [cartItemId ,setCartItemId] = useState(null)
  const handleAddtoCart = () => {
    let itemId = Date.now()
    setCartItemId(itemId)

    const cartObj = {
      ...vendorInfo,
      dishPrice: dish.dishPrice,
      quantity: 1,
      dishImage: dish.dishImage,
      dishName: dish.dishName,
      dishId: dish.dishId,
      selectables: [],
      cartItemId: itemId
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
        cartItemId: dish.cartItemId ? dish.cartItemId : cartItemId ,
        quantity:1
      })
    }
  }

  const handleDecrement = () => {
    if (dishQuantity === 1) {
      removeItem(dish.cartItemId || cartItemId)
    }
    else {
      decrement(dish.cartItemId || cartItemId)
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
          vendorInfo={vendorInfo}
          dish={dish}
        />
      }
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  if (ownProps.isVendorMenu) {
    return {
      dishQuantity: _.result(_.find(state.cartState.dishes, { dishId: ownProps.dish.dishId }), 'quantity')
    }
  }
  else {
    return {
      dishQuantity: _.result(_.find(state.cartState.dishes, { cartItemId: ownProps.dish.cartItemId }), 'quantity')
    }
  }
}

export default connect(mapStateToProps, { increment, decrement, removeItem, addToCart })(SingleDishAddButton)



