import React from 'react'
import { connect } from 'react-redux'
import { SegmentedControl } from 'antd-mobile';
import Location from '../../assets/icons/location.png'
import ArrowRight from '../../assets/icons/arrow-right.png'
import Telephone from '../../assets/icons/telephone.png'
import { Link } from 'react-router-dom'
import { ReactComponent as BackDark } from '../../assets/icons/back_dark.svg'
const Checkout = ({ cart }) => {
  console.log(cart)
  return (
    <div className="checkout">
      <div className="header">
        <span>
          <Link to='/cart'>
            <BackDark />
          </Link>
        </span>
          订单确认
        </div>
      <div className="segment">
        <SegmentedControl values={['外卖', '自提']} />
      </div>
      <div className="googleMap">

        this is a map
      </div>
      <div className="deliveryInfo">
        <Link>
          <div className="location">
            <img src={Location} alt="" className="locationImg" />
            <span>2342- 9188 cook road richmodn bc ,</span>
            <img src={ArrowRight} alt="" className="arrowImg" />
          </div>
        </Link>
        <div className="contactInfo">
          <img src={Telephone} alt="" className="telephone" />
          <span> 60424234234</span>
        </div>
        <div className="deliveryTime">
          <span className="left">送达时间</span>
          <span className="right">选择送达时间  <img src={ArrowRight} alt="" className="arrowImg" /></span>
        </div>
        <div className="paymentMethod">
          <span className="left">支付方式</span>
          <span className="right">选择支付方式  <img src={ArrowRight} alt="" className="arrowImg" /> </span>
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