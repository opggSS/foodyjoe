import React from 'react'
import CompleteCartSingleDish from './CompleteCartSingleDish'
import SingleVendorCartFooter from './SingleVendorCartFooter.component'
export default function SingleVendorCart({ singleCart }) {

  const renderSingleDish = () => {
    return singleCart.dishes.map((dish, index) => {
      let selectableText = ''
      dish.selectables.forEach(selectable => {
        selectableText += selectable.name
        selectableText += ' - '
        selectable.option.forEach(op => {
          selectableText += op.name
          selectableText += ' '
        })
      })
      return (
        <CompleteCartSingleDish
          key={index}
          selectableText={selectableText}
          dish={dish}
          vendor={singleCart.vendor}
        />
      )
    })
  }
  return (
    <>
      <div className="vendorRow">
        <img src={singleCart.vendor.logo} alt={singleCart.vendor.name} />
        <span>{singleCart.vendor.name}</span>
        <span className="dishCategory"> {singleCart.dishes.length}类商品</span>
      </div>

      <div className="dishInCartContainer">
        {renderSingleDish()}
        <SingleVendorCartFooter 
          totalPrice ={singleCart.totalPrice} 
          vendorId = {singleCart.vendor.id}
          />
      </div>
    </>
  )
}
