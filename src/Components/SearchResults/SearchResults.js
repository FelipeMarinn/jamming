import { Component } from "react";
import TrackList from "../TrackList/TrackList";
import './SearchResults.css'


export class SearchResults extends Component {

    render() {
        return (
            <div className="SearchResults">
              <h2>Results</h2>
              <TrackList 
                isAdded={ this.props.isAdded }
                onAdd={ this.props.onAdd } 
                tracks={ this.props.searchResults }
                isRemoval={ false } />
            </div>
        )
    }
}

export default SearchResults