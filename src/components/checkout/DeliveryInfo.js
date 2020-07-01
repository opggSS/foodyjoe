import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setOrderDetail } from '../../actions/order/orderAction'
import { withRouter } from 'react-router-dom'
import { compose } from "redux";
import { GoogleApiWrapper } from "google-maps-react";
import { Link } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons';
import { updateUserInfo } from '../../actions/auth/authAction'
import { Modal } from 'antd-mobile';
const alert = Modal.alert;


const DeliveryInfo = ({ setOrderDetail, deliveryInfo, orderDetail, updateUserInfo, history, google, user, location }) => {

  useEffect(() => {
    if (location.vendorGeoLocation && location.baseDeliveryFee) {
      setOrderDetail({
        ...orderDetail,
        vendorGeoLocation: location.vendorGeoLocation,
        baseDeliveryFee: location.baseDeliveryFee
      })
    }
  }, [location.baseDeliveryFee, location.vendorGeoLocation])


  const handleDeleteDeliveryInfo = (index, event) => {
    event.stopPropagation()
    const updatedDeliveryInfo = user.deliveryInfo.filter((info, i) => i !== index)
    updateUserInfo({
      user: {
        ...user,
        deliveryInfo: updatedDeliveryInfo
      },
      isGoBack: false
    })
  }
  const handleSelectInfo = (info) => {
    if (orderDetail.vendorGeoLocation) {
      const origin = new google.maps.LatLng(orderDetail.vendorGeoLocation.lat, orderDetail.vendorGeoLocation.lng);
      const destination = new google.maps.LatLng(info.lat, info.lng);
      const service = new google.maps.DistanceMatrixService();

      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.IMPERIAL,
        }, (res, status) => {
          if (status !== 'OK') {
            alert('Error getting address', '', [
              { text: 'Ok', onPress: () => console.log('ok') },
            ])
          }
          else {
            if (!res.rows[0].elements[0].distance) {
              alert('Cannot reach this destination', '', [
                { text: 'Ok', onPress: () => console.log('ok') },
              ])
            }
            else {
              const distanceInMeter = res.rows[0].elements[0].distance.value
              let additionalDeliveryFee = 0
              if (distanceInMeter > 5000) {
                additionalDeliveryFee = Math.ceil(distanceInMeter / 1000 - 5) * 1.5
              }
              let totalDeliveryFee = Math.round((additionalDeliveryFee + Number(orderDetail.baseDeliveryFee)) * 100) / 100
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
              history.goBack()
            }
          }
        })
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
              <span className="trashCan" onClick={(e) => handleDeleteDeliveryInfo(index, e)}><DeleteOutlined /></span>
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