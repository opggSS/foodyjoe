import banner2 from '../assets/images/banner2.jpg'
import Logo from '../assets/images/haidilao.jpg'

export const SingleVendorData = {
  id: 1,
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
  coupon_tags: ["全场7折", '满100减10'],
  latitude: 49.1708,
  longitude: -123.136,
  logo: Logo,
  mobile: "6043706665",
  name: "海底捞火锅 | 全场七折",
  pickup_discount: 88,
  province: 'BC',
  rating: 4.8,
  notes_tags: [
    "无接触配送，请把商品留在门外，如有问题与我联系",
    "不要葱",
    "不要香菜",
    "少点辣",
    "多点辣",
    "带餐具",
  ],
  tags: ["川湘麻辣", "沪港澳汇"],
  tip_lists: [0.1, 0.15, 0.2, 0.25],

}
export const SingleDishData = {
  id: 0,
  vendor: SingleVendorData,
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

export const SingleVendorDishes = [
  [
    {
      id: 0,
      vendor: SingleVendorData,
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
      vendor: SingleVendorData,
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
      vendor: SingleVendorData,
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
      vendor: SingleVendorData,
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
      vendor: SingleVendorData,
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
      vendor: SingleVendorData,
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

