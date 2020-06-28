import React, { useState } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { GoogleApiWrapper } from "google-maps-react";

const UserLocation = ({ setUserAddress, setUserLng, setUserLat, defaultAddress }) => {

  const [address, setAddress] = useState(defaultAddress)
  const handleChange = address => {
    setAddress(address);
    setUserAddress(address)
  };

  const handleSelect = selectedAddress => {
    console.log(selectedAddress)
    if(selectedAddress !== address) {
      geocodeByAddress(selectedAddress)
      .then(results => {
        setUserLat(results[0].geometry.location.lat())
        setUserLng(results[0].geometry.location.lng())
        return getLatLng(results[0])
      })
      .then(latLng => {
        setAddress(selectedAddress)
        setUserAddress(selectedAddress)
      })
      .catch(error => console.error('Error', error));
    }
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
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
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API,
  libraries: ["places"]
})(UserLocation);