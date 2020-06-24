import React from 'react'
import { Link } from 'react-router-dom'
import SingleDishAddButton from './SingleDishAddButton'

export default function MenuSingleDish({dish ,vendor}) {
  return (

    <div className="gridContainer" key={dish.id}>
      <Link to={`/singleDish/${dish.id}`}>
        <div className='dishImage'
          style={{ backgroundImage: `url(${dish.photo})` }}
        >
        </div>
      </Link>
      <div className='dishDetail'>
        <div>{dish.name}</div>
        <div className="price">$ {dish.price}</div>
        <div className="addToCartContainer">

          <SingleDishAddButton
            dish={dish}
            vendor={vendor}
            isVendorMenu={true}
          />
        </div>
      </div>
    </div>
  )
}
