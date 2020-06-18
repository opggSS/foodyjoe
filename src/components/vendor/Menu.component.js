import React from 'react'
import { SingleVendorDishes } from '../../datas'
import MenuSingleDish from './MenuSingleDish'

const Menu = () => {
  console.log(SingleVendorDishes)
  return SingleVendorDishes.map((data, index) => (
    <div className='menu' key={index}>
      <div className='category'> {data[0].category.name}</div>
      {data.map(dish => (
        <MenuSingleDish dish={dish} key={dish.id} />
      )
      )}
    </div>
  )
  )
}

export default Menu