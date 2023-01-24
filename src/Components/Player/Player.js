import { Component } from "react";
import WaveSurfer from 'wavesurfer.js'
import './Player.css'

export class Player extends Component {

    formatTime(time) {
        let min = Math.floor(time / 60)
        if (min < 10) {
            min = `${min}`
        }
        let sec = Math.floor(time % 60)
        if (sec < 10) {
            sec = `0${sec}`
        }
        return `${min} : ${sec}`
    }

    componentDidMount() {
        const waveId = `#wave_${this.props.track.id}`
        const songId = `#song_${this.props.track.id}`

        const song = document.querySelector(songId)
        const waveElement = document.querySelector(waveId)
        
        if (waveElement.children.length > 0) { return }
        
        this.wavesurfer = WaveSurfer.create({
          barWidth: 3,
          barRadius: 3,
          barGap: 2,
          barMinHeight: 1,
          container: waveId,
          backend: "WebAudio",
          height: 25,
          hideScrollbar: true,
          progressColor: "#f5f5f5",
          responsive: true,
          waveColor: "rgba(222, 209, 231, 0.192)",
          cursorColor: "transparent"
        })
      
        const duration = document.querySelector(`#duration_${this.props.track.id}`)
        this.wavesurfer.on('ready', () => {
            duration.textContent = this.formatTime(this.wavesurfer.getDuration())
        })

        if ( this.props.track.preview !== null ) {
            this.wavesurfer.load(song)
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.play !== this.props.play ) {
            this.wavesurfer.playPause()
            const current = document.querySelector(`#current_${this.props.track.id}`)
            this.wavesurfer.on('audioprocess', () => {
                current.textContent = this.formatTime(this.wavesurfer.getCurrentTime())
            })
        }
    }

    componentWillUnmount() {
        if (this.wavesurfer) {
            this.wavesurfer.destroy()
        }     
    }

    render() {
        const { id, preview } = this.props.track
        return (
            <div className="player"> 
                <div className="song-time">
                     <span className="current" id={`current_${id}`}>0 : 00</span> /
                     <span className="duration" id={`duration_${id}`}>0 : 00</span>
                 </div>
                <audio id={`song_${id}`} src={ preview }></audio> 
                <div className='wave' id={`wave_${id}`}></div>
            </div>
        )
    }
}