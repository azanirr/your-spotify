import React from 'react';
import styles from './Show.module.css';
import './Show.css'
import spotifygreen from '../../assets/spotifygreen.png';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, EffectFade, Autoplay, A11y } from "swiper";
import "swiper/swiper-bundle.css";
import domtoimage from 'dom-to-image';

SwiperCore.use([Pagination, EffectFade, Autoplay, A11y]);

function Show (props) {

    const {dataArtist, dataSong, user, changeDomToImage} = props;

    const [classHide, setClassHide] = React.useState(false);

    const download = async () => { 
        let promises = new Promise((resolve, reject) => {
            setClassHide(!classHide); 
            domtoimage.toJpeg(document.getElementById('background-download'), { quality: 0.99 })
            .then(function (dataUrl) {
                let link = document.createElement('a');
                link.download = 'my-image-name.jpeg';
                link.href = dataUrl;
                link.click();
            });
        })
        await promises;
        setClassHide(!classHide)
    }

    const subString = (string) => {
        let data = string.substr(0, 40);
        data = data.substr(0, Math.min(data.length, data.lastIndexOf(" ") > 0 ? data.lastIndexOf(" ") : data.length));
        if(string.length > 40) {
            data = data + "..."
        }
        return data;
    }


    // React.useEffect(() => {  
    //     if (classHide) {
    //         setTimeout(() => {
    //             domtoimage.toJpeg(document.getElementById('background-download'), { quality: 0.99 })
    //                 .then(function (dataUrl) {
    //                 let link = document.createElement('a');
    //                     link.download = 'my-image-name.jpeg';
    //                     link.href = dataUrl;
    //                     link.click();
    //                 });
    //         }, 2000);
    //     }
        
        
    // }, [classHide])

    return (
        <div className={styles.Wrap}>
            <div className={styles.Show}>
                <img src={spotifygreen} width="100px" height="30px"alt="logo white" className={styles.Logo}></img>
                <button className={styles.Download} onClick={download}>Download</button>
                <div className={styles.User}>
                    <img src={user.images[0].url} width="120px" height="120px"></img>
                    <p>{user.display_name}</p>
                </div>
                <div className={styles.Artist} style={{display: dataArtist.length > 0 ? "block" : "none"}}>
                    <h1>Favorite Artists</h1>
                    <Swiper
                            slidesPerView={5}
                            spaceBetween={30}
                            slidesPerGroup={5}
                            loop={true}
                            loopFillGroupWithBlank={true}
                            pagination={{
                                el: '.swiper-pagination',
                                clickable: true,
                                bulletClass: styles.paginationBullet,
                                bulletActiveClass: styles.paginationBulletActive,
                            }} 
                            >         
                        {dataArtist.map((artist, index) => {
                            return(
                                <SwiperSlide className={styles.carousel} key={index}>
                                    <div className={styles.Container}>
                                        <img src={artist.images[0].url}></img>
                                        <h1>{index + 1}. {artist.name}</h1>
                                        <p>{artist.genres[0] ? artist.genres[0] : "None"}</p>
                                        <a href={artist.external_urls.spotify} target="_blank">
                                        <div>
                                            <button>GO TO ARTIST</button>
                                        </div>
                                        </a>
                                    </div>
                                </SwiperSlide>
                            )
                        })}   
                        <div className={ classHide ? styles.Hide : styles.containerbullet} >
                            <div className={classHide ? styles.Hide : `swiper-pagination ${styles.paginationContainer}`}></div>
                        </div>
                    </Swiper>              
                </div>
                <div className={styles.Song} style={{display: dataSong.length > 0 ? "block" : "none"}}>
                    <h1>Favorite Songs</h1>
                    <Swiper
                            slidesPerView={5}
                            spaceBetween={30}
                            slidesPerGroup={5}
                            loop={true}
                            loopFillGroupWithBlank={true}
                            pagination={{
                                el: '.swiper-pagination',
                                clickable: true,
                                bulletClass: styles.paginationBullet,
                                bulletActiveClass: styles.paginationBulletActive,
                            }} 
                            >         
                        {dataSong.map((song, index) => {
                            return(
                                <SwiperSlide key={index}className={styles.carousel}>
                                    <div className={styles.Container}>
                                        <img src={song.album.images[0].url}></img>
                                        <h1>{index + 1}. {subString(song.name)}</h1>
                                        <p>{song.artists[0].name}</p>
                                        <a href={song.external_urls.spotify} target="_blank">
                                        <div>
                                            <button>GO TO SONG</button>
                                        </div>
                                        </a>
                                    </div>
                                </SwiperSlide>
                            )
                        })}   
                        <div className={ classHide ? styles.Hide : styles.containerbullet} >
                            <div className={classHide ? styles.Hide : `swiper-pagination ${styles.paginationContainer}`}></div>
                        </div>
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default Show;