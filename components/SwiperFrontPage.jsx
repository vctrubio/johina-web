'use client'
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

//to do is fetch from contenful + create model
const imgs = ["/slider/b.png", "/slider/a.png", "/slider/c.png", "/slider/d.png", "/slider/e.png"];

export const SwiperHome = () => {
    return (
        <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={10}
            loop={true}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            speed={2500}
        >
            {imgs.map((img, i) => (
                <SwiperSlide key={i}>
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <Image layout="fill" objectFit="cover" src={img} alt={`Slide ${i + 1}`} />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export const InstaSwiperComponent = () => {
    return (
        <div className="swiper-insta">
            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={65}
                slidesPerView={3}
                loop={true}
                autoplay={{ delay: 0, disableOnInteraction: false }}
                speed={4000}
            >
                <div className='swiper-insta-footer'>
                    {imgs.map((img, i) => (
                        <SwiperSlide key={i}>
                            <Image width={80} height={40} src={img} alt={`Slide ${i + 1}`} />
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>
        </div>
    )
}
