import React, { useState } from 'react'
import backDark from '../../assets/icons/back_dark.svg'
import banner2 from '../../assets/images/banner2.jpg'
import Modal from './Modal.component'

export default function SingleDish({ name, basePrice, description, attrs, handleCloseSingleDish }) {

  const [ModalOpen, setModalOpen] = useState(false)

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <div className='singleDish'>
      <div className="bannerImage" style={{ backgroundImage: `url(${banner2})` }}>
        <img src={backDark} alt='sdf' onClick={handleCloseSingleDish} />
      </div>
      <div className="dishTitle">
        {name}
      </div>
      <div className="divider"></div>
      <div className="priceContainer">
        <span className='price'>${basePrice}</span>
        <span className='selectOptions' onClick={() => setModalOpen(true)}>选规格</span>
      </div>
      <div className="divider"></div>
      <div className="productDescription">
        <div>Product Description</div>
        <p>{description}</p>
      </div>
      {ModalOpen &&
        <Modal
          attrs={attrs}
          handleCloseModal={handleCloseModal}
          basePrice={basePrice}
        />
      }
    </div>
  )
}
