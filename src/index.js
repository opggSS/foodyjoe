import React from "react";
import ReactDOM from "react-dom";
import './index.scss'
import App from "./App";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {
    reduxFirestore,
    getFirestore,
    createFirestoreInstance
} from "redux-firestore";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import fbConfig from "./config/fbConfig";
import firebase from "firebase/app";
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
    rootReducer,
    compose(
        composeWithDevTools(
            applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
            reduxFirestore(fbConfig)
        )
    )
);


const rrfProps = {
    firebase,
    config: fbConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
};


ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App />
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById("root")
);


