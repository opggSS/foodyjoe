import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Location from '../../assets/icons/location.png'
import ArrowRight from '../../assets/icons/arrow-right.png'
import Telephone from '../../assets/icons/telephone.png'
import { Link } from 'react-router-dom'
import { ReactComponent as BackDark } from '../../assets/icons/back_dark.svg'
import { createOrder } from '../../actions/order/createOrder'
import UserLocation from './UserLocation'
import { withRouter, Redirect } from "react-router-dom";
import ConfirmBtn from './ConfirmBtn'
import { Modal } from 'antd-mobile';
import Agreement from './Agreement'
import OrderInfo from './OrderInfo'
import Remark from './Remark'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PriceInfo from './PriceInfo'
import { Menu } from 'antd-mobile';

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
  const { cart, createOrder, history, user } = props
  const vendorId = props.match.params.vendorId
  const [isDelivery, setIsDelivery] = useState({
    flag: true,
    style: {
      left: {
        borderRadius: '4vw',
        color: 'black',
        fontWeight: '600',
        background: 'white'
      },
      right: {

      }
    }
  })
  const [userLocation, setUserLocation] = useState('')
  const [userLat, setUserLat] = useState('')
  const [userLng, setUserLng] = useState('')
  const [telephone, setTelephone] = useState('')
  const [deliFee, setDeliFee] = useState(0)
  const [totalTax, setTotalTax] = useState(0)
  const [subTotal, setSubTotal] = useState(0)
  const [arrivalTimeOpen, setArrivalTimeOpen] = useState(false)
  const [paymentMethodOpen, setPaymentMethodOpen] = useState(false)
  const [arrivalTime, setArrivalTime] = useState('ASAP')
  const [paymentMethod, setPaymentMethod] = useState('WeChat')

  useEffect(() => {
    if (user) {
      setTelephone(user.phone)
    }
  }, [user])


  const handleArrivalTimeChange = e => {
    setArrivalTime(e[0])
    setArrivalTimeOpen(false)
  }
  const handlePaymentMethodChange = e => {
    setPaymentMethod(e[0])
    setPaymentMethodOpen(false)
  }

  if (!cart) {
    return <Redirect to='/'></Redirect>
  }


  const placeOrder = () => {
    if (telephone === '') {
      alert('Please fill your phone number', '', [
        { text: 'Ok', onPress: () => console.log('ok') },
      ])
      return
    }
    if (isDelivery.flag && userLocation === '') {
      alert('Please fill destination', '', [
        { text: 'Ok', onPress: () => console.log('ok') },
      ])
      return
    }
    const newCart = { ...cart }
    if (newCart.vendor) delete newCart.vendor
    if (newCart.totalPrice) delete newCart.totalPrice
    if (newCart.quantity) delete newCart.quantity
    newCart.dishes.forEach(dish => {
      delete dish.vendor
    })

    const orderData = {
      ...newCart,
      isDelivery: isDelivery.flag,
      vendorId,
      //status in progress
      status: 1,
      arrivalTime: arrivalTime,
      paymentMethod: paymentMethod,
      history,
      userId: user.id,
      receiverInfo: {
        address: userLocation,
        name: user.username,
        telephone: telephone
      },
      priceInfo: {
        orderTotal: cart.totalPrice,
        deliveryFee: deliFee,
        tax: totalTax,
        subtotal: subTotal
      }
    }
    createOrder(orderData)
  }

  console.log(user)
  return (
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
          <div className="segmentItem" style={isDelivery.flag ? isDelivery.style.left : isDelivery.style.right} onClick={() => setIsDelivery({ ...isDelivery, flag: true })}>Delivery</div>
          <div className="segmentItem" style={isDelivery.flag ? isDelivery.style.right : isDelivery.style.left} onClick={() => setIsDelivery({ ...isDelivery, flag: false })} >Pick up</div>
        </div>
        {/* <SegmentedControl values={['Delivery', 'Pick up']} onChange={methodOnChange} onValueChange={methodOnValueChange} /> */}
      </div>
      <div className="googleMap">
        {/* this is a map */}
      </div>
      <div className="deliveryInfo infoContainer">
        <div className="location">
          <img src={Location} alt="" className="locationImg" />
          {isDelivery.flag ? (
            <UserLocation
              setUserAddress={(addr) => setUserLocation(addr)}
              setUserLng={setUserLng}
              setUserLat={setUserLat}
              defaultAddress={user ? user.address : null}
            />) : (
              <div>
                <div>Restaurants location:</div>
                <div>{cart && cart.vendor.address}</div>
              </div>
            )
          }
        </div>
        <div className="contactInfo">
          <img src={Telephone} alt="" className="telephone" />
          <input maxLength='10' type="text" name="telephone" value={user ? user.phone : null} placeholder='Your Phone Number ...' onChange={(e) => setTelephone(e.target.value)} />
        </div>
        <div className="deliveryTime">
          <span className="left">Arrival Time</span>
          <span className="right" onClick={() => setArrivalTimeOpen(!arrivalTimeOpen)}> {arrivalTime}<img src={ArrowRight} alt="" className="arrowImg" /></span>
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
          <span className="right" onClick={() => setPaymentMethodOpen(!paymentMethodOpen)}>{paymentMethod}<img src={ArrowRight} alt="" className="arrowImg" /> </span>
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
          vendorName={cart.vendor.name}
          dishes={cart.dishes}
        />
      </div>
      <div className="infoContainer">
        {console.log('234234235434')}
        <PriceInfo
          totalPrice={cart.totalPrice}
          baseDeliveryFee={isDelivery.flag ? cart.vendor.delivery_fee : 0}
          vendorLng={cart.vendor.longitude}
          vendorLat={cart.vendor.latitude}
          userLng={userLng}
          userLat={userLat}
          setDeliFee={setDeliFee}
          setTotalTax={setTotalTax}
          setSubTotal={setSubTotal}
        />
      </div>
      <div className="infoContainer"> <Remark /></div>
      <div className="infoContainer"> <Agreement /></div>

      <ConfirmBtn
        totalPrice={subTotal}
        placeOrder={placeOrder}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    cart: state.cartState[ownProps.match.params.vendorId],
    user: state.firestore.ordered.users ? state.firestore.ordered.users.find(user => user.id === state.firebase.auth.uid) : null
  }
}

export default compose(
  connect(mapStateToProps, { createOrder }),
  firestoreConnect(() => ['users'])
)(withRouter(Checkout));