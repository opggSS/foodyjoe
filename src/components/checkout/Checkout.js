import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Location from '../../assets/icons/location.png'
import ArrowRight from '../../assets/icons/arrow-right.png'
import Telephone from '../../assets/icons/telephone.png'
import { Link } from 'react-router-dom'
import { ReactComponent as BackDark } from '../../assets/icons/back_dark.svg'
import { createOrder } from '../../actions/order/orderAction'
import { setOrderDetail } from '../../actions/order/orderAction'
import { withRouter, Redirect } from "react-router-dom";
import ConfirmBtn from './ConfirmBtn'
import { Modal } from 'antd-mobile';
import Agreement from './Agreement'
import OrderInfo from './OrderInfo'
import Remark from './Remark'
import PriceInfo from './PriceInfo'
import { Menu } from 'antd-mobile';
import { compose } from "redux";

const alert = Modal.alert;

const data = [
  {
    value: 'ASAP',
    label: 'ASAP',
  },
  {
    value: '13:00 ~ 13:30',
    label: '13:00 ~ 13:30',
  },
  {
    value: '13:30 ~ 14:00',
    label: '13:30 ~ 14:00',
  },
  {
    value: '14:00 ~ 14:30',
    label: '14:00 ~ 14:30',
    isLeaf: true,
  },
];
const dataPayment = [
  {
    value: 'WeChat',
    label: 'WeChat',
  }, {
    value: 'Alipay',
    label: 'Alipay',
  },
  {
    value: 'paypal',
    label: 'paypal',
  },
  {
    value: 'credit card',
    label: 'credit card',
  },
];

