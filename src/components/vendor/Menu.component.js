import React from 'react'
import MenuSingleDish from './MenuSingleDish'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const Menu = ({ dishes ,vendor }) => {
  console.log(dishes)
  return dishes.map((data, index) => (
    <div className='menu' key={index}>
      <div className='category'> {data[0].category.name}</div>
      {data.map(dish => (
        <MenuSingleDish dish={dish} key={dish.id} vendor ={vendor} />
      )
      )}
    </div>
  )
  )
}

const mapStateToProps = (state, ownProps) => {
  let dishes = null
  const formedArr = []
  if (state.firestore.ordered.dishes) {
    dishes = state.firestore.ordered.dishes.filter(dish => { return dish.vendorId === ownProps.vendor.id })
    for (let i = 1; i <= ownProps.categoryLength; i++) {
      formedArr.push(dishes.filter(dish => dish.category.id === i))
    }
  }
  return {
    dishes: formedArr,
  }
}

export default compose(
  connect(mapStateToProps, {}),
  firestoreConnect(() => ['dishes'])
)(Menu)
