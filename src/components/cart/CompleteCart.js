import React , {useState}from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { compose } from "redux";
import { clearCart } from '../../actions/clearCart'
import { ReactComponent as Close } from '../../assets/icons/close.svg'
import { Modal, Icon, Popover } from 'antd-mobile';
import SingleDishAddButton from '../vendor/SingleDishAddButton'
import ShortCart from './shortCart'
const Item = Popover.Item;
const alert = Modal.alert;

const CompleteCart = ({ clearCart, cartDishes, vendorImage, vendorName, vendorId, history, dishQuantity }) => {

  const [popoverVisible,setPopoverVisible] = useState(false)

  const dishes = () => {
    return cartDishes.map(dish => {
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
        <div className="cartSingleDish">
          <img src={dish.dishImage} alt={dish.dishName} />
          <div className="dishContent">
            <div>{dish.dishName}</div>
            <div>{selectableText}
            </div>
            <div>${dish.dishPrice}</div>
            <SingleDishAddButton
              dish={dish}
              dishInfo={{
                vendorName,
                vendorImage,
                vendorId
              }}
              isCompleteCart={true}
            />
          </div>
        </div >
      )
    })
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
        {dishQuantity > 0 && (
          <span className="clearCartButton" onClick={handleClearCart}>clear</span>
        )}
      </div>
      {cartDishes.length > 0 ? (
        <>
          <div className="vendorRow">
            <img src={vendorImage} alt={vendorName} />
            <span>{vendorName}</span>
            <span className="dishCategory"> {cartDishes.length}类商品</span>
          </div>

          <div className="dishInCartContainer">
            {dishes()}
          </div>
        </>
      ) : (
          <div className="cartEmpty">你的购物车空空如也</div>
        )}
      <ShortCart isCompleteCart />
    </div>
  )
}

const mapStateToProps = state => ({
  cartDishes: state.cartState.dishes,
  vendorImage: state.cartState.vendorImage,
  vendorName: state.cartState.vendorName,
  vendorId: state.cartState.vendorId,
  dishQuantity: state.cartState.dishes.length
})

export default compose(
  withRouter,
  connect(mapStateToProps, { clearCart })
)(CompleteCart);

