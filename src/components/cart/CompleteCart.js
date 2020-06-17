import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { compose } from "redux";
import { clearCart } from '../../actions/cart/clearCart'
import { ReactComponent as Close } from '../../assets/icons/close.svg'
import { Modal } from 'antd-mobile';
import SingleVendorCart from './SingleVendorCart'
import _ from 'lodash'

const alert = Modal.alert;

const CompleteCart = ({ clearCart, history, carts }) => {

  
  const dishes = () => {
    for(let vendorId in carts){
      return <SingleVendorCart singleCart={carts[vendorId]}/>
    }

  }

  const handleClearCart = () => {
    alert('清空购物车', 'Are you sure???', [
      { text: 'Cancel', onPress: () => console.log('cancel') },
      { text: 'Ok', onPress: () => clearCart() },
    ])
  }

  return (
    <div className="completeCart">
      <div className="completeCartHeader">
        <span className="closeButton" onClick={() => history.goBack()} ><Close /></span>
        <div className="yourCart">Your Cart</div>
        {!_.isEmpty(carts) && (
          <span className="clearCartButton" onClick={handleClearCart}>clear</span>
        )}
      </div>
      { !_.isEmpty(carts) ? 
        dishes()
        
       : (
          <div className="cartEmpty">你的购物车空空如也</div>
        )}

    </div>
  )
}

const mapStateToProps = state => ({
  carts: state.cartState,
})

export default compose(
  withRouter,
  connect(mapStateToProps, { clearCart })
)(CompleteCart);

