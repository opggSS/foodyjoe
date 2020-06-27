import React, { useState } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { signIn, signOut, updateUserInfo } from '../../actions/auth/authAction';
import './Account.scss';
import { Link } from 'react-router-dom';
import { InputItem } from 'antd-mobile';

const Account = ({
    orders,
    firebase,
    signIn,
    signOut,
    auth,
    authError,
    user,
    updateUserInfo
}) => {
    const [phone, setPhone] = useState('');
    const [modal, setModal] = useState(false);
    
    const [userInfo, setUserInfo] = useState({
        username: '',
        address: '',
        phone: ''
    })
    
    const handlepdateUserInfo = () => {
        console.log(userInfo)
        updateUserInfo(userInfo)
    }
    
    return !auth.apiKey ? (
        <div className="account-info-wrapper">
            <div>
                <Link to="/">Back</Link>
            </div>
            <h2 className="title">Account Info</h2>
            <div className="login-info">
                <label>
                    Phone:
                    <input
                        type="text"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <button
                    id="sign-in-button"
                    className="am-button am-button-primary"
                    onClick={() => signIn({ phone: phone })}
                >
                    sign in
                </button>
            </div>

            {authError && <div>{authError}</div>}
        </div>
    ) : (
        <div className="account-info-wrapper">
            <div>
                <Link to="/">Back</Link>
            </div>
            <h2 className="title">Account Info</h2>
            <div>Username: {user && user.username}</div>
            <div>Phone number: {user && user.phone}</div>
            <div>Address: {user && user.address}</div>
            <div>
                <button
                    onClick={() => {
                        setModal(true);
                        setUserInfo({
                            username: user.username || '',
                            address: user.address || '',
                            phone: user.phone || ''
                        })
                    }}
                >
                    Edit User Info
                </button>
            </div>
            {modal ? (
                <div className="modal">
                    <InputItem name="" onChange={(value) => {
                        setUserInfo({
                            ...userInfo,
                            username: value
                        })
                    }} defaultValue={userInfo.username} />
                    <InputItem name="" onChange={(value) => {
                        setUserInfo({
                            ...userInfo,
                            address: value
                        })
                    }} defaultValue={userInfo.address} />
                    <InputItem type="text" onChange={(value) => {

                        setUserInfo({
                            ...userInfo,
                            phone: (value + '')
                        })
                    }} defaultValue={(console.log(userInfo.phone + ''), userInfo.phone + '')} />
                    <button onClick={() => {
                        handlepdateUserInfo()
                    }}>
                        Submit Change
                    </button>
                </div>
            ) : (
                ''
            )}
            <div className="sign-out" onClick={signOut}>
                Sign Out
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    let orders = null;
    if (state.firestore.ordered.orders) {
        orders = state.firestore.ordered.orders;
    }
    let user = null;
    if (state.firestore.ordered.users) {
        user = state.firestore.ordered.users.find((e) => {
            return e.id === state.firebase.auth.uid;
        });
        console.log(user);
    }
    return {
        orders: orders,
        auth: state.firebase.auth,
        authError: state.auth.authError,
        user
    };
};

export default compose(
    connect(mapStateToProps, { signIn, signOut, updateUserInfo }),
    firestoreConnect(() => ['orders', 'users'])
)(Account);
