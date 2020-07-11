import React from 'react';
import { Link } from 'react-router-dom';
// import { SingleVendorData } from '../../datas'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const Vendors = ({ vendors }) => {
  return vendors ? (
    vendors.map((vendor, index) => (
      <div key={index} className="vendors">
        <Link to={`/vendor/${vendor.id}`}>
          <div className="image-wrapper">
            <img src={vendor.logo} alt={vendor.name} width="100%" />
          </div>
          <div className="vendorName">
            {vendor.name}
            <div>{/*about 1km*/}</div>
          </div>
          <div className="deliveryFee">
            Devlivery Fee ${vendor.delivery_fee}+
                    </div>
        </Link>
      </div>
    ))
  ) : (
      <div>loading...</div>
    );
};

const mapStateToProps = (state) => {
  return{vendors: state.firestore.ordered.vendors} 
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: 'vendors',
        orderByKey:true,
        limit:3
      },
    ]
  }
  )
)(Vendors)


