import React from 'react'
import SingleDishAddButton from '../vendor/SingleDishAddButton'

export default function CompleteCartSingleDish({ dish, selectableText, vendor }) {
  return (
    <div className="cartSingleDish" >
      <img src={dish.photo} alt={dish.name} />
      <div className="dishContent">
        <div>{dish.name}</div>
        <div>{selectableText}
        </div>
        <div>${dish.price}</div>
        <SingleDishAddButton
          dish={dish}
          isCompleteCart={true}
        />
      </div>
    </div >
  )
}
