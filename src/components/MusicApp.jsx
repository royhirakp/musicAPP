import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import './MusicApp.css'
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRoundedIcon from '@mui/icons-material/VolumeDownRounded';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
const data = [
    { src: "./music/1.m4a", id: 1, image: "./image/download (1).jfif" },
    { src: "./music/2.m4a", id: 2, image: "./image/image2.jfif" },
    { src: "./music/3.m4a", id: 3, image: "./image/image3.jfif" },
    { src: "./music/4.m4a", id: 4, image: "./image/image4.jfif" }
];
const MusicApp = () => {

    const [dataindx, setDataindex] = useState(0);
    const [playStatus, setPlayStatus] = useState(false)
    const [volume, setVolume] = useState(0.7)
    const [musicPlayTime, setmusicPlayTime] = useState(0)
    const musicuseRef = useRef(null)

    // USEEFFECT FOR PLAY THE SONG
    useEffect(() => {
        if (playStatus) {
            musicuseRef.current.play()
        } else {
            musicuseRef.current.pause()
        }
    }, [playStatus, dataindx])

    // FUNCTION FOR PLAY PAUSE NEXT PREVIOUS BUTTON 
    function musicControl(status) {
        if (status === 'privious') {
            if (dataindx > 0) setDataindex((curr) => curr - 1);
            if (dataindx === 0) setDataindex(data.length - 1)
        } else {
            // if (dataindx < data.length - 1)  setDataindex(dataindx + 1);  
            // if(dataindx === data.length - 1)         setDataindex(0);
            setDataindex(() => {
                let x = dataindx;
                x++;
                if (x > data.length - 1) {
                    x = 0;
                }
                return x;
            })
        }
    }

    //function for control the volume  //VOLUME 
    const volumefunction = (status) => {
        if (status === 'vol+') {
            if (volume < 1) setVolume((volume + 0.1).toFixed(1) * 1)
        }
        else {
            if (volume > 0) setVolume((volume - 0.1).toFixed(1) * 1)
        }
    }
    //useEffect For update the voluem 
    useEffect(() => {
        musicuseRef.current.volume = volume;
        // console.log(musicuseRef)
    }, [volume])



    return (
        <main>           
            <div className="musiclist">
                <h1>Library</h1>
                {data.map((item, id) => {
                    return (
                        <div
                            className='songs'
                            key={id * 655 * 0.00052}
                            onClick={() => setDataindex(id)}
                        >
                            <div className='cardImage'>
                                <img src={item.image} alt="" />
                            </div>
                            <h3>{item.src.split('/')[2]}</h3>

                        </div>
                    )
                })}
            </div>
            <div className='musicPlayer'>
                <h1>MusicApp</h1>
                {/* song link image  */}
                <div className="musicplayImge">
                    <img src={data[dataindx].image} alt="" />
                </div>
                {/* sonag Detailes */}
                <p><b>Song Name:  </b><u>{data[dataindx].src.split('/')[2]}</u></p>
                <p><b>Song Number: </b>{dataindx + 1}</p>
                <p>volume: {volume}</p>
                {/* range of the song / or SLIDER  */}
                <div className="songRnageAndTimeUpdate">
                    <p><b>{(musicPlayTime+'').split('.')[0]}</b></p>
                    <input type="range"
                        min={0}
                        value={musicPlayTime}
                        max={musicuseRef.current?.duration ? musicuseRef.current.duration : 0}
                        onChange={(e) => musicuseRef.current.currentTime = e.target.value}
                    />
                    <p><b>{musicuseRef.current?.duration ? (musicuseRef.current.duration+'').split('.')[0]  : '0'}</b></p>
                </div>
               {/* button for vouleme updown  */}
                <button className='volBtn' onClick={() => volumefunction('vol-')} ><VolumeDownRoundedIcon/></button>
                <button className='volBtn' onClick={() => volumefunction('vol+')} ><VolumeUpRoundedIcon/></button>
                <br /><br />
                {/* button for next , play pause , previous  */}
                <button className='conTrolBtn' onClick={() => musicControl('privious')}><ArrowBackIosRoundedIcon/></button>
                <button className='conTrolBtn' onClick={() => setPlayStatus(!playStatus)}>{!playStatus ? <PlayArrowIcon/>:<PauseIcon/>}</button>
                <button className='conTrolBtn' onClick={() => musicControl('next')}><ArrowForwardIosIcon/></button>
                <br />

                {/* AUDIO TAG */}
                <audio
                    src={data[dataindx].src}
                    ref={musicuseRef}
                    // controls
                    onTimeUpdate={() => { setmusicPlayTime(musicuseRef.current.currentTime) }}
                >
                </audio>



            </div>
        </main>
    )
}

export default MusicApp
