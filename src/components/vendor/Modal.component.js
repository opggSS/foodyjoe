import React, { useState, useEffect } from 'react'
import Close from '../../assets/icons/close.svg'
import { Modal } from 'antd-mobile';
const alert = Modal.alert;

export default function DishModal({ attrs, handleCloseModal, basePrice }) {
  const selectedOptions = []
  attrs.forEach(option => {
    selectedOptions.push({
      name: option.name,
      option: []
    })
  })

  const [selectedOption, setSelectedOption] = useState(selectedOptions)
  const [quantity, setQuantity] = useState(1)
  const [itemPrice, setItemPrice] = useState(basePrice)
  const [isFinishSelection, setIsFinishSelection] = useState(Array(attrs.length).fill(false))
  const [isDone, setIsDone] = useState(false)

  const checkFinishSelection = () => {
    isFinishSelection.forEach(flag => {
      if (!flag) {
        setIsDone(false)
        return
      }
    })
    setIsDone(true)
  }

  useEffect(() => {
    let isFinishSelectionCopy = isFinishSelection.slice()
    attrs.forEach((option, index) => {
      if (option.min === 0) {
        isFinishSelectionCopy[index] = true
        setIsFinishSelection(isFinishSelectionCopy)
      }
    })
  }, [isFinishSelection, attrs]);


  const toggleSelection = (e, index, selection, max, min, option, price) => {
    const elmClasses = e.target.classList
    if (selectedOption[index].option.length === max && !elmClasses.contains('active')) {
      alert(`${option}最多可选择${max}项`, '', [
        { text: 'Ok' }
      ])
    }
    else {
      let isFinishSelectionCopy = isFinishSelection.slice()
      elmClasses.toggle('active');
      let selectedOptionCopy = selectedOption.slice()

      // added option
      if (elmClasses.contains('active')) {
        if (selectedOption[index].option.length === min-1) {
          isFinishSelectionCopy[index] = true;
          setIsFinishSelection(isFinishSelectionCopy)
          checkFinishSelection()
        }
        selectedOptionCopy[index].option.push({
          name: selection
        })
        setItemPrice(itemPrice + price)
        setSelectedOption(selectedOptionCopy)
        
      }

      //removed option
      else {
        if (selectedOption[index].option.length === min) {
          isFinishSelectionCopy[index] = false
          setIsFinishSelection(isFinishSelectionCopy)
          setIsDone(false)
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
        alert('请完成选择', '', [
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
      return `可选${max}项`
    }
    else if (min === max) {
      return `必选${max}项`
    }
    else {
      return `可选${min}~${max}项`
    }
  }
  return (

    <div className='dishModal'>
      {console.log(selectedOption)}
      <div className="container">
        <div className="head">
          <img src={Close} alt='sdf' onClick={handleCloseModal} />
          <span className='title'>选择规格</span>
        </div>
        {attrs.map((option, index) => {
          return (
            <div>
              <div className="optionTitle">
                {option.name}
                <span>{optionType(option.min, option.max)}</span>
              </div>
              {option.values.map(selection => {
                return (
                  <div className="optionSelection" onClick={(e) => toggleSelection(e, index, selection.name, option.max, option.min, option.name, selection.price)} >
                    {selection.name}{selection.price !== 0 && '($' + selection.price + ')'}
                  </div>
                )
              })}
            </div>
          )
        })}
        <div className="quantity">
          <span className='text'>数量</span>
          <div className='addition'>
            <span onClick={() => handleQuantity(false)}>-</span>
            <span> {quantity} </span>
            <span onClick={() => handleQuantity(true)}>+</span>
          </div>
        </div>
        <div className="addToCart">
          <span className='text'>${itemPrice * quantity}</span>
          <div className='addition'>
            <span onClick={() => console.log('add to cart')}>加入购物车</span>
          </div>
        </div>
      </div>

    </div>
  )
}
