import React, { useState } from 'react';
import { Carousel } from 'antd-mobile';
import banner1 from '../../assets/images/Capture.jpg';
import banner2 from '../../assets/images/Capture2.jpg';
import banner3 from '../../assets/images/Capture3.jpg';
import banner4 from '../../assets/images/Capture4.jpg';


export default (Banner) => {
    const [height, setHeight] = useState('auto');
    return (
        <Carousel autoplay={true} className="banner">
            <div height={height}>
                <img
                    // onLoad={() => {
                    //     // fire window resize event to change height
                    //     window.dispatchEvent(new Event('resize'));
                    // }}
                    src={banner1}
                    alt="1"
                    style={{ width: '100%' }}
                />
            </div>
            <div height={height}>
                <img
                
                    src={banner2}
                    alt="1"
                    style={{ width: '100%' }}
                />
            </div>
            <div height={height}>
                <img
                
                    src={banner3}
                    alt="1"
                    style={{ width: '100%' }}
                />
            </div>
            <div height={height}>
                <img
                
                    src={banner4}
                    alt="1"
                    style={{ width: '100%' }}
                />
            </div>
      
        
        </Carousel>
    );
};
