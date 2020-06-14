import React from 'react'
import banner2 from '../../assets/images/banner2.jpg'
import { connect } from 'react-redux'
import { addToCart } from '../../actions/addToCart'
import SingleDishAddButton from './SingleDishAddButton'
import { Link } from 'react-router-dom'
const Menu = ({ vendorInfo, addToCart }) => {
  const datas = [
    [
      {
        id: 0,
        category: {
          name: '一人精品套餐'
        },
        name: '一人精品套餐/单人套餐',
        photo: banner2,
        price: 18,
        description: '商品详细描述',
        selectables: [
          {
            max: 1,
            min: 1,
            name: '锅类选择',
            values: [
              {
                name: '生',
                price: 18,
                selected: false
              },
              {
                name: '熟',
                price: 20,
                selected: false
              },
            ]
          },

          {
            max: 1,
            min: 1,
            name: '饮品',
            values: [
              {
                name: '健怡可乐（常温)',
                price: 0,
                selected: false
              },
              {
                name: '可口可乐（冰镇)',
                price: 4,
                selected: false
              },
              {
                name: '雪碧（常温)',
                price: 5,
                selected: false
              },

            ]
          },

          {
            max: 3,
            min: 1,
            name: '可选搭配小料',
            values: [
              {
                name: '生芝麻酱',
                price: 2,
                selected: false
              },
              {
                name: '香葱',
                price: 1,
                selected: false
              },
              {
                name: '菌王酱',
                price: 2,
                selected: false
              },
            ]
          },

        ]
      }
    ],
    [
      {
        id: 1,
        category: {
          name: '特色菜Signature Dishes'
        },
        name: '青笋 Bamboo Shoots',
        photo: banner2,
        price: 12,
        selectables: [
          {
            max: 2,
            min: 1,
            name: '加调料',
            values: [
              {
                name: '葱',
                price: 18,
                selected: false
              },
              {
                name: '姜',
                price: 20,
                selected: false
              },
            ]
          },
          {
            max: 1,
            min: 1,
            name: '加肉',
            values: [
              {
                name: '鸡腿',
                price: 18,
                selected: false
              },
              {
                name: '五花肉',
                price: 20,
                selected: false
              },
            ]
          }
        ]
      },
      {
        id: 2,
        category: {
          name: '特色菜Signature Dishes'
        },
        name: '茼蒿 Crown Daisy',
        photo: banner2,
        price: 11,
        selectables: []
      }
    ],
    [
      {
        id: 3,
        category: {
          name: '肉类 meats'
        },
        name: '精品牛板腱肉',
        photo: banner2,
        price: 18,
        selectables: []
      },
      {
        id: 4,
        category: {
          name: '肉类 meats'
        },
        name: '精品肥牛 ',
        photo: banner2,
        price: 18,
        selectables: []
      },
      {
        id: 5,
        category: {
          name: '肉类 meats'
        },
        name: 'AAA级西冷牛肉',
        photo: banner2,
        price: 18,
        selectables: []
      }
    ]
  ]



  return datas.map( (data, index) => (
    <div className='menu' key={index}>
      <div className='category'> {data[0].category.name}</div>
      {data.map( dish=> (
        <div className="gridContainer" key={dish.id}>
          {console.log(dish)}
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
                dish = { {
                  dishId: dish.id,
                  dishName: dish.name,
                  dishPrice: dish.price,
                  dishImage: dish.photo,
                  selectables:dish.selectables
                }}
                vendorInfo={vendorInfo}
                isVendorMenu ={true}
              />
            </div>
          </div>

        </div>
      )
      )}
    </div>
  )
  )
}

export default connect(null, { addToCart })(Menu)