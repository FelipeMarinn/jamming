import { Component } from "react";
import TrackList from "../TrackList/TrackList";
import './Playlist.css'


export class Playlist extends Component {

  constructor(props) {
    super(props)

    this.handleNameChange = this.handleNameChange.bind(this)
  }

  handleNameChange(ev) {
    this.props.onNameChange(ev.target.value)
  }

  render() {
      return (
          <div className="Playlist">
            <input onChange={ this.handleNameChange } value={this.props.playListName}/>
            <TrackList 
              playList={this.props.playList}
              isRemoval={ true }
              onRemove={ this.props.onRemove }
              tracks={ this.props.playListTrack }/>
            <button 
              onClick={ this.props.onSave }
              className="Playlist-save">SAVE TO SPOTIFY</button>
          </div>
      )
  }
}

export default Playlist