import { Component } from "react";
import './SearchBar.css'


export class SearchBar extends Component {

    constructor(props) {
        super(props)

        this.state = { term: '' }
        this.search = this.search.bind(this)
        this.handleTermChange = this.handleTermChange.bind(this)   
    }

    handleTermChange(ev) {
        this.setState({ term: ev.target.value })
        this.props.onSearch(this.state.term)
    }

    search() {
        this.props.onSearch(this.state.term)
    }

    componentDidMount() {
        const term = localStorage.getItem('term')
        term !== null && this.setState({ term: term })
    }

    componentDidUpdate() {
        localStorage.setItem('term', this.state.term)
    }

    render() {
        return (
            <div className="SearchBar">
              <input 
                onChange={ this.handleTermChange }
                placeholder="Enter A Song, Album, or Artist"
                value={ this.state.term } />
              <div aria-hidden role='button' className="SearchIcon">
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
        )
    }
}

export default SearchBar