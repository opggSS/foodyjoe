import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './SearchResult.scss';
const SearchResult = ({ vendors }) => {
    return (
        <div className="search-results">
            <Link to="/">Back</Link>
            <div className="vendors-container">
                {vendors && (
                    <div>
                        <h4>Total results: {vendors.length}</h4>
                        {vendors.map((vendor) => {
                            return (
                                <div className="vendor-item" key={vendor.id}>
                                    <Link
                                        className="flexie"
                                        to={`/vendor/${vendor.id}`}
                                    >
                                        <div className="image-container">
                                            <img
                                                src={vendor.logo}
                                                alt={vendor.name}
                                            />
                                        </div>
                                        <div className="text-container">
                                            <p>{vendor.name}</p>
                                            <p>Tel: {vendor.mobile}</p>
                                            <p>Address: {vendor.address}</p>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            {vendors && vendors.length < 1 && (
                <div>Sorry, we could not find any match</div>
            )}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    let vendors = null;
    const keyword = ownProps.match.params.keyword;
    if (state.firestore.ordered.vendors) {
        vendors = state.firestore.ordered.vendors.filter((vendor) =>
            vendor.name.toLowerCase().includes(keyword)
        );
    }
    console.log(vendors);
    return {
        vendors
    };
};

export default 
    connect(mapStateToProps, {})(SearchResult);
