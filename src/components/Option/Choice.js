import React from 'react';

import style from './Choice.module.css';
import Show from './Show';
import DomToImage from './DomToImage';

import Select from 'react-select';
import chroma from 'chroma-js';
import axios from 'axios';
import {choice} from './data';


const dot = (color = '#ccc') => ({
    alignItems: 'center',
    display: 'flex',
  
    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10,
      display: "none"
    },
});


const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = chroma(data.color);
        return {
            ...styles,
            backgroundColor: isDisabled
                ? null
                : isSelected
                ? data.color
                : isFocused
                ? color.alpha(0.1).css()
                : null,
            color: isDisabled
                ? '#ccc'
                : isSelected
                ? chroma.contrast(color, 'white') > 2
                ? 'white'
                : 'black'
                : data.color,
                cursor: isDisabled ? 'not-allowed' : 'default',
            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
            },
        };
    },
    input: styles => ({ ...styles, ...dot() }),
    placeholder: styles => ({ ...styles, ...dot() }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};
  
function Choice () {

    const search = window.location.search.split('=')
    localStorage.setItem('token', search[1]);


    const [submitted, setSubmitted] = React.useState(false),
          [main, setMain] = React.useState(true),
          [domToImage, setDomToImage] = React.useState(false),
          [songs, setSongs] = React.useState({
            enable: "",
            limit: {
                label: "10",
                value: "10"
            },
            term: {
                label: "Medium Term",
                value: "medium_term"
            },
          }),
          [artists, setArtists] = React.useState({
            enable: "",
            limit: {
                label: "10",
                value: "10"
            },
            term: {
                label: "Medium Term",
                value: "medium_term"
            }
    });

    const [dataArtist, setDataArtist] = React.useState([]),
          [dataSong, setDataSong] = React.useState([]),
          [user, setUser] = React.useState([]);

    const changeDomToImage = () => {
        setSubmitted(false);
        setDomToImage(true);
    }

    const handleChangeArtist = (selectedOptions) => {
        setArtists({
            ...artists,
            enable: selectedOptions
        })
    }

    const handleChangeSongs = (selectedOptions) => {
        setSongs({
            ...songs,
            enable: selectedOptions
        })
    }
    
    
    const handleChangeLimit = (selectedOptions) => {
        setArtists({
            ...artists,
            limit: selectedOptions
        })
    }

    const songHandleChangeLimit = (selectedOptions) => {
        setSongs({
            ...songs,
            limit: selectedOptions
        })
    }

    const handleChangeTerm = (selectedOptions) => {
        setArtists({
            ...artists,
            term: selectedOptions
        })
    }

    const songHandleChangeTerm = (selectedOptions) => {
        setSongs({
            ...songs,
            term: selectedOptions
        })
    }


    const getArtist = () => {

        if (artists.enable.value == "yes") {
            const token = localStorage.getItem('token');
            axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=${artists.term.value}&limit=${artists.limit.value}&offset=5`, {
                    headers: {
                        "Authorization" : "Bearer " + token
                    }
                })
                .then(response => {
                    console.log(response.data.items);
                    setDataArtist(response.data.items)
                    if (songs.enable.value == "yes") {
                        getSong();
                    } else {
                        setTimeout(() => {
                            setSubmitted(true);
                            setMain(false);
                        }, 1000);
                    }
                    
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            getSong();
        }
        
    }

    const getSong = () => {
        const token = localStorage.getItem('token');
        axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${songs.term.value}&limit=${songs.limit.value}&offset=5`,{
                    headers: {
                        "Authorization" : "Bearer " + token
                    }
                })
                .then(response => {
                    console.log(response.data.items);
                    setDataSong(response.data.items);
                    setTimeout(() => {
                        setSubmitted(true);
                        setMain(false);
                    }, 1000);
                })
                .catch(err => {
                    console.log(err);
                })
    }

    const getUser = () => {
        const token = localStorage.getItem('token');
        axios.get(`https://api.spotify.com/v1/me`,{
                    headers: {
                        "Authorization" : "Bearer " + token
                    }
                })
                .then(response => {
                    setUser(response.data);
                    console.log(response.data);
                })
                .catch(err => {
                    console.log(err);
                })
    }

    const submit = () => {
        getUser();
        getArtist();
    }


    return(
    <div id="background-download" className={style.Root}>
        <div className={style.Background}>
            {/* <div className={style.Circle}></div>
            <div className={style.Circle2}></div> */}
            <div className={style.Width}  style={{display: !main ? "none" : "flex"}}>
                <div className={style.Choice}>
                    <h1>Pick your choice</h1>
                    <div className={style.Form}>
                        <div className={style.Artist}>
                            <div className={style.Control}>
                                <label>Enable Artist</label>
                                <Select
                                
                                    label="Single select"
                                    options={choice.enable}
                                    styles={colourStyles}
                                    onChange={handleChangeArtist}
                            
                                />
                            </div>
                            <div  className={style.Control}>
                                <label>Term</label>
                                <Select
                                
                                    label="Single select"
                                    options={choice.term}
                                    styles={colourStyles}
                                    onChange={handleChangeTerm}
                                    isDisabled={artists.enable.value == "yes" ? false : true}
                                />
                            </div>
                            <div className={style.Control}>
                                <label>Limit</label>
                                <Select
                                
                                    label="Single select"
                                    options={choice.limit}
                                    styles={colourStyles}
                                    onChange={handleChangeLimit}
                                    isDisabled={artists.enable.value == "yes" ? false : true}
                                />
                            </div>
                        </div>
                        <div className={style.Songs}>
                            <div className={style.Control}>
                                <label>Enable Songs</label>
                                <Select
                                
                                    label="Single select"
                                    options={choice.enable}
                                    styles={colourStyles}
                                    onChange={handleChangeSongs}
                            
                                />
                            </div>
                            <div className={style.Control}>
                                <label>Term</label>
                                <Select
                                
                                    label="Single select"
                                    options={choice.term}
                                    styles={colourStyles}
                                    onChange={songHandleChangeTerm}
                                    isDisabled={songs.enable.value == "yes" ? false : true}
                                />
                            </div>
                            <div className={style.Control}>
                                <label>Limit</label>
                                <Select
                                
                                    label="Single select"
                                    options={choice.limit}
                                    styles={colourStyles}
                                    onChange={songHandleChangeLimit}
                                    isDisabled={songs.enable.value == "yes" ? false : true}
                                />
                            </div>
                        </div>
                    </div> 
                    <div className={style.Submit}>
                        <button 
                                type="submit" 
                                onClick={submit} 
                                disabled={artists.enable.value == "yes" || songs.enable.value == "yes" ? false : true} 
                                >Submit
                        </button>   
                    </div>  
                </div>
            </div>
            {submitted ? <Show 
                            dataArtist={dataArtist} 
                            dataSong={dataSong} 
                            user={user}
                            changeDomToImage={changeDomToImage}/>
                            : ""} 
            {domToImage ? <DomToImage
                            dataArtist={dataArtist} 
                            dataSong={dataSong} /> 
                            : ""}
        </div>
    </div>
    )
}


export default Choice;