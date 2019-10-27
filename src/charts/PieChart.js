import React, { Component } from 'react'
import * as d3 from 'd3'
import PropTypes from 'prop-types'

const data = [
  { name: '<5', value: 19912018 },
  { name: '5-9', value: 20501982 },
  { name: '10-14', value: 20679786 },
  { name: '15-19', value: 21354481 },
  { name: '20-24', value: 22604232 },
  { name: '25-29', value: 21698010 },
  { name: '30-34', value: 21183639 },
  { name: '35-39', value: 19855782 },
  { name: '40-44', value: 20796128 },
  { name: '45-49', value: 21370368 },
  { name: '50-54', value: 22525490 },
  { name: '55-59', value: 21001947 },
  { name: '60-64', value: 18415681 },
  { name: '65-69', value: 14547446 },
  { name: '70-74', value: 10587721 },
  { name: '75-79', value: 7730129 },
  { name: '80-84', value: 5811429 },
  { name: '≥85', value: 5938752 }
]

class PieChart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pies: [],
      labels: []
    }
  }

  static getDerivedStateFromProps(nextProp, prevState) {
    const height = 500,
      width = 500

    const arc = d3
      .arc()
      .innerRadius(80)
      .outerRadius(Math.min(width, height) / 2 - 1)

    const pie = d3
      .pie()
      .sort(null)
      .value(d => d.value)

    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map(d => d.name))
      .range(
        d3
          .quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
          .reverse()
      )

    const arcs = pie(data)
    const pies = arcs.map(d => ({
      path: arc(d),
      fill: colorScale(d.data.name),
      text: `${d.data.name}: ${d.data.value.toLocaleString()}`
    }))

    const radius = (Math.min(width, height) / 2) * 0.8
    const labelArc = d3
      .arc()
      .innerRadius(radius)
      .outerRadius(radius)

    const labels = arcs.map(d => {
      let tspan = null

      if (d.startAngle - d.endAngle > 0.25) {
        tspan = {
          x: '0',
          y: '0.7em',
          fillOpacity: '0.7',
          text: d.data.value.toLocaleString()
        }
      }
      const label = {
        transform: `translate(${labelArc.centroid(d)})`,
        text: d.data.name,
        tspan: tspan
      }

      return label
    })

    return { pies, labels }
  }

  render() {
    const height = 500,
      width = 500

    return (
      <svg viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}>
        <g>
          {this.state.pies.map((pie, index) => (
            <path key={index} d={pie.path} fill={pie.fill}>
              <title>{pie.text}</title>
            </path>
          ))}
        </g>
        <g fontFamily='sans-sarif' fontSize='12' textAnchor='middle'>
          {this.state.labels.map((label, index) => (
            <text key={index} y='-0.4em' transform={label.transform}>
              {label.text}
              {label.tspan && (
                <tspan x={label.tspan.x} y='.07em' fillOpacity='0.7'>
                  {label.tspan.text}
                </tspan>
              )}
            </text>
          ))}
        </g>
      </svg>
    )
  }
}

PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object)
}

export default PieChart
