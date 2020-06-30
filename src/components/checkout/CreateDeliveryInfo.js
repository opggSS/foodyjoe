// import React from 'react'
// import PlacesAutocomplete, {
//   geocodeByAddress,
// } from 'react-places-autocomplete';
// import { compose } from "redux";
// import { connect } from 'react-redux'
// import { setOrderDetail } from '../../actions/order/orderAction'
// import { GoogleApiWrapper } from "google-maps-react";

// const CreateDeliveryInfo = ({ orderDetail, setOrderDetail ,google }) => {

//   const handleAddressChange = address => {
//     setOrderDetail({
//       ...orderDetail,
//       deliveryInfo: {
//         ...orderDetail.deliveryInfo,
//         address: address
//       }
//     })
//   }



//   const service = new google.maps.DistanceMatrixService();
//     service.getDistanceMatrix(
//       {
//         origins: [origin],
//         destinations: [destination],
//         travelMode: 'DRIVING',
//         unitSystem: google.maps.UnitSystem.IMPERIAL,
//       }, callback);

//     function callback(response, status) {
//       if (status !== 'OK') {
//         console.log(status)
//         return
//       }
//       const distance = response.rows[0].elements[0].distance.value
//       let additionalDeliveryFee = 0
//       if (distance <= 5000) {
//         additionalDeliveryFee = 0
//       }
//       else {
//         additionalDeliveryFee = Math.ceil(distance / 1000 - 5) * 1.5
//       }
     
//     }



//   const handleSelect = selectedAddress => {
//     geocodeByAddress(selectedAddress)
//       .then(results => {
//         const lat = results[0].geometry.location.lat()
//         const lng = results[0].geometry.location.lng()
//         setOrderDetail({
//           ...orderDetail,
//           deliveryInfo: {
//             ...orderDetail.deliveryInfo,
//             lat,
//             lng,
//             address: selectedAddress
//           }
//         })
//         return {
//           lat:lat,
//           lng:lng
//         }

//       }).then(geoCode =>{

//         const origin = new google.maps.LatLng(vendorLat, vendorLng);
//         const destination = new google.maps.LatLng(userLat, userLng);


//         const service = new google.maps.DistanceMatrixService();
//         service.getDistanceMatrix(
//           {
//             origins: [origin],
//             destinations: [destination],
//             travelMode: 'DRIVING',
//             unitSystem: google.maps.UnitSystem.IMPERIAL,
//           }).then(() =>{

//           });
//       })
//       .catch(error => console.error('Error', error));

//   };

//   return (
//     <div>
//       <PlacesAutocomplete
//         value={orderDetail.deliveryInfo.address}
//         onChange={handleAddressChange}
//         onSelect={handleSelect}
//       >
//         {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (

//           <div>
//             <input
//               {...getInputProps({
//                 placeholder: 'Destination ...',
//                 className: 'location-search-input',
//               })}
//             />
//             <div className="autocomplete-dropdown-container">
//               {loading && <div>Loading...</div>}
//               {suggestions.map(suggestion => {
//                 const className = suggestion.active
//                   ? 'suggestion-item--active'
//                   : 'suggestion-item';
//                 // inline style for demonstration purpose
//                 const style = suggestion.active
//                   ? { backgroundColor: '#fafafa', cursor: 'pointer' }
//                   : { backgroundColor: '#ffffff', cursor: 'pointer' };
//                 return (
//                   <div
//                     {...getSuggestionItemProps(suggestion, {
//                       className,
//                       style,
//                     })}
//                   >
//                     <span>{suggestion.description}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </PlacesAutocomplete>
//       <div className="others">
//         <ul>
//           <li><input type="text" placeholder='Receiver Name' /></li>
//           <li><input type="text" placeholder='Receiver Phone' /></li>
//         </ul>
//       </div>
//     </div>
//   )
// }


// const mapStateToProps = (state, ownProps) => {
//   return {
//     user: state.auth,
//     orderDetail: state.orderDetail,
//     vendor: state.vendors
//   }
// }

// export default compose(
//   connect(mapStateToProps, { setOrderDetail }),
//   GoogleApiWrapper({
//     apiKey: process.env.REACT_APP_GOOGLE_MAP_API,
//   })
// )(CreateDeliveryInfo);