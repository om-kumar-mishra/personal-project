import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const SalesPerformanceIcons = () => {
  return (
    <div className="d-flex align-items-center">
    <FontAwesomeIcon
    title="Message"
    icon={faMessage}
    className="portfolio-dashboard-icon"
    size='xl'
  />
  </div>
  )
}

export default SalesPerformanceIcons;