import PropTypes from 'prop-types'
export const DISPLAY_COVERAGE = 'DISPLAY_COVERAGE'

export const displayCoverage = coverage => ({
  type: DISPLAY_COVERAGE,
  payload: coverage
})

displayCoverage.propTypes = {
  type: PropTypes.string.isRequired
}
