import React from 'react'
import PropTypes from 'prop-types'

const Header = ({ greeting, user }) => {
  return (
    <header className='header'>
      <h1>{greeting} {user.toUpperCase()}</h1>
    </header>
  )
}

Header.defaultProps = {
    greeting: "COMMUNITY SERVICE PORTAL FOR",
    user: 'Student',
}

Header.propTypes = {
    greeting: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
}

export default Header
