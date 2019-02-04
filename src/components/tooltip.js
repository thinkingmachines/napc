import React from 'react'
import PropTypes from 'prop-types'

export default class Tooltip extends React.Component {
  static propTypes = {
    features: PropTypes.array.isRequired
  }

  render () {
    const { features } = this.props

    const renderFeature = (feature, i) => {
      return (
        <div key={i}>
          <p>
            <strong>{feature.properties.Pro_Name}</strong>{' '}
            {feature.properties.Mun_Name}
          </p>
        </div>
      )
    }

    return (
      <div>
        <div>{features.map(renderFeature)}</div>
        <span />
      </div>
    )
  }
}
