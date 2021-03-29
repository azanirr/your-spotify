import React from 'react';

import styles from './DomToImage.module.css';
import domtoimage from 'dom-to-image';



function DomToImage (props) {

    const {dataArtist, dataSong} = props;

    const download = () => {
        domtoimage.toJpeg(document.getElementById('download-dom'), { quality: 0.95 })
        .then(function (dataUrl) {
        let link = document.createElement('a');
            link.download = 'my-image-name.jpeg';
            link.href = dataUrl;
            link.click();
        });
    }


    return(

        <div className={styles.Wrap}>
            <div className={styles.Dom} id="download-dom">
                <p>Azani Ramadhan</p>
                {dataArtist.map((list, index) => {
                    return(
                        <div key={index}>
                            <p>{index + 1}. {list.name}</p>
                        </div>
                    )
                })}
                {dataSong.map((list, index) => {
                    return(
                        <div key={index}>
                            <p>{index + 1}. {list.name}</p>
                        </div>
                    )
                })}
            </div>
            <button onClick={download}>DOWNLOAD</button>
        </div>
    )
}

export default DomToImage;