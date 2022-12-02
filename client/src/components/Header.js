import React from 'react'
import PropTypes from 'prop-types'

const Header = ({ user }) => {
  return (
    <header className='header'>
      <h1>COMMUNITY SERVICE PORTAL FOR {user.toUpperCase()}</h1>
    </header>
  )
}

Header.defaultProps = {
    user: 'Student',
}

Header.propTypes = {
    user: PropTypes.string.isRequired,
}

export default Header
