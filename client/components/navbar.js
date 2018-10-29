import React, {Component} from 'react'
import {connect} from 'react-redux'
import {logout} from '../store'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchInput: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
  }

  render() {
    return (
      <div className="sticky-nav">
        <i className="material-icons left-nav">menu</i>
        <img id="logo-image" className="left-nav" src='favicon.png' alt="Google logo"/>
        <span className="logo-text left-nav">Gmail</span>
        <div className="form-container">
          <form className="form" onSubmit={this.handleSubmit}>
            <button type="submit">
              <i className="material-icons spaced-icons">search</i>
            </button>
            <input type="text" name="searchInput" placeholder="search"
            onChange={this.handleChange} />
          </form>
        </div>
        <div className="nav-spacer"/>
        <i className="material-icons spaced-icons">apps</i>
        <i className="material-icons spaced-icons">notifications</i>
        <i className="material-icons spaced-icons">perm_identity</i>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
