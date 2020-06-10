import React from 'react'
import { Grid } from 'antd-mobile';
import {HomeOutlined ,UnorderedListOutlined, AccountBookOutlined } from '@ant-design/icons'

export default function BotNavbar() {
  return (
    <div className="botNavbar">
        <Grid className="row" center columnNum={4} >
          <HomeOutlined />
          <h6>首页</h6>
        </Grid>
        <Grid className="row" columnNum={4} >
          <UnorderedListOutlined />
          <h6>订单</h6>
        </Grid>
        <Grid className="row" columnNum={4} >
          <AccountBookOutlined />
          <h6>我的</h6>
        </Grid>
    </div>
  )
}
