import React from 'react'
import {Input} from 'antd'
import {SearchOutlined} from '@ant-design/icons'

export default function TopNavbar() {
  return (
    <div className="topNav">
      <Input
      placeholder="搜索商家"
      className='searchBar'
      prefix={<SearchOutlined />}
      />
    </div>
  )
}
