import React from 'react'
import { connect } from 'react-redux'
import { setOrderDetail } from '../../actions/order/orderAction'
import { withRouter } from 'react-router-dom'
import { compose } from "redux";
import { GoogleApiWrapper } from "google-maps-react";
import { Link } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons';
import { updateUserInfo } from '../../actions/auth/authAction'

const DeliveryInfo = ({ setOrderDetail, deliveryInfo, orderDetail, updateUserInfo, history, google, user, location }) => {

  const { vendorGeoLocation, baseDeliveryFee } = location

  const handleDeleteDeliveryInfo = index => {
    const updatedDeliveryInfo = user.deliveryInfo.filter((info, i) => i !== index)
    updateUserInfo({
      user: {
        ...user,
        deliveryInfo: updatedDeliveryInfo
      },
      isGoBack : false
    })
  }
  const handleSelectInfo = (info) => {
    if (vendorGeoLocation) {
      const origin = new google.maps.LatLng(vendorGeoLocation.lat, vendorGeoLocation.lng);
      const destination = new google.maps.LatLng(info.lat, info.lng);
      const service = new google.maps.DistanceMatrixService();

      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.IMPERIAL,
        }, callback)

      history.goBack()

      function callback(res, status) {
        if (status !== 'OK') {
          console.log(status)
          throw status
        }
        const distance = res.rows[0].elements[0].distance.value
        let additionalDeliveryFee = 0
        if (distance > 5000) {
          additionalDeliveryFee = Math.ceil(distance / 1000 - 5) * 1.5
        }
        let totalDeliveryFee = Math.round((additionalDeliveryFee + Number(baseDeliveryFee)) * 100) / 100
        let tax = ((orderDetail.priceInfo.orderTotal + totalDeliveryFee) * 0.05).toFixed(2)
        let subtotal = (Number(orderDetail.priceInfo.orderTotal) + Number(totalDeliveryFee) + Number(tax)).toFixed(2)
        setOrderDetail({
          ...orderDetail,
          priceInfo: {
            ...orderDetail.priceInfo,
            deliveryFee: totalDeliveryFee,
            tax: tax,
            subtotal: subtotal
          },
          deliveryInfo: info
        })
      }
    }
  }

  return (
    <div className="deliveryInfo">
      <Link to='/deliveryinfo/create'>
        <div className="deliveryInfoHeader" >+ Create New Delivery Info</div>
      </Link>
      {deliveryInfo &&
        deliveryInfo.map((info, index) => {
          return (
            <div key={index} onClick={() => handleSelectInfo(info)} className='singleInfo'>
              <div>{info.address}</div>
              <div>{info.name}</div>
              <div>{info.phone}</div>
              <span className="trashCan" onClick={() => handleDeleteDeliveryInfo(index)}><DeleteOutlined /></span>
            </div>
          )
        })
      }
    </div>
  )
}
const mapStateToProps = state => {
  console.log(state)
  return {
    deliveryInfo: state.auth.deliveryInfo,
    orderDetail: state.orderDetail,
    user: state.auth
  }
}

export default compose(
  connect(mapStateToProps, { setOrderDetail, updateUserInfo }),
  withRouter,
  GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAP_API,
  }),
)(DeliveryInfo);