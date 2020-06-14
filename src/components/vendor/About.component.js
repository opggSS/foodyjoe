import React from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react';

const About = ({ mobile, address, city, province, business_hours, longitude, latitude, google }) => {

  const today = new Date()
  const date = today.getDay()

  return (

    <div className="about">
      <div className="bussinesInfo">Business Info</div>
      <div className="infoDetails">
        <div> {mobile}</div>
        <div> {address} {city} {province}</div>
        {console.log(business_hours, date)}
        <div>Operating Hours : (today)
          {business_hours[date].from === null ?
            (<span> - closed</span>) :
            <span> {business_hours[date].from} - {business_hours[date].to}</span>
          }
        </div>
        <Map
          style={{ width: '100%' }}
          google={google}
          zoom={14}
          initialCenter={{
            lat: latitude,
            lng: longitude
          }}
        />
      </div>
    </div>
  )
}
export default GoogleApiWrapper({
  apiKey: ''
})(About);
