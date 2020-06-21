import React from 'react'
import { connect } from 'react-redux'
import { SegmentedControl } from 'antd-mobile';
import Location from '../../assets/icons/location.png'
import ArrowRight from '../../assets/icons/arrow-right.png'
import Telephone from '../../assets/icons/telephone.png'
import { Link } from 'react-router-dom'
import { ReactComponent as BackDark } from '../../assets/icons/back_dark.svg'
const Checkout = ({ cart }) => {
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
        <SegmentedControl values={['Delivery', 'Pick up']} />
      </div>
      <div className="googleMap">

        this is a map
      </div>
      <div className="deliveryInfo">
        <Link>
          <div className="location">
            <img src={Location} alt="" className="locationImg" />
            <span>9109 cook road Richmond bc ,</span>
            <img src={ArrowRight} alt="" className="arrowImg" />
          </div>
        </Link>
        <div className="contactInfo">
          <img src={Telephone} alt="" className="telephone" />
          <span> 6042423424</span>
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
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    cart: state.cartState[ownProps.match.params.vendorId]
  }
}

export default connect(mapStateToProps, {})(Checkout)