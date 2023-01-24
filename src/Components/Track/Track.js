import { Component } from 'react';
import { Player } from '../Player/Player';
import './Track.css'

export class Track extends Component {

    constructor(props) {
        super(props)
        
        this.state = { 
            playing: false,
            style: ''
        }
        this.renderAction = this.renderAction.bind(this)
        this.addTrack = this.addTrack.bind(this)
        this.removeTrack = this.removeTrack.bind(this)
        this.handlePlay = this.handlePlay.bind(this)
    }

    addTrack() {
        this.props.onAdd(this.props.track)
    }

    removeTrack() {
        this.props.onRemove(this.props.track)
    }

    renderAction() {
        if (this.props.isRemoval) {
            return <div className='Track-action'>
                <button onClick={ this.removeTrack }> 
                    <i class="fa-solid fa-circle-minus"></i> 
                </button>
            </div>
        } else {
            return <div className='Track-action' >
                <button onClick={ this.addTrack }> 
                  <i class="fa-solid fa-circle-plus"></i> 
                </button>
            </div>
        }
    }

    handlePlay() {
        this.setState({ playing: !this.state.playing })
    }

    render() {
        const { name, artists, image } = this.props.track
        let style
        if ( this.props.isAdded ) {
                style = this.props.isAdded.find( trackId => {
                    return trackId === this.props.track.id
                })
            }
        return (
            <div className="Track" style={{ opacity: style ? 0.5 : 1 }}>

                {
                    !this.props.playList ? (
                        <div className='playPause'>
                           <button 
                             onClick={ this.handlePlay }
                             className={ this.state.playing 
                               ? 'play-btn' 
                               : 'play-btn pause' }>
                               <span></span>
                               <span></span>
                           </button>
                        </div>
                    ) : null
                }
                
                <div className='Track-thumb'>
                  <img src={ image ? image[1].url : '' } alt='portada de disco'/>
                </div>

                <div className="Track-information">
                  <div className='about'>
                    <h3>{ name }</h3> 
                    <p>{ artists.name }</p>
                  </div>
                  {
                    !this.props.playList ? (
                        <Player 
                          playList={ this.props.playList }
                          track={ this.props.track } 
                          play={ this.state.playing }/>
                    ) : null
                  }
                </div>
                { this.renderAction() }
            </div> 
        )
    }
}

export default Track