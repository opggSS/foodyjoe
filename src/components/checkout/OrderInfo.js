import React from 'react'

export default function OrderInfo({ vendorName, dishes }) {
  return (
    <>
      <div className="vendorName">
        {vendorName}
      </div>
      <div>
        {dishes.map((dish, index) => {
          let selectableText = ''
          if (dish.selectables.length > 0) {
            dish.selectables.forEach(selectable => {
              selectableText += selectable.name
              selectableText += ' - '
              selectable.option.forEach(op => {
                selectableText += op.name
                selectableText += ' '
              })
            })
          }
          return (
            <div className="singleDishInfo" key={index}>
              <img src={dish.photo} alt="" />
              <span className="first"> {dish.name}</span>
              <span className="second" >X{dish.quantity}</span>
              <span className="third">${dish.price * dish.quantity}</span>
              {selectableText.length > 0 && 
              (<span className="fourth"> {selectableText}</span>)}
            </div>
          )
        })}
      </div>
    </>

  )
}
