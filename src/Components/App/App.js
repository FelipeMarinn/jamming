import { Component } from 'react';
import Spotify from '../../util/Spotify';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import './App.css'

export class App extends Component {

  constructor(props) {
    super(props)

    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
    this.state = { 
      searchResults: [],
      playListName: 'New Playlist',
      playListTrack: [],
      isLoading: false,
      trackAdded: [],
      playing: {
        statement: false,
        track: {}
      }
    }
  }

  addTrack(track) {
    if (this.state.playListTrack.find( saveTrack => 
      saveTrack.id === track.id
    )) { return }
    this.setState({ 
      playListTrack: [...this.state.playListTrack, track],
      trackAdded: [...this.state.trackAdded, track.id]
    })
    JSON.parse(localStorage.getItem('trackAdded'))
  }

  removeTrack(track) {
    const noRemove = this.state.playListTrack.filter( selectedTrack => {
      return selectedTrack.id !== track.id
    })
    this.setState({ 
      playListTrack: [ ...noRemove ],
      trackAdded: this.state.trackAdded.filter( trackId => {
        return trackId !== track.id
      })
    })
  }

  updatePlaylistName(name) {
    this.setState({ playListName: name })
  }

  savePlaylist() {
    let trackUris = this.state.playListTrack.map( track =>  track.uri )
    const save = Spotify.savePlaylist(this.state.playListName, trackUris)
    if ( save ) {
      this.setState({ isLoading: true })
      save.then(() => {
        this.setState({
          playListName: 'New Playlist',
          playListTrack: [],
          isLoading: false,
          trackAdded: []
        })
      }) 
    }
   
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(searchResults => {
      this.setState({ 
        searchResults: searchResults,
        term: searchTerm
      })
    })  
  } 

  componentDidMount() {
    if ( JSON.parse(localStorage.getItem('trackAdded')) ) {
      this.setState({ 
        trackAdded: JSON.parse(localStorage.getItem('trackAdded')) 
      })
    }
  }

  componentDidUpdate(prevState) {
    localStorage.setItem('trackList', JSON.stringify(this.state.playListTrack))
    localStorage.setItem('results', JSON.stringify(this.state.searchResults))

    if (prevState.trackAdded !== this.state.trackAdded ) {
      localStorage.setItem('trackAdded', JSON.stringify(this.state.trackAdded))
    }
  }

  render() {
    return (
      this.state.isLoading ? <h2>Loading...</h2> :
      <div>
        <h1>Ja<span className='highlight'>mmm</span>ing</h1>
        <div className='App'>
            <SearchBar onSearch={ this.search }/>
          <div className='App-playlist'>
            <SearchResults 
              searchResults={ this.state.searchResults }
              onAdd={ this.addTrack }
              isAdded={ this.state.trackAdded } />
            <Playlist 
              playList='playlist'
              onRemove={ this.removeTrack } 
              playListName={ this.state.playListName }
              playListTrack={ this.state.playListTrack }
              onNameChange={ this.updatePlaylistName }
              onSave={ this.savePlaylist } />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
