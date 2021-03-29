import React from 'react';
import styles from './Head.module.css';
import { Swiper, SwiperSlide } from "swiper/react";
import './carousel.css';
import spotifywhite from '../../assets/spotifywhite.png';
import spotifygreen from '../../assets/spotifygreen.png';
import Pic from '../../assets/back.jpg';
import Pic2 from '../../assets/pic.jpg';
import SwiperCore, { Pagination, EffectFade, Autoplay, A11y } from "swiper";
import "swiper/swiper-bundle.css";

SwiperCore.use([Pagination, EffectFade, Autoplay, A11y]);


function Head () {
    return(
        <div className={styles.carouselContainer}>
            <Swiper
			effect="fade"
			spaceBetween={20}
			slidesPerView={1}
			pagination={{
			  clickable: true,
			  el: ".swiper-pagination",
			  bulletClass: styles.paginationBullet,
			  bulletActiveClass: styles.paginationBulletActive,
			}}
			autoplay={{ delay: 100000, disableOnInteraction: false }}>
                <SwiperSlide className={styles.carousel}>
                    <div className={styles.Container}>
                        <img src={Pic} className={styles.imgSlide}></img>
                        <div className={styles.Main}>
                            <img src={spotifywhite} width="100px" height="100px"alt="logo white"></img>
                            <h1>Get Your Favorite Artists</h1> 
                            <a href="http://localhost:8888/login">
                                <button>Connect</button>
                            </a>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={styles.carousel}>
                    <div className={styles.Container}>
                        <img src={Pic2} className={styles.imgSlide}></img>
                        <div className={styles.MainGenerator}>
                        <img src={spotifygreen} width="100px" height="30px"alt="logo white"></img>
                            <h1 style={{color: '#555', marginTop: '25px'}}>Generate Your Own Playlist</h1>
                            <button>Generate</button>
                        </div>
                    </div>
                </SwiperSlide>
                <div className={styles.containerbullet}>
                    <div className={`swiper-pagination ${styles.paginationContainer}`}></div>
                </div>
            </Swiper>
        </div>
    )
}
export default Head;