import React, { useState, useEffect } from 'react'
import { GoogleApiWrapper } from "google-maps-react";
import { connect } from 'react-redux'
import { compose } from "redux";

const PriceInfo = ({
  setDeliFee,
  setTotalTax,
  setSubTotal,
  totalPrice,
  baseDeliveryFee,
  userLat,
  userLng,
  vendorLat,
  vendorLng,
  google,
  userLocation
}) => {

  const totalBeforeTax = Number(totalPrice) + Number(baseDeliveryFee)
  const [deliveryFee, setDeliveryFee] = useState(baseDeliveryFee)
  const [tax, setTax] = useState((totalBeforeTax * 0.05).toFixed(2))
  const [subtotal, setSubtotal] = useState((totalBeforeTax * 1.05).toFixed(2))

  useEffect(() => {
    setSubTotal((totalBeforeTax * 1.05).toFixed(2))
    setSubtotal((totalBeforeTax * 1.05).toFixed(2))
    setDeliveryFee(baseDeliveryFee)
    setDeliFee(baseDeliveryFee)
    setTax((totalBeforeTax * 0.05).toFixed(2))
    setTotalTax((totalBeforeTax * 0.05).toFixed(2))
  }, [baseDeliveryFee, setDeliFee, setSubTotal, setTotalTax, totalBeforeTax, totalPrice])

  const bool = userLat && userLng && userLocation.lat !== userLat && userLocation.lng !== userLng

  if (bool) {
    const origin = new google.maps.LatLng(vendorLat, vendorLng);
    const destination = new google.maps.LatLng(userLat, userLng);
    console.log(vendorLat, vendorLng)
    console.log(userLat, userLng)
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.IMPERIAL,
      }, callback);

    function callback(response, status) {
      if (status !== 'OK') {
        console.log(status)
        return
      }
      const distance = response.rows[0].elements[0].distance.value
      let additionalDeliveryFee = 0
      if (distance <= 5000) {
        additionalDeliveryFee = 0
      }
      else {
        additionalDeliveryFee = Math.ceil(distance / 1000 - 5) * 1.5
      }
      let total = Math.round((additionalDeliveryFee + Number(baseDeliveryFee)) * 100) / 100
      let currentTax = ((totalPrice + total) * 0.05).toFixed(2)
      let currentSubtotal = (Number(totalPrice) + Number(total) + Number(currentTax)).toFixed(2)
      setTax(currentTax)
      setTotalTax(currentTax)
      setDeliveryFee(total)
      setDeliFee(total)
      setSubtotal(currentSubtotal)
      setSubTotal(currentSubtotal)
    }
  }

  return (
    <>
      <div className="priceInfoRow">
        <span>Total Order Price</span>
        <span>${totalPrice}</span>
      </div>
      <div className="priceInfoRow">
        <span>Delivery Fee</span>
        <span>${deliveryFee}</span>
      </div>
      <div className="priceInfoRow">
        <span>GST</span>
        <span>${tax}</span>
      </div>

      <div className="priceInfoRow">
        <span>Subtotal</span>
        <span>${subtotal}</span>
      </div>

    </>
  )
}

const mapStateToProps = state => {
  return {
    userLocation: state.userLocation
  }
}

export default compose(
  GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAP_API,
  }),
  connect(mapStateToProps, { })
)(PriceInfo);


