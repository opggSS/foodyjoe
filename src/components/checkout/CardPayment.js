import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styled from "@emotion/styled";
import axios from "axios";
import BillingDetailsFields from "./prebuilt/BillingDetailsFields";
import SubmitButton from "./prebuilt/SubmitButton";
import Row from "./prebuilt/Row";
import CheckoutError from "./prebuilt/CheckoutError";
import { Redirect, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Modal } from 'antd-mobile';
const alert = Modal.alert;


const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;

  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const CardPayment = props => {
  const history = useHistory();
  const { price, onSuccessfulCheckout } = props.location
  const {orderDetail} = props
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const stripe = useStripe();
  const elements = useElements();

  //route protection
  
  const handleCardDetailsChange = ev => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const handleFormSubmit = async ev => {
    ev.preventDefault();

    const billingDetails = {
      name: ev.target.name.value,
      email: ev.target.email.value,
      address: {
        city: ev.target.city.value,
        line1: ev.target.address.value,
        state: ev.target.state.value,
        postal_code: ev.target.zip.value
      }
    };
    setProcessingTo(true);

    const cardElement = elements.getElement("card");
    try {
      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails
      });
      console.log(paymentMethodReq)
      const { data: clientSecret } = await axios.post("https://us-central1-foodyjoe-3a05d.cloudfunctions.net/cc", {
        amount: price.toFixed(2) * 100
      });
      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id
      });
      if (error) {
        setCheckoutError(error.message);
        setProcessingTo(false);
        return;
      }
      onSuccessfulCheckout();
    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  const iframeStyles = {
    base: {
      color: "#fff",
      fontSize: "16px",
      iconColor: "#fff",
      "::placeholder": {
        color: "#87bbfd"
      }
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE"
    },
    complete: {
      iconColor: "#cbf4c9"
    }
  };

  const cardElementOpts = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true
  };

  if (!price) return <Redirect to='/'></Redirect>
  if(!orderDetail) {
    alert('Order placed', '', [
      { text: 'OK', onPress: () => history.push('/orders') } ,
    ])
  }
  return (
    <form onSubmit={handleFormSubmit}>
      <Row>
        <BillingDetailsFields />
      </Row>
      <div style={{marginLeft: '5.5vw'}}>Use 4242 4242 4242 4242 for testing</div>
      <Row>
        <CardElementContainer  >
          <CardElement
            options={cardElementOpts}
            onChange={handleCardDetailsChange}
          />
        </CardElementContainer>
      </Row>
      {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
      <Row>
        {/* TIP always disable your submit button while processing payments */}
        <SubmitButton disabled={isProcessing || !stripe}>
          {isProcessing ? "Processing..." : `Pay $${price}`}
        </SubmitButton>
      </Row>
    </form>
  );
};


export default connect((state) =>({orderDetail: state.orderDetail}) )(CardPayment);