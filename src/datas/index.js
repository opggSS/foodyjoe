import Bamboo from '../assets/images/haidilaobamboo.jpg'
import BackStrips from '../assets/images/haidilaoBackstrips.jpg'
import AAA from '../assets/images/haidilaoAAA.jpg'
import Classic from '../assets/images/haidilaoClassic.jpg'
import Daisy from '../assets/images/haidilaoDaisy.jpg'
import Fatty from '../assets/images/haidilaoFatty.jpg'
import Logo from '../assets/images/haidilao.jpg'

export const SingleVendorData = {
  id: 1,
  delivery_fee: '2.99',
  shipping_cost: '0.0',
  shipping_cost_percent: '0.0',
  address: '5890 no3 road',
  area_id: 4,
  business_hours: [
    { from: null, to: null },
    { from: "11:00", to: '23:28' },
    { from: "11:00", to: '23:28' },
    { from: "11:00", to: '23:28' },
    { from: "11:00", to: '23:28' },
    { from: "11:00", to: '23:28' },
    { from: null, to: null },
  ],
  city: 'richmond',
  isClosed: true,
  coupon_tags: ["30% off", 'Buy $100 get $10 off'],
  latitude: 49.1708,
  longitude: -123.136,
  logo: Logo,
  mobile: "6043706665",
  name: "Haidilao Hot Pot | 30% off",
  pickup_discount: 88,
  province: 'BC',
  rating: 4.8,
  notes_tags: [
    "contact free delivery",
    "No Green Onion",
    "Less Spicy",
    "with Utensil",
  ],
  tags: ["川湘麻辣", "沪港澳汇"],
  tip_lists: [0.1, 0.15, 0.2, 0.25],

}



export const MyDishes = [
    {
      id: 0,
      vendor: SingleVendorData,
      category: {
        name: 'One person signature set'
      },
      name: '一人精品套餐/单人套餐',
      photo: Classic,
      price: 18,
      description: 'dish description',
      selectables: [
        {
          max: 1,
          min: 1,
          name: 'select broth type',
          values: [
            {
              name: 'raw',
              price: 18,
              selected: false
            },
            {
              name: 'cooked',
              price: 20,
              selected: false
            },
          ]
        },

        {
          max: 1,
          min: 1,
          name: 'drink',
          values: [
            {
              name: 'Coke',
              price: 0,
              selected: false
            },
            {
              name: 'diet pepsi',
              price: 4,
              selected: false
            },
            {
              name: 'Sprite',
              price: 5,
              selected: false
            },

          ]
        },

        {
          max: 3,
          min: 1,
          name: 'Dipping',
          values: [
            {
              name: 'Seasame paste',
              price: 2,
              selected: false
            },
            {
              name: 'Onion',
              price: 1,
              selected: false
            },
            {
              name: 'Mushroom sauce',
              price: 2,
              selected: false
            },
          ]
        },
      ]
    },
  
  
    {
      id: 1,
      vendor: SingleVendorData,
      category: {
        name: '特色菜Signature Dishes'
      },
      name: '青笋 Bamboo Shoots',
      photo: Bamboo,
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
      vendor: SingleVendorData,
      category: {
        name: '特色菜Signature Dishes'
      },
      name: '茼蒿 Crown Daisy',
      photo: Daisy,
      price: 11,
      selectables: []
    },
  
    {
      id: 3,
      vendor: SingleVendorData,
      category: {
        name: '肉类 meats'
      },
      name: '精品牛板腱肉',
      photo: BackStrips,
      price: 18,
      selectables: []
    },
    {
      id: 4,
      vendor: SingleVendorData,
      category: {
        name: '肉类 meats'
      },
      name: '精品肥牛 ',
      photo: Fatty,
      price: 18,
      selectables: []
    },
    {
      id: 5,
      vendor: SingleVendorData,
      category: {
        name: '肉类 meats'
      },
      name: 'AAA级西冷牛肉',
      photo: AAA,
      price: 18,
      selectables: []
    }
  
]

export const SingleVendorDishes = [
  [
    {
      id: 0,
      vendor: SingleVendorData,
      category: {
        name: 'One person signature set'
      },
      name: '一人精品套餐/单人套餐',
      photo: Classic,
      price: 18,
      description: 'dish description',
      selectables: [
        {
          max: 1,
          min: 1,
          name: 'select broth type',
          values: [
            {
              name: 'raw',
              price: 18,
              selected: false
            },
            {
              name: 'cooked',
              price: 20,
              selected: false
            },
          ]
        },

        {
          max: 1,
          min: 1,
          name: 'drink',
          values: [
            {
              name: 'Coke',
              price: 0,
              selected: false
            },
            {
              name: 'diet pepsi',
              price: 4,
              selected: false
            },
            {
              name: 'Sprite',
              price: 5,
              selected: false
            },

          ]
        },

        {
          max: 3,
          min: 1,
          name: 'Dipping',
          values: [
            {
              name: 'Seasame paste',
              price: 2,
              selected: false
            },
            {
              name: 'Onion',
              price: 1,
              selected: false
            },
            {
              name: 'Mushroom sauce',
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
      vendor: SingleVendorData,
      category: {
        name: '特色菜Signature Dishes'
      },
      name: '青笋 Bamboo Shoots',
      photo: Bamboo,
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
      vendor: SingleVendorData,
      category: {
        name: '特色菜Signature Dishes'
      },
      name: '茼蒿 Crown Daisy',
      photo: Daisy,
      price: 11,
      selectables: []
    }
  ],
  [
    {
      id: 3,
      vendor: SingleVendorData,
      category: {
        name: '肉类 meats'
      },
      name: '精品牛板腱肉',
      photo: BackStrips,
      price: 18,
      selectables: []
    },
    {
      id: 4,
      vendor: SingleVendorData,
      category: {
        name: '肉类 meats'
      },
      name: '精品肥牛 ',
      photo: Fatty,
      price: 18,
      selectables: []
    },
    {
      id: 5,
      vendor: SingleVendorData,
      category: {
        name: '肉类 meats'
      },
      name: 'AAA级西冷牛肉',
      photo: AAA,
      price: 18,
      selectables: []
    }
  ]
]

