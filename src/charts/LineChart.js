import React, { Component } from 'react'
import * as d3 from 'd3'

const width = 650
const height = 300

class LineChart extends Component {
  state = {
    margin: { top: 50, right: 50, bottom: 50, left: 50 },
    linePath: '',
    circles: []
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let n = 21

    const xScale = d3
      .scaleLinear()
      .domain([0, n - 1]) // input
      .range([0, width]) // output

    const yScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range([height, 0])

    const line = d3
      .line()
      .x((d, i) => {
        return xScale(i)
      })
      .y(d => {
        return yScale(d.y)
      })
      .curve(d3.curveMonotoneX)

    const dataset = d3.range(n).map(function(d) {
      return { y: d3.randomUniform(1)() }
    })

    const linePath = line(dataset)

    const circles = dataset.map((d, i) => {
      return {
        cx: xScale(i),
        cy: yScale(d.y)
      }
    })

    return { linePath, xScale, yScale, circles }
  }

  xAxis = d3.axisBottom()
  yAxis = d3.axisLeft()

  componentDidMount() {
    this.xAxis.scale(this.state.xScale)
    d3.select(this._xAxis).call(this.xAxis)
    this.yAxis.scale(this.state.yScale)
    d3.select(this._yAxis).call(this.yAxis)

    this.yAxis.tickSize(-width, 0, 0).tickFormat('')
    d3.select(this._yGrid).call(this.yAxis)
    this.xAxis.tickSize(height, 0, 0).tickFormat('')
    d3.select(this._xGrid).call(this.xAxis)
  }

  render() {
    const { margin } = this.state

    return (
      <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g ref={node => (this._xAxis = node)} className='x-axis' transform={`translate(0, ${height})`} />
          <g ref={node => (this._yAxis = node)} className='y-axis' />
          <g ref={node => (this._yGrid = node)} className='y-grid' />
          <g ref={node => (this._xGrid = node)} className='x-grid' />

          <path d={this.state.linePath} fill='none' stroke='#6153A6' strokeWidth='4' />
          {this.state.circles.map((circle, index) => (
            <circle
              key={index}
              r='5'
              cx={circle.cx}
              cy={circle.cy}
              fill='#ffffff'
              stroke='#6153A6'
              strokeWidth='4'></circle>
          ))}
        </g>
      </svg>
    )
  }
}

export { LineChart }
