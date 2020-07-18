import React, { useState } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
} from 'react-places-autocomplete';
import { compose } from "redux";
import { connect } from 'react-redux'
import { updateUserInfo } from '../../actions/auth/authAction'
import { GoogleApiWrapper } from "google-maps-react";
import { Redirect } from "react-router-dom";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Modal } from 'antd-mobile'
const alert = Modal.alert;

const CreateDeliveryInfo = ({ user, updateUserInfo, google }) => {

  const [deliveryInfo, setDeliveryInfo] = useState({})
  const [isPhoneValid, setIsPhoneValid] = useState(false)

  const handleAddressChange = address => {
    setDeliveryInfo({
      ...deliveryInfo,
      address: address
    })
  }
  const handleOtherChange = info => {
    setDeliveryInfo({
      ...deliveryInfo,
      ...info
    })
  }
  const onSaveDeliveryInfo = () => {
    if (!isPhoneValid) {
      alert(`Invalid phone number`, '', [
        { text: 'Ok' }
      ])
    }
    else if (deliveryInfo.address && deliveryInfo.name && deliveryInfo.phone) {
      const info = user.deliveryInfo || []
      updateUserInfo({
        user: {
          ...user,
          deliveryInfo: [
            ...info,
            deliveryInfo
          ]
        },
        isGoBack: true
      })
    }

    else {
      alert(`Please complete delivery info`, '', [
        { text: 'Ok' }
      ])
    }
  }

  const handleSelect = selectedAddress => {
    geocodeByAddress(selectedAddress)
      .then(results => {
        const lat = results[0].geometry.location.lat()
        const lng = results[0].geometry.location.lng()

        setDeliveryInfo({
          ...deliveryInfo,
          address: selectedAddress,
          lat: lat,
          lng: lng
        })

      })
      .catch(error => console.error('Error', error));
  };

  if (!user) {
    return <Redirect to='/'></Redirect>
  }

  const searchOptions = {
    location: new google.maps.LatLng(49.241863, -123.139375),
    radius: 20000,
    types: ['address'],
    strictbounds: true
  }

  return (
    user && (
      <div className="createDeliveryInfo">
        <ul>
          <li>
            <PlacesAutocomplete
              value={deliveryInfo.address}
              onChange={handleAddressChange}
              onSelect={handleSelect}
              radius={30000}
              strictbounds
              searchOptions={searchOptions}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: 'Destination ...',
                      className: 'location-search-input',
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </li>
          <li>
            <input
              type="text"
              placeholder='Receiver Name'
              onChange={(e) => handleOtherChange({ name: e.target.value })}
            />
          </li>
          <li>
            <PhoneInput
              isValid={(value, country) => {
                if (value.match(/\d/g).length===11 && country.name === 'Canada') {
                  setIsPhoneValid(true)
                  return true
                }
                else {
                  setIsPhoneValid(false)
                  return false
                }
              }}
              inputProps={{
                name: 'phone',
                required: true,
              }}
              placeholder='Receiver Phone Number'
              country={'ca'}
              value={deliveryInfo.phone}
              onChange={phone => handleOtherChange({ phone: phone })}
            />
          </li>
        </ul>

        <div className="save" onClick={onSaveDeliveryInfo}>
          SAVE
        </div>
      </div>
    )
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth,
  }
}

export default compose(
  connect(mapStateToProps, { updateUserInfo }),
  GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAP_API,
  })
)(CreateDeliveryInfo);