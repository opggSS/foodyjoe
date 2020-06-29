import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from "react-router";
import { compose } from "redux";
import { clearCart } from '../../actions/cart/clearCart'
import { ReactComponent as Close } from '../../assets/icons/close.svg'
import { Modal } from 'antd-mobile';
import SingleVendorCart from './SingleVendorCart'
import _ from 'lodash'

const alert = Modal.alert;

const CompleteCart = ({ clearCart, lastVisitedVendorId, carts }) => {

  const dishes = () => {    
    if(!_.isEmpty(carts) ){
      for (let vendorId in carts) {
        return <SingleVendorCart singleCart={carts[vendorId]} />
      }
    }
    else {
      return 'sdf'
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
        <Link to={lastVisitedVendorId ? 'vendor/'+ lastVisitedVendorId : '/' }>
          <span className="closeButton" ><Close /></span>
        </Link>

        <div className="yourCart">Your Cart</div>
        {!_.isEmpty(carts) && (
          <span className="clearCartButton" onClick={handleClearCart}>clear</span>
        )}
      </div>
      {!_.isEmpty(carts) ?
        dishes()

        : (
          <div className="cartEmpty">Your Cart is Empty</div>
        )}

    </div>
  )
}

const mapStateToProps = state => ({
  carts: state.cartState,
  lastVisitedVendorId: state.lastVisitedVendorIdState
})

export default compose(
  withRouter,
  connect(mapStateToProps, { clearCart })
)(CompleteCart);



