import React, { useState, useEffect } from 'react'
import Close from '../../assets/icons/close.svg'
import { Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import { addToCart } from '../../actions/cart/addToCart'
import { increment } from '../../actions/cart/increment'
import _ from 'lodash'

const alert = Modal.alert;

const SelectOptionModal = ({ handleCloseModal, addToCart, dish, sameDishInCart, increment, vendorId }) => {

  const selectedOptions = []
  dish.selectables.forEach(option => {
    selectedOptions.push({
      name: option.name,
      option: []
    })
  })

  const [selectedOption, setSelectedOption] = useState(selectedOptions)
  const [quantity, setQuantity] = useState(1)
  const [itemPrice, setItemPrice] = useState(dish.price)
  const [isFinishSelection, setIsFinishSelection] = useState(Array(dish.selectables.length).fill(false))
  const [isDone, setIsDone] = useState(false)



  useEffect(() => {
    let isFinishSelectionCopy = isFinishSelection.slice()
    dish.selectables.forEach((option, index) => {
      if (option.min === 0) {
        isFinishSelectionCopy[index] = true
        setIsFinishSelection(isFinishSelectionCopy)
      }
    })

  }, [dish.selectables, isFinishSelection]);

  useEffect(() => {
    let isFinish = true;
    isFinishSelection.forEach(flag => {
      if (!flag) {
        isFinish = false
        return
      }
    })
    setIsDone(isFinish)
  }, [isFinishSelection]);

  const toggleSelection = (e, index, selection, max, min, option, price) => {
    const elmClasses = e.target.classList
    if (selectedOption[index].option.length === max && !elmClasses.contains('active')) {
      alert(`${option}You can select at most ${max} selectables!`, '', [
        { text: 'Ok' }
      ])
    }
    else {
      let isFinishSelectionCopy = isFinishSelection.slice()
      elmClasses.toggle('active');
      let selectedOptionCopy = selectedOption.slice()

      // added option
      if (elmClasses.contains('active')) {
        if (selectedOption[index].option.length === min - 1) {
          isFinishSelectionCopy[index] = true;
          setIsFinishSelection(isFinishSelectionCopy)
        }
        selectedOptionCopy[index].option.push({
          name: selection
        })
        setItemPrice(Math.round((itemPrice + price) * 100) / 100)
        setSelectedOption(selectedOptionCopy)

      }

      //removed option
      else {
        if (selectedOption[index].option.length === min) {
          isFinishSelectionCopy[index] = false
          setIsFinishSelection(isFinishSelectionCopy)
          setQuantity(1)
        }

        selectedOptionCopy[index].option = selectedOptionCopy[index].option.filter((op) => op.name !== selection)
        setItemPrice(itemPrice - price)
        setSelectedOption(selectedOptionCopy)
      }
    }
  }

  const handleQuantity = flag => {
    if (flag) {
      if (isDone) {
        setQuantity(quantity + 1)
      }
      else {
        alert('Please select', '', [
          { text: 'Ok' }
        ])
      }
    }
    else {
      if (isDone && quantity > 1) {
        setQuantity(quantity - 1)
      }
    }
  }

  const optionType = (min, max) => {
    if (min === 0) {
      return `0~${max}`
    }

    else if (min === max) {
      return `Choose ${max} *required`
    }
    else {
      return `Choose${min}~${max} *required`
    }
  }

  const handleAddtoCart = () => {
    if (isDone) {
      let flag = false
      sameDishInCart.length > 0 &&
      sameDishInCart.some((dish) => {
        console.log(dish.selectables)
        console.log(selectedOption)
        if (_.isEqual(dish.selectables, selectedOption)) {
          increment({
            cartItemId: dish.cartItemId,
            quantity: quantity,
            vendor: vendorId
          })
          handleCloseModal()
          flag = true
          return true
        }
      })

      if (flag) return

      const cartObj = {
        vendor: vendorId,
        quantity,
        dish: {
          ...dish,
          selectables: selectedOption,
          quantity: quantity,
          price: itemPrice,
          cartItemId: Date.now()
        },
      }
      addToCart(cartObj)
      handleCloseModal()
    }
    else {
      alert('Finish Selection to proceed', '', [
        { text: 'Ok' }
      ])
    }
  }

  return (
    <div className='dishModal'>
      <div className="container">
        <div className="head">
          <img src={Close} alt='sdf' onClick={handleCloseModal} />
          <span className='title'>Select options</span>
        </div>
        {dish.selectables.map((option, index) => {
          return (
            <div key={index}>
              <div className="optionTitle">
                {option.name}
                <span>{optionType(option.min, option.max)}</span>
              </div>
              {option.values.map((selection, i) => {
                return (
                  <div key={i} className="optionSelection" onClick={(e) => toggleSelection(e, index, selection.name, option.max, option.min, option.name, selection.price)} >
                    {selection.name}{selection.price !== 0 && '($' + selection.price + ')'}
                  </div>
                )
              })}
            </div>
          )
        })}
        <div className="quantity">
          <span className='text'>quantity</span>
          <div className='addition'>
            <span onClick={() => handleQuantity(false)}>-</span>
            <span> {quantity} </span>
            <span onClick={() => handleQuantity(true)}>+</span>
          </div>
        </div>
        <div className="addToCart">
          <span className='text'>${(itemPrice * quantity).toFixed(2)}</span>
          <div className='addition'>
            <span onClick={handleAddtoCart}>Add to Cart</span>
          </div>
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = (state, ownProps) => {
  const singleVendorCart = state.cartState[ownProps.vendorId]

  let dishInCart = []
  if (!_.isEmpty(singleVendorCart)) {
    dishInCart = singleVendorCart.dishes.filter(dish =>
      dish.id === ownProps.dish.id)
  }


  return {
    sameDishInCart: dishInCart
  }
}


export default connect(mapStateToProps, { addToCart, increment })(SelectOptionModal)