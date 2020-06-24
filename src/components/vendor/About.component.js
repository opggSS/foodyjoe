import React, { useState } from 'react'
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";


const About = ({ mobile, address, city, province, business_hours, longitude, latitude, name, google }) => {

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
        <div >

          <div style={{ height: '50vh', width: '100%' , position:'relative'}}>
            <Map
              className="map"
              google={google}
              initialCenter={{
                lat: latitude,
                lng: longitude
              }}
              zoom={14}
            >
              <Marker
                name="Marker"
                position={{ lat: latitude, lng: longitude }}
              >
              </Marker>

            </Map>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API,
  version: "3.38"
})(About)