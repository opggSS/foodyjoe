import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut, updateUserInfo } from '../../actions/auth/authAction';
import './Account.scss';
import { Link } from 'react-router-dom';
import { InputItem, Card } from 'antd-mobile';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Modal } from 'antd-mobile'
const alert = Modal.alert;

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
    const [isPhoneValid, setIsPhoneValid] = useState(false)

    const [userInfo, setUserInfo] = useState({
        username: '',
        phone: ''
    });

    const handlepdateUserInfo = () => {
        console.log(userInfo.username)
        if (!isPhoneValid) {
            alert(`Invalid phone number`, '', [
                { text: 'Ok'}
            ])
        }
        
        else if (userInfo.username === '') {
            alert(`Please fill in your username`, '', [
                { text: 'Ok' }
            ])
        }
        else {
            const updatedUser = {
                ...user,
                phone: userInfo.phone,
                username: userInfo.username
            }
            updateUserInfo({ user: updatedUser });
            alert(`Profile Updated`, '', [
                { text: 'Ok', onPress: () => setModal(false)   }
            ])
        }

    };

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

            {authError && <div>Login Failed : {authError}</div>}
        </div>
    ) : (
            <div className="account-info-wrapper">
                <div>
                    <Link to="/">Back</Link>
                </div>
                <h2 className="title">Account Info</h2>
                <Card
                    className="card-container"
                    title="Your Account Info"
                    bordered={true}
                >
                    <div className='mb-3'>
                        <b>Username: </b> {user && user.username}
                    </div>
                    <div className="mb-3">
                        <b>Phone number: </b> {user && user.phone}
                    </div>
                </Card>

                <div className="edit-container">
                    <button
                        className="ant-btn ant-btn-primary"
                        onClick={() => {
                            setModal(true);
                            setUserInfo({
                                username: user.username || '',
                                phone: user.phone || ''
                            });
                        }}
                    >
                        Edit User Info
                    </button>

                    <Link
                        className="ant-btn ant-btn-primary"
                        to={'./deliveryinfo'}
                    >

                        Manage delivery Info
                    </Link>
                </div>
                {modal ? (
                    <div className="modal">
                        <Card
                            className="card-container"
                            title="Edit Your Account Info"
                            bordered={true}
                        >
                            Username:
                        <InputItem
                                name=""
                                onChange={(value) => {
                                    setUserInfo({
                                        ...userInfo,
                                        username: value
                                    });
                                }}
                                defaultValue={userInfo.username}
                            />
                        Phone Number:

                            <PhoneInput
                                isValid={(value, country) => {
                                    if (value.match(/\d/g).length === 11 && country.name === 'Canada') {
                                        setIsPhoneValid(true)
                                        return true
                                    }
                                    else {
                                        setIsPhoneValid(false)
                                        return false
                                    }
                                }}
                                inputProps={{
                                    // value: userInfo.phone,
                                    name: 'phone',
                                    required: true,
                                }}
                                placeholder='Receiver Phone Number'
                                country={'ca'}
                                value={userInfo.phone}
                                onChange={phone => setUserInfo({
                                    ...userInfo,
                                    phone: phone
                                })}
                            />


                            <div className="submit-change">
                                <button
                                    className="ant-btn ant-btn-primary"
                                    onClick={() => {
                                        handlepdateUserInfo();
                                    }}
                                >
                                    Submit Changes
                            </button>
                            </div>
                        </Card>
                    </div>
                ) : (
                        ''
                    )}
                <div
                    className="sign-out ant-btn ant-btn-primary ant-btn-dangerous"
                    onClick={signOut}
                >
                    Sign Out
            </div>
            </div>
        );
};

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError,
        user: state.auth
    };
};

export default connect(mapStateToProps, { signIn, signOut, updateUserInfo })(Account);
