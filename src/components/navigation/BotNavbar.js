import React from 'react'
import { Grid } from 'antd-mobile';
import { HomeOutlined, UnorderedListOutlined, AccountBookOutlined } from '@ant-design/icons'


export default function BotNavbar() {

  const datas = [
    {
      icon: <HomeOutlined />,
      title: 'Home'
    },
    {
      icon: <UnorderedListOutlined />,
      title: 'Orders'
    },
    {
      icon: <AccountBookOutlined />,
      title: 'Account'
    },
  ]

return (
  <div className="botNavbar">
    <Grid
      columnNum={3}
      data={datas}
      renderItem={data => (
        <div className='row'>
          {data.icon}
          <h6>{data.title}</h6>
        </div>
      )}
    />
  </div>
)
}
