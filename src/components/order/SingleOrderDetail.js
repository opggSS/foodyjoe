import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
const SingleOrderDetail = ({vendor , location }) => {
  const {order} = location

  const dishes = () => (
    <div>
      {order.dishes.map((dish, index) => {
        let selectableText = ''
        if (dish.selectables.length > 0) {
          dish.selectables.forEach(selectable => {
            selectableText += selectable.name
            selectableText += ' - '
            selectable.option.forEach(op => {
              selectableText += op.name
              selectableText += ' '
            })
          })
        }
        return (
          <div key={index} className="singleDishInfo">
            <img src={dish.photo} alt="" />
            <span className="first"> {dish.name}</span>
            <span className="second" >X{dish.quantity}</span>
            <span className="third">${dish.price * dish.quantity}</span>
            {selectableText.length > 0 &&
              (<span className="fourth"> {selectableText}</span>)}
          </div>
        )
      })}
    </div>
  )

  return (
    order ? (
      <div className='singleOrderDetail'>
        <div style={{
            padding: "10px 20px"
        }}><Link to="/orders">Back to Orders</Link></div>
        <img src={vendor.logo} alt={vendor.name} className='vendorImg' />
        <div className='status'>
          {order.isComplete ?
            <span> completed</span> :
            <span> in progress </span>
          }

          <span className='orderNo'> Order No.
            <em style={{ color: '#333' }}>{order.id}</em>
          </span>
          <div>
            {order.createdAt.toDate().toLocaleString()}
          </div>
        </div>
        <div className="divider"></div>
        <div className="timeLocation">
          <div> {order.isDelivery ? 'Delivery' : 'Pick Up'}Time: {order.completedAt && order.completedAt.toDate().toLocaleString()}</div>
          <div> {order.isDelivery ? `Delivery Location: ${order.receiverInfo.address}` : `Pick Up Location : ${vendor.address}`}  </div>
        </div>
        <div className="divider"></div>
        <div className="orderDetail">
          <div className="vendorTitle">{vendor.name}</div>
          <div>{dishes()}</div>
        </div>
        <div className="divider"></div>
        <div className="paymentSummary">
          <ul>
            <li>
              Subtotal:
              <span> ${order.priceInfo.subtotal}</span>
            </li>
            <li>
              GST:
              <span> ${order.priceInfo.tax}</span>
            </li>
            <li>
              Payment:
              <span> {order.paymentMethod}</span>
            </li>
            <li>
              Total:
              <span> ${order.priceInfo.subtotal}</span>
            </li>
          </ul>
        </div>
      </div >
    ) :
      <div>
        <div>no order info</div>
        <Link to='/'> Home </Link>
      </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    vendor: state.vendors.find(vendor => vendor.id === ownProps.location.order.vendorId)
  }
}

export default connect(mapStateToProps)(SingleOrderDetail)
