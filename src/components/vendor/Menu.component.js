import React from 'react';
import MenuSingleDish from './MenuSingleDish';
import { connect } from 'react-redux';
import { firestoreConnect, populate } from 'react-redux-firebase';
import { compose } from 'redux';

// const populates = [
//     { child: 'vendor', root: 'vendors' }
// ]

const Menu = ({ dishes, vendor }) => {
    if (dishes) {
        return dishes.map((dish, index) => dish.length > 0 ? (
            <div className="menu" key={index}>
                <div className="category"> {dish[0].categoryId ? vendor.categories[dish[0].categoryId] : 'Uncategorized'}</div>
                {dish.map((dish) => (
                    <MenuSingleDish dish={dish} key={dish.id} vendor={vendor} />
                ))}
            </div>
        ) : (<div></div>));
    }
    else {
        return <div>loading...</div>
    }
};

    const mapStateToProps = (state, ownProps) => {

    const dishes = state.firestore.ordered.dishes
    // const dishes = populate(state.firestore, 'dishes', populates)
    
    const categoryLength = ownProps.vendor.categories.length

    if (dishes) {
        let categoriedDishes = Array(categoryLength + 2).fill([])
        dishes.forEach((dish, index) => {
            if (dish.categoryId !== undefined) {
                categoriedDishes[dish.categoryId] = [
                    ...categoriedDishes[dish.categoryId],
                    dish
                ]
            }
            else {
                categoriedDishes[categoryLength] = [
                    ...categoriedDishes[categoryLength],
                    dish
                ]
            }
        })
        return { dishes: categoriedDishes }
    }
    else {
        return { dishes: null }
    }
};

export default compose(
    connect(mapStateToProps, {}),
    firestoreConnect((props) => {
        return [
            {
                collection: 'dishes',
                where: [
                    ['vendor', '==', props.vendor.id]
                ],
                // populates: populates
            }
        ]
    })
)(Menu);
