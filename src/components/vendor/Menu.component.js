import React from 'react'

import banner2 from '../../assets/images/banner2.jpg'

export default function Menu() {
  const datas = [
    [
      {
        category :{
          name: '一人精品套餐'
        },
        name: '一人精品套餐/单人套餐',
        photo :banner2,
        price: 18,
        isSelectable: false
      }
    ],
    [
      {
        category :{
          name: '特色菜Signature Dishes'
        },
        name: '青笋 Bamboo Shoots',
        photo :banner2,
        price: 12,
        isSelectable: false
      },
      {
        category :{
          name: '特色菜Signature Dishes'
        },
        name: '茼蒿 Crown Daisy',
        photo :banner2,
        price: 11,
        isSelectable: true
      }
    ],
    [
      {
        category :{
          name: '肉类 meats'
        },
        name: '精品牛板腱肉',
        photo :banner2,
        price: 18,
        isSelectable: false
      },
      {
        category :{
          name: '肉类 meats'
        },
        name: '精品肥牛 ',
        photo :banner2,
        price: 18,
        isSelectable: false
      },
      {
        category :{
          name: '肉类 meats'
        },
        name: 'AAA级西冷牛肉',
        photo :banner2,
        price: 18,
        isSelectable: true
      }
    ]
  ]
  
  
  return datas.map(data => (
    <div className='menu'>
      <div> {data[0].category.name}</div>
      {data.map(dish =>(
          <div className="gridContainer">
            <div className='dishImage' style={{backgroundImage: `url(${dish.photo})`}}></div>
            <div className='dishDetail'>
              <div>{dish.name}</div>
              <div>
                <div className="price">$ {dish.price}</div>
                <div className="option">
                  {dish.isSelectable ? <button> option </button> : <button> + </button>  }
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
)
}
