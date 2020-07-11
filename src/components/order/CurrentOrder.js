import React from 'react'
import './CurrentOrder.scss'
import SingleOrderDetail from './SingleOrderDetail'

const CurrentOrder = ({ order }) => {
  const estimiatedTime = new Date((order.createdAt + 1800) * 1000)
  console.log(estimiatedTime)
  const hours = estimiatedTime.getHours()
  const minutes = estimiatedTime.getMinutes()

  console.log(hours)
  return (
    <div className='currentOrder'>
      <span className='time'> {hours}: {minutes} </span>
      <span className='estimated'> Estimated arrival</span>
      <div className="detail">
        <div className="title">Order Detail</div>
      </div>
      <SingleOrderDetail order={order}></SingleOrderDetail>
    </div>
  )
}
export default CurrentOrder