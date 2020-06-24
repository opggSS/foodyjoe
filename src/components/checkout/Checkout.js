import React, { useState } from 'react'
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
import PriceInfo from './PriceInfo'
const alert = Modal.alert;

const Checkout = props => {
  
  const { cart, createOrder, history } = props
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
    if(newCart.totalPrice) delete newCart.totalPrice
    createOrder({
      ...newCart,
      isDelivery: isDelivery.flag,
      vendorId,
      //status in progress
      status: 1,
      arrivalTime: 'ASAP',
      paymentMethod: 'wechat',
      userId: 1232,
      history,
      receiverInfo: {
        address: userLocation,
        name: 'Jason Li',
        telephone: telephone
      },
      priceInfo : {
        orderTotal:cart.totalPrice,
        deliveryFee: deliFee,
        Tax:totalTax,
        subtotol:subTotal
      }
    })
  }
 

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
              setUserLng = {setUserLng}
              setUserLat = {setUserLat}
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
          <input maxLength='10' type="text" name="telephone" placeholder='Your Phone Number ...' onChange={(e) => setTelephone(e.target.value)} />
        </div>
        <div className="deliveryTime">
          <span className="left">Arrival Time</span>
          <span className="right">Choose Arrival time<img src={ArrowRight} alt="" className="arrowImg" /></span>
        </div>
        <div className="paymentMethod">
          <span className="left">Payment Method</span>
          <span className="right">Choose Payment Method<img src={ArrowRight} alt="" className="arrowImg" /> </span>
        </div>
      </div>
      <div className="infoContainer">

        <OrderInfo
          vendorName={cart.vendor.name}
          dishes={cart.dishes}
        />
      </div>
      <div className="infoContainer">
        <PriceInfo
          totalPrice={cart.totalPrice}
          baseDeliveryFee = {isDelivery.flag ? cart.vendor.delivery_fee : 0 }
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
    cart: state.cartState[ownProps.match.params.vendorId]
  }
}

export default connect(mapStateToProps, { createOrder })(withRouter(Checkout))