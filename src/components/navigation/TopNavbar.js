import React from 'react'
import {Input} from 'antd'
import {SearchOutlined} from '@ant-design/icons'

export default function TopNavbar() {
  return (
    <div className="topNav">
      <Input
      placeholder="Search Restaurant"
      className='searchBar'
      prefix={<SearchOutlined />}
      />
    </div>
  )
}
