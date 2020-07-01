import React  from 'react'
import { GoogleApiWrapper } from "google-maps-react";
import { connect } from 'react-redux'
import { compose } from "redux";

const PriceInfo = ({
  priceInfo,
}) => {

  return (
    <>
      <div className="priceInfoRow">
        <span>Total Order Price</span>
        <span>${priceInfo.orderTotal}</span>
      </div>
      <div className="priceInfoRow">
        <span>Delivery Fee</span>
        <span>${priceInfo.deliveryFee}</span>
      </div>
      <div className="priceInfoRow">
        <span>GST</span>
        <span>${priceInfo.tax}</span>
      </div>

      <div className="priceInfoRow">
        <span>Subtotal</span>
        <span>${priceInfo.subtotal}</span>
      </div>

    </>
  )
}

const mapStateToProps = state => {
  return {
    priceInfo: state.orderDetail.priceInfo,
  }
}



export default compose(
  GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAP_API,
  }),
  connect(mapStateToProps)
)(PriceInfo);