const Checkout = props => {
  const { cart, createOrder, setOrderDetail, orderDetail, history, user, vendor } = props

  const vendorId = vendor ? vendor.id : null
  const selectedStyle = {
    borderRadius: '4vw',
    color: 'black',
    fontWeight: '600',
    background: 'white'
  }

  const [arrivalTimeOpen, setArrivalTimeOpen] = useState(false)
  const [paymentMethodOpen, setPaymentMethodOpen] = useState(false)
  const [isDelivery, setIsDelivery] = useState(true)

  useEffect(() => {
    if (cart && vendor) {
      const newCart = { ...cart }
      delete newCart.totalPrice
      delete newCart.quantity
      if (isDelivery) {
        const totalBeforeTax = Number((Number(cart.totalPrice) + Number(vendor.delivery_fee)).toFixed(2))
        const tax = Number((totalBeforeTax * 0.05).toFixed(2))
        const subtotal = Number((totalBeforeTax * 1.05).toFixed(2))
        setOrderDetail({
          ...newCart,
          isDelivery: true,
          vendorId,
          //status in progress
          status: 1,
          arrivalTime: 'ASAP',
          paymentMethod: 'WeChat',
          history,
          userId: user.id,
          deliveryInfo: orderDetail.deliveryInfo || null,
          priceInfo: {
            orderTotal: totalBeforeTax,
            deliveryFee: Number((vendor.delivery_fee).toFixed(2)),
            tax: tax,
            subtotal: subtotal
          }
        })
      }
      else {
        const totalBeforeTax = Number((cart.totalPrice).toFixed(2))
        const tax = Number((0.05*totalBeforeTax).toFixed(2))
        const subtotal =  Number((1.05*totalBeforeTax).toFixed(2))

        setOrderDetail({
          ...newCart,
          isDelivery: false,
          vendorId,
          //status in progress
          status: 1,
          arrivalTime: 'ASAP',
          paymentMethod: 'WeChat',
          history,
          userId: user.id,
          deliveryInfo: null,
          priceInfo: {
            orderTotal: totalBeforeTax,
            deliveryFee: 0,
            tax: tax,
            subtotal: subtotal
          }
        })
      }
      // initialize order detail
    }

  }, [cart, history, setOrderDetail, user, vendor, vendorId, isDelivery])



  if (!cart) {
    return <Redirect to='/'></Redirect>
  }

  const handleArrivalTimeChange = e => {
    setOrderDetail({
      ...orderDetail,
      arrivalTime: e[0]
    })
    setArrivalTimeOpen(false)
  }
  const handlePaymentMethodChange = e => {
    setOrderDetail({
      ...orderDetail,
      paymentMethod: e[0]
    })
    setPaymentMethodOpen(false)
  }


  const placeOrder = () => {
    console.log(orderDetail)
    if (!orderDetail.deliveryInfo && isDelivery) {
      alert('Please select delivering info', '', [
        { text: 'Ok', onPress: () => console.log('ok') },
      ])
      return
    }
    createOrder(orderDetail)
  }


  return (
    orderDetail.dishes ?
      <div className="checkout">
        <div className="header">
          <span>
            <Link to='/cart'>
              <BackDark />
            </Link>
          </span>
          Comfirm Order
        </div>
        <div className="segment">
          <div className="segmentTag">
            <div
              className="segmentItem"
              style={isDelivery ? selectedStyle : {}}
              onClick={() => setIsDelivery(true)}
            >Delivery</div>
            <div
              className="segmentItem"
              style={!isDelivery ? selectedStyle : {}}
              onClick={() => setIsDelivery(false)}
            >Pick up</div>
          </div>
        </div>
        <div className="googleMap">
          {/* this is a map */}
        </div>
        <div className="deliveryInfo infoContainer">
          <div className="location">
            <img src={Location} alt="" className="locationImg" />
            {orderDetail.isDelivery ?
              <Link to={{
                pathname: `/deliveryInfo`,
                vendorGeoLocation: { lat: vendor.latitude, lng: vendor.longitude },
                baseDeliveryFee: vendor.delivery_fee
              }}>
                {console.log(orderDetail)}
                {orderDetail.deliveryInfo ?
                  (<div>
                    <div>{orderDetail.deliveryInfo.address}</div>
                    <div>{orderDetail.deliveryInfo.name}</div>
                    <div>{orderDetail.deliveryInfo.phone}</div>
                  </div>) :
                  <div>Set up Delivery Information</div>
                }
              </Link> :
              (
                <div>
                  <div>Restaurants location:</div>
                  <div>{vendor && vendor.address}</div>
                </div>
              )
            }
          </div>

          <div className="deliveryTime">
            <span className="left">Arrival Time</span>
            <span className="right"
              onClick={() => setArrivalTimeOpen(!arrivalTimeOpen)}>
              {orderDetail.arrivalTime}
              <img src={ArrowRight} alt="" className="arrowImg" />
            </span>
            {arrivalTimeOpen &&
              <Menu
                className="single-foo-menu"
                data={data}
                value={['ASAP']}
                level={1}
                onChange={handleArrivalTimeChange}
                height={document.documentElement.clientHeight * 0.2}
              />
            }
          </div>
          <div className="paymentMethod">
            <span className="left">Payment Method</span>
            <span className="right" onClick={() => setPaymentMethodOpen(!paymentMethodOpen)}>{orderDetail.paymentMethod}<img src={ArrowRight} alt="" className="arrowImg" /> </span>
            {paymentMethodOpen &&
              <Menu
                className="single-foo-menu"
                data={dataPayment}
                value={['WeChat']}
                level={1}
                onChange={handlePaymentMethodChange}
                height={document.documentElement.clientHeight * 0.2}
              />
            }
          </div>
        </div>
        <div className="infoContainer">
          <OrderInfo
            vendorName={vendor.name}
            dishes={cart.dishes}
          />
        </div>
        <div className="infoContainer">
          <PriceInfo />
        </div>
        <div className="infoContainer"> <Remark /></div>
        <div className="infoContainer"> <Agreement /></div>

        <ConfirmBtn
          totalPrice={orderDetail.priceInfo ? orderDetail.priceInfo.subtotal : 0}
          placeOrder={placeOrder}
        />
      </div > :
      <div>loading...</div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const cart = state.cartState[ownProps.match.params.vendorId]

  return {
    cart: cart,
    user: state.auth,
    vendor: state.vendors ? state.vendors.find(vendor => vendor.id === ownProps.match.params.vendorId) : null,
    orderDetail: state.orderDetail
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, { createOrder, setOrderDetail })
)(Checkout);