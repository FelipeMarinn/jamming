import { Component } from "react";
import Track from "../Track/Track";
import './TrackList.css'


export class TrackList extends Component {

    render() {
        const placeholder = this.props.tracks
        return (
            <div className={`${placeholder.length === 0 ? 'placeholder' : 'TrackList'}`}>
                {
                    placeholder.length === 0 
                      ? <p className="placeholder-text">Tracks</p>
                      : null
                }
                {
                    this.props.tracks.map( track => {
                        return <Track 
                          track={ track } 
                          key={ track.id }
                          onAdd={ this.props.onAdd }
                          isAdded={ this.props.isAdded }
                          playList={ this.props.playList }
                          onRemove={ this.props.onRemove }
                          isRemoval={ this.props.isRemoval } />
                    })
                }
            </div>
        )
    }
}

export default TrackList