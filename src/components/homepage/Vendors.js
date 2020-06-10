import React from 'react'
import vendor_image from '../../assets/banner1.jpg'
import {Link} from 'react-router-dom'


export default function Vendors() {
  return (
    <Link to='/vendor/1'>
      <img src={vendor_image} alt="wtf" width="100%" />
      </Link>
  )
}
