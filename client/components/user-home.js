import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Navbar from './navbar'
/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <div className="nav-spacer" />
      <Navbar />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
