import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut, updateUserInfo } from '../../actions/auth/authAction';
import './Account.scss';
import { Link } from 'react-router-dom';
import { InputItem, Card } from 'antd-mobile';

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
    });

    const handlepdateUserInfo = () => {
        console.log(userInfo);
        updateUserInfo(userInfo);
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
                <div>
                    <b>Username: </b> {user && user.username}
                </div>
                <div>
                    <b>Phone number: </b> {user && user.phone}
                </div>
                <div>
                    <b>Address: </b> {user && user.address}
                </div>
            </Card>

            <div className="edit-container">
                <button
                    className="ant-btn ant-btn-primary"
                    onClick={() => {
                        setModal(true);
                        setUserInfo({
                            username: user.username || '',
                            address: user.address || '',
                            phone: user.phone || ''
                        });
                    }}
                >
                    Edit User Info
                </button>
            </div>
            {modal ? (
                <div className="modal">
                    <Card
                    className="card-container"
                        title="Edit Your Account Info"
                        bordered={true}
                    >
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
                        <InputItem
                            name=""
                            onChange={(value) => {
                                setUserInfo({
                                    ...userInfo,
                                    address: value
                                });
                            }}
                            defaultValue={userInfo.address}
                        />
                        <InputItem
                            type="text"
                            onChange={(value) => {
                                setUserInfo({
                                    ...userInfo,
                                    phone: value + ''
                                });
                            }}
                            defaultValue={
                                (console.log(userInfo.phone + ''),
                                userInfo.phone + '')
                            }
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
        user:state.auth
    };
};

export default connect(mapStateToProps, { signIn, signOut, updateUserInfo })(Account);
