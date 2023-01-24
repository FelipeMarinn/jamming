import { Component } from 'react'
import WaveSurfer from 'wavesurfer.js'

export class WaveAudio extends Component {
    constructor(props) {
        super(props)

        this.state = { playing: false }
    }

    componentDidMount() {
        const track = document.querySelector(`#${this.props.track.name}`);

        this.wavesurfer = WaveSurfer.create({
          barWidth: 3,
          barRadius: 3,
          barGap: 2,
          barMinHeight: 1,
          cursorWidth: 1,
          container: "#wave",
          backend: "WebAudio",
          height: 45,
          scrollParent: false,
          progressColor: "#1AAFFF",
          responsive: true,
          waveColor: "#CDEDFF",
          cursorColor: "transparent"
        });
    
        this.wavesurfer.load(track);
    }

    render() {
        const { name, artist, album, image, preview } = this.props.track
        return (
            <div className='Track-content'> 
                <img src={ image } alt=''/>
                <div className="Track-information">
                  <h3>{ name }</h3>
                  <p> { artist } | { album }</p>
                  <div id='wave'></div>
                  <audio id={ name } src={ preview }>
                      {/* <source src={ preview }/> */}
                  </audio>
                  {/* <div className='time'>
                      <span id='current'>0:00</span>
                      <span id='duration'>0:00</span>
                  </div> */}
                </div>
                <div type='button' className='controls'>o</div> 
            </div>
        )
    }
}

