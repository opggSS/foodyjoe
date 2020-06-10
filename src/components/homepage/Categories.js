import React from 'react'
import { AlipayOutlined } from '@ant-design/icons'
import { Grid } from 'antd-mobile';


export default function Categories() {
  
  const datas = Array.from(new Array(8)).map((_val, i) => ({
    icon: <AlipayOutlined/>,
    text: `name${i}`,
  }));


  return (
    <div className='category'>
       <Grid 
        columnNum={4}
        data={datas} 
        renderItem={data => (
          <div className='row'>
            {data.icon} 
            <div>{data.text}</div>
          </div>
        )}
      />
    </div>
  )
}
