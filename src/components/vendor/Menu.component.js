import React, { useState, useEffect } from 'react'
import banner2 from '../../assets/images/banner2.jpg'
import Modal from './Modal.component'
import SingleDish from './SingleDish'

export default function Menu() {
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
        attrs: [
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
        attrs: []
      },
      {
        id: 2,
        category: {
          name: '特色菜Signature Dishes'
        },
        name: '茼蒿 Crown Daisy',
        photo: banner2,
        price: 11,
        attrs: []
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
        attrs: []
      },
      {
        id: 4,
        category: {
          name: '肉类 meats'
        },
        name: '精品肥牛 ',
        photo: banner2,
        price: 18,
        attrs: []
      },
      {
        id: 5,
        category: {
          name: '肉类 meats'
        },
        name: 'AAA级西冷牛肉',
        photo: banner2,
        price: 18,
        attrs: []
      }
    ]
  ]
  const order = {
    vendorId: 123,

    dishes: [
      { dishId: 123 },
    ]


  }

  const [ModalOpen, setModalOpen] = useState(false)
  const [selectedDish, setSelectedDish] = useState({})
  const [singleDishOpen, setSingleDishOpen] = useState(false)

  const handleCloseModal = () => {
    setModalOpen(false)
  }
  const handleCloseSingleDish = ()=>{
    setSingleDishOpen(false)
  }

  const handleModal = (id) => {
    datas.forEach(data => {
      data.forEach(dish => {
        if (dish.id === id) {
          setSelectedDish(dish)
          setModalOpen(true)
          return
        }
      })
    })
  }

  const handleSingleDish = (id) => {
    datas.forEach(data => {
      data.forEach(dish => {
        if (dish.id === id) {
          setSelectedDish(dish)
          setSingleDishOpen(true)
          return
        }
      })
    })
  }


  const menuList = datas.map(data => (
    <div className='menu'>
      <div className='category'> {data[0].category.name}</div>
      {data.map(dish => (
        <div className="gridContainer">
          <div className='dishImage'
            style={{ backgroundImage: `url(${dish.photo})` }}
            onClick={() => handleSingleDish(dish.id)}
          >
          </div>

          <div className='dishDetail'>
            <div>{dish.name}</div>
            <div>
              <div className="price">$ {dish.price}</div>
              <div className="option">
                {dish.attrs.length > 1 ? <button onClick={() => handleModal(dish.id)}> option </button> : <button> + </button>}
              </div>
            </div>
          </div>
        </div>
      )
      )}
    </div>
  )
  )

  return (
    <div>
      {menuList}
      {console.log(selectedDish.attrs)}
      {ModalOpen &&
        <Modal
          attrs={selectedDish.attrs}
          handleCloseModal={handleCloseModal}
          basePrice={selectedDish.price}
        />
      }

      {singleDishOpen &&
        <SingleDish
          attrs={selectedDish.attrs}
          name= {selectedDish.name}
          basePrice={selectedDish.price}
          description = {selectedDish.description}
          handleCloseSingleDish={handleCloseSingleDish}
        />
      }

    </div>
  )
}

