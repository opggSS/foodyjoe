import React, { useState } from 'react';
import { Carousel } from 'antd-mobile';
import banner1 from '../../assets/images/banner1.jpg';
import banner2 from '../../assets/images/banner2.jpg';
import banner3 from '../../assets/images/banner3.jpg';

export default (Banner) => {
    const [height, setHeight] = useState('auto');
    return (
        <Carousel autoplay={true} className="banner">
            <div height={height}>
                <img
                    onLoad={() => {
                        // fire window resize event to change height
                        window.dispatchEvent(new Event('resize'));
                    }}
                    src={banner2}
                    alt="sdf"
                    style={{ width: '100%' }}
                />
            </div>
            <div>
                <img
                    src={
                        'https://firebasestorage.googleapis.com/v0/b/foodyjoe-3a05d.appspot.com/o/3J8G9mrpO9f9u4Qv77e7JnKIv4z2%2Flogo.png?alt=media&token=8037db99-756d-4ec8-813d-32ffb001bac2'
                    }
                    alt="sdf"
                    style={{ width: '100%' }}
                />
            </div>
            <div>
                <img src={banner3} alt="sdf" style={{ width: '100%' }} />
            </div>
        </Carousel>
    );
};
