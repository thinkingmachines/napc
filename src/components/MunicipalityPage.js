import React, { Component, Fragment } from 'react'

import { indicators } from '../constants'
import OverlayMunicipalityPage from './OverlayMunicipalityPage'
import SidebarMunicipalityPage from './SidebarMunicipalityPage'

class MunicipalityPage extends Component {
  componentDidMount () {
    const { need } = this.props.match.params
    this.props.map.on('load', this.showIndicator.bind(this, need))
  }
  componentDidUpdate (prevProps) {
    const { need } = this.props.match.params
    if (prevProps.match.params.need !== need) {
      this.showIndicator(need)
    }
  }
  showIndicator (need) {
    const indicator = indicators[need]
    const map = this.props.map
    // const indicator = indicators.find(function (d) { return d.id === need })
    // console.log('showIndicator', need, indicator)

    map.setPaintProperty('municities', 'fill-outline-color', indicator.paint['fill-outline-color'])
    map.setPaintProperty('barangays', 'fill-outline-color', indicator.paint['fill-outline-color'])
    map.setPaintProperty('provinces', 'fill-outline-color', indicator.paint['fill-outline-color'])

    map.setPaintProperty('municities', 'fill-color', indicator.paint['fill-color'])
    map.setPaintProperty('barangays', 'fill-color', indicator.paint['fill-color'])
    map.setPaintProperty('provinces', 'fill-color', indicator.paint['fill-color'])

    map.setPaintProperty('municities', 'fill-opacity', indicator.paint['fill-opacity']['municities'])
    map.setPaintProperty('barangays', 'fill-opacity', indicator.paint['fill-opacity']['barangays'])
    map.setPaintProperty('provinces', 'fill-opacity', indicator.paint['fill-opacity']['provinces'])
  }
  render () {
    const { need } = this.props.match.params
    const { map } = this.props

    return (
      <Fragment>
        <OverlayMunicipalityPage need={need} map={map} />
        <SidebarMunicipalityPage>
          <h3>Data Dictionary</h3>
        </SidebarMunicipalityPage>
      </Fragment>
    )
  }
}

export default MunicipalityPage
