import React from 'react'
import { Grid } from 'antd-mobile';
import { HomeOutlined, UnorderedListOutlined, AccountBookOutlined,ShoppingCartOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
export default function BotNavbar() {

  const datas = [
    {
      icon: <HomeOutlined />,
      title: 'Home',
      url: '/'
    },
    {
      icon: <UnorderedListOutlined />,
      title: 'Orders',
      url: 'orders'
    },
    {
      icon: <AccountBookOutlined />,
      title: 'Account',
      url: 'account'
    },
    {
      icon: <ShoppingCartOutlined />,
      title: 'Cart',
      url: 'cart'
    },
  ]

  return (
    <div className="botNavbar">
      <Grid
        columnNum={4}
        data={datas}
        renderItem={data => (
          <Link to={`${data.url}`}>
            <div className='row'>
              {data.icon}
              <h6>{data.title}</h6>
            </div>
          </Link>
        )}
      />
    </div>
  )
}
